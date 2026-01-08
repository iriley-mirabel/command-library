import matter from 'gray-matter';

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

// In a real app, this would fetch from a server or use fs in Node
// For now, we'll use a simple fetch to get the markdown files
export async function getAllCommands(): Promise<CommandMetadata[]> {
  // Since we're in a browser, we'll need to load commands differently
  // For now, let's create a simple mapping of commands
  // In production, you'd fetch this from an API or bundle it
  
  // For demo, returning empty array - we'll populate from the actual .md files
  // You can copy the command files to public/commands/ and fetch them
  const commands: CommandMetadata[] = [];
  
  // If you have commands in public/commands/*.md, you could fetch them:
  // const response = await fetch('/commands/index.json');
  // const commandList = await response.json();
  // ... then fetch each command
  
  return commands;
}

export async function getCommandBySlug(slug: string): Promise<CommandMetadata | null> {
  try {
    const response = await fetch(`/commands/${slug}.md`);
    const text = await response.text();
    const { data, content } = matter(text);
    
    const firstLine = content.split('\n')[0];
    const commandName = firstLine.replace(/^#\s*\//, '').trim();
    const lines = content.split('\n').filter(line => line.trim());
    const description = lines[1] || '';
    
    const purposeMatch = content.match(/##\s*Purpose\s*\n([^\n]+)/);
    const usageMatch = content.match(/##\s*Usage\s*\n`([^`]+)`/);
    const speedMatch = content.match(/##\s*Speed\s*\n([^\n]+)/);
    const whenMatch = content.match(/##\s*When to use\s*\n([^\n]+)/);
    
    return {
      id: slug,
      name: commandName,
      title: `/${commandName}`,
      description,
      purpose: purposeMatch?.[1]?.trim(),
      usage: usageMatch?.[1]?.trim(),
      speed: speedMatch?.[1]?.trim(),
      whenToUse: whenMatch?.[1]?.trim(),
      content,
    };
  } catch (error) {
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

