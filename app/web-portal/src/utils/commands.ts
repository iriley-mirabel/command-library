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
    const allCommandSlugs: string[] = [];
    
    // Collect all command slugs from categories
    Object.values(index.categories).forEach((category: any) => {
      if (category.commands) {
        allCommandSlugs.push(...category.commands);
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
        
        // Parse the command name from the first line (e.g., "# /cleanup-unused-code")
        const firstLine = text.split('\n')[0];
        const commandName = firstLine.replace(/^#\s*\//, '').trim();
        
        // Extract description (second line)
        const lines = text.split('\n').filter(line => line.trim());
        const description = lines[1] || '';
        
        // Extract metadata from sections
        const purposeMatch = text.match(/##\s*Purpose\s*\n([^\n]+)/i);
        const usageMatch = text.match(/##\s*Usage\s*\n`([^`]+)`/i);
        const speedMatch = text.match(/##\s*Speed\s*\n([^\n]+)/i);
        const whenMatch = text.match(/##\s*When to use\s*\n([^\n]+)/i);
        
        // Get category from index
        let category = 'Other';
        for (const [catKey, catData] of Object.entries(index.categories)) {
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
    return commands.filter((cmd): cmd is CommandMetadata => cmd !== null);
  } catch (error) {
    console.error('Error loading commands:', error);
    return [];
  }
}

export async function getCommandBySlug(slug: string): Promise<CommandMetadata | null> {
  try {
    // Load index to get category
    let category = 'Other';
    try {
      const indexResponse = await fetch('/commands/index.json');
      if (indexResponse.ok) {
        const index = await indexResponse.json();
        for (const [catKey, catData] of Object.entries(index.categories)) {
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

