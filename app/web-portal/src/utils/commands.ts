// Manual markdown parsing (browser-compatible, no gray-matter needed)

export interface CommandMetadata {
  id: string;
  name: string;
  title: string;
  description: string;
  purpose?: string;
  usage?: string;
  speed?: string;
  whenToUse?: string;
  category?: string;
  content: string;
}

export async function getAllCommands(): Promise<CommandMetadata[]> {
  try {
    // Load the index to get all command slugs
    const indexResponse = await fetch('/commands/index.json');
    if (!indexResponse.ok) {
      console.error('Failed to load commands index');
      return [];
    }
    
    const index = await indexResponse.json();
    const archivedCommands = new Set(index.archived || []);
    const allCommandSlugs: string[] = [];
    
    // Collect all command slugs from categories (excluding archived)
    Object.values(index.categories).forEach((category: any) => {
      if (category.commands) {
        // Filter out archived commands
        const activeCommands = category.commands.filter(
          (slug: string) => !archivedCommands.has(slug)
        );
        allCommandSlugs.push(...activeCommands);
      }
    });
    
    // Fetch and parse each command file
    const commandPromises = allCommandSlugs.map(async (slug) => {
      try {
        const response = await fetch(`/commands/${slug}.md`);
        if (!response.ok) {
          console.warn(`Failed to load command: ${slug}`);
          return null;
        }
        
        const text = await response.text();
        
        // Parse frontmatter if present
        let frontmatter: any = {};
        let content = text;
        
        if (text.startsWith('---')) {
          const frontmatterEnd = text.indexOf('---', 3);
          if (frontmatterEnd !== -1) {
            const frontmatterText = text.substring(3, frontmatterEnd).trim();
            content = text.substring(frontmatterEnd + 3).trim();
            
            // Simple YAML parsing for name and description
            const nameMatch = frontmatterText.match(/^name:\s*(.+)$/m);
            const descMatch = frontmatterText.match(/^description:\s*(.+)$/m);
            
            if (nameMatch) frontmatter.name = nameMatch[1].trim();
            if (descMatch) frontmatter.description = descMatch[1].trim();
          }
        }
        
        // Parse the command name from frontmatter or markdown header
        let commandName = frontmatter.name || '';
        if (!commandName) {
          // Look for markdown header (e.g., "# /cleanup-unused-code" or "# 🧹 Cleanup...")
          const headerMatch = content.match(/^#\s*[🧹🔧⚡🎨📝🚀💡✨🔍🛠️]*\s*\/?([^\n]+)/m);
          if (headerMatch) {
            commandName = headerMatch[1].replace(/^\/+/, '').trim();
          }
        }
        
        // Extract description from frontmatter or content
        let description = frontmatter.description || '';
        if (!description) {
          const lines = content.split('\n').filter(line => line.trim());
          // Skip the header line and get the next non-empty line
          for (let i = 1; i < lines.length; i++) {
            if (lines[i] && !lines[i].startsWith('#')) {
              description = lines[i].trim();
              break;
            }
          }
        }
        
        // Extract metadata from sections
        const purposeMatch = text.match(/##\s*Purpose\s*\n([^\n]+)/i);
        const usageMatch = text.match(/##\s*Usage\s*\n`([^`]+)`/i);
        const speedMatch = text.match(/##\s*Speed\s*\n([^\n]+)/i);
        const whenMatch = text.match(/##\s*When to use\s*\n([^\n]+)/i);
        
        // Get category from index
        let category = 'Other';
        for (const [, catData] of Object.entries(index.categories)) {
          if ((catData as any).commands?.includes(slug)) {
            category = (catData as any).name;
            break;
          }
        }
        
        return {
          id: slug,
          name: commandName,
          title: `/${commandName}`,
          description,
          purpose: purposeMatch?.[1]?.trim(),
          usage: usageMatch?.[1]?.trim(),
          speed: speedMatch?.[1]?.trim(),
          whenToUse: whenMatch?.[1]?.trim(),
          category,
          content: text,
        };
      } catch (error) {
        console.error(`Error loading command ${slug}:`, error);
        return null;
      }
    });
    
    const commands = await Promise.all(commandPromises);
    const validCommands: CommandMetadata[] = [];
    for (const cmd of commands) {
      if (cmd !== null && cmd !== undefined) {
        validCommands.push(cmd);
      }
    }
    return validCommands;
  } catch (error) {
    console.error('Error loading commands:', error);
    return [];
  }
}

export async function getCommandBySlug(slug: string): Promise<CommandMetadata | null> {
  try {
    // Load index to get category and check if archived
    let category = 'Other';
    let isArchived = false;
    try {
      const indexResponse = await fetch('/commands/index.json');
      if (indexResponse.ok) {
        const index = await indexResponse.json();
        // Check if command is archived
        isArchived = (index.archived || []).includes(slug);
        if (isArchived) {
          return null; // Don't load archived commands
        }
        // Get category
        for (const [, catData] of Object.entries(index.categories)) {
          if ((catData as any).commands?.includes(slug)) {
            category = (catData as any).name;
            break;
          }
        }
      }
    } catch (e) {
      // Index not available, use default
    }

    const response = await fetch(`/commands/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    const text = await response.text();
    
    const firstLine = text.split('\n')[0];
    const commandName = firstLine.replace(/^#\s*\//, '').trim();
    const lines = text.split('\n').filter(line => line.trim());
    const description = lines[1] || '';
    
    const purposeMatch = text.match(/##\s*Purpose\s*\n([^\n]+)/i);
    const usageMatch = text.match(/##\s*Usage\s*\n`([^`]+)`/i);
    const speedMatch = text.match(/##\s*Speed\s*\n([^\n]+)/i);
    const whenMatch = text.match(/##\s*When to use\s*\n([^\n]+)/i);
    
    return {
      id: slug,
      name: commandName,
      title: `/${commandName}`,
      description,
      purpose: purposeMatch?.[1]?.trim(),
      usage: usageMatch?.[1]?.trim(),
      speed: speedMatch?.[1]?.trim(),
      whenToUse: whenMatch?.[1]?.trim(),
      category,
      content: text,
    };
  } catch (error) {
    console.error(`Error loading command ${slug}:`, error);
    return null;
  }
}

export function getCategoryForCommand(commandId: string): string {
  const categories: Record<string, string[]> = {
    'Code Quality & Cleanup': ['cleanup-unused-code', 'fix-import-paths', 'fix-spacing-layout', 'refactor-cleanup'],
    'UI Component Fixes': ['fix-filter-bar', 'fix-data-table', 'fix-form-fields', 'implement-view-modes', 'standardize-status-badges'],
    'Testing & Debugging': ['test-page-quick', 'test-feature-pages', 'test-pages', 'debug-failing-page'],
    'Development Workflows': ['standardize-page', 'pre-commit-checklist', 'daily-cleanup', 'pr-ready'],
    'Discovery & Help': ['find-command', 'suggest-command'],
    'Design System': ['design-token-check'],
    'Utilities': ['command-usage-report'],
  };

  for (const [category, commands] of Object.entries(categories)) {
    if (commands.includes(commandId)) {
      return category;
    }
  }
  
  return 'Other';
}

