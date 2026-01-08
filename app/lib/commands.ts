import fs from 'fs';
import path from 'path';
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

const COMMANDS_DIR = path.join(process.cwd(), '..', '.cursor', 'commands');

export async function getAllCommands(): Promise<CommandMetadata[]> {
  const files = fs.readdirSync(COMMANDS_DIR);
  const commands: CommandMetadata[] = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(COMMANDS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Extract command name from the first line (# /command-name)
      const firstLine = content.split('\n')[0];
      const commandName = firstLine.replace(/^#\s*\//, '').trim();
      
      // Extract description (first paragraph after title)
      const lines = content.split('\n').filter(line => line.trim());
      const description = lines[1] || '';
      
      // Extract purpose, usage, speed from the markdown
      const purposeMatch = content.match(/##\s*Purpose\s*\n([^\n]+)/);
      const usageMatch = content.match(/##\s*Usage\s*\n`([^`]+)`/);
      const speedMatch = content.match(/##\s*Speed\s*\n([^\n]+)/);
      const whenMatch = content.match(/##\s*When to use\s*\n([^\n]+)/);
      
      commands.push({
        id: file.replace('.md', ''),
        name: commandName,
        title: `/${commandName}`,
        description,
        purpose: purposeMatch?.[1]?.trim(),
        usage: usageMatch?.[1]?.trim(),
        speed: speedMatch?.[1]?.trim(),
        whenToUse: whenMatch?.[1]?.trim(),
        content: content,
      });
    }
  }

  return commands.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCommandBySlug(slug: string): Promise<CommandMetadata | null> {
  try {
    const filePath = path.join(COMMANDS_DIR, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
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

