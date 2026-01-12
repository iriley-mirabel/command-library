// Script loading utilities for the web portal

export interface ScriptMetadata {
  id: string;
  name: string;
  title: string;
  description: string;
  platform: 'windows' | 'unix' | 'both';
  category: string;
  filename: string;
  usage?: string;
  prerequisites?: string[];
  content?: string;
}

export async function getAllScripts(): Promise<ScriptMetadata[]> {
  try {
    // Load the scripts index
    const indexResponse = await fetch('/scripts/index.json');
    if (!indexResponse.ok) {
      console.error('Failed to load scripts index');
      return [];
    }
    
    const index = await indexResponse.json();
    const allScriptSlugs: string[] = [];
    
    // Collect all script slugs from categories
    Object.values(index.categories).forEach((category: any) => {
      if (category.scripts) {
        allScriptSlugs.push(...category.scripts);
      }
    });
    
    // Fetch script metadata
    const scriptPromises = allScriptSlugs.map(async (slug) => {
      try {
        // Try to load script file (.ps1 first, then .sh)
        let scriptContent = '';
        let filename = '';
        let platform: 'windows' | 'unix' | 'both' = 'both';
        
        const ps1Response = await fetch(`/scripts/${slug}.ps1`);
        if (ps1Response.ok) {
          scriptContent = await ps1Response.text();
          filename = `${slug}.ps1`;
          platform = 'windows';
        } else {
          const shResponse = await fetch(`/scripts/${slug}.sh`);
          if (shResponse.ok) {
            scriptContent = await shResponse.text();
            filename = `${slug}.sh`;
            platform = 'unix';
          }
        }
        
        // If no script found, check platform from index
        if (!scriptContent) {
          if (index.platforms?.windows?.scripts?.includes(slug)) {
            platform = 'windows';
            filename = `${slug}.ps1`;
          } else if (index.platforms?.unix?.scripts?.includes(slug)) {
            platform = 'unix';
            filename = `${slug}.sh`;
          }
        }
        
        // Get category
        let category = 'Other';
        for (const [, catData] of Object.entries(index.categories)) {
          if ((catData as any).scripts?.includes(slug)) {
            category = (catData as any).name;
            break;
          }
        }
        
        // Extract description from script comments
        let description = '';
        if (scriptContent) {
          const lines = scriptContent.split('\n');
          for (let i = 0; i < Math.min(10, lines.length); i++) {
            const line = lines[i].trim();
            if (line.startsWith('#') && !line.includes('Usage:') && !line.includes('Prerequisites:') && !line.includes('param(')) {
              const desc = line.replace(/^#+\s*/, '').trim();
              if (desc && desc.length > 10 && !desc.toLowerCase().includes('script')) {
                description = desc;
                break;
              }
            }
          }
        }
        
        return {
          id: slug,
          name: slug,
          title: slug,
          description: description || `Script: ${slug}`,
          platform,
          category,
          filename: filename || slug,
          content: scriptContent,
        };
      } catch (error) {
        console.error(`Error loading script ${slug}:`, error);
        return null;
      }
    });
    
    const scripts = await Promise.all(scriptPromises);
    const validScripts: ScriptMetadata[] = [];
    for (const script of scripts) {
      if (script !== null && script !== undefined) {
        validScripts.push(script);
      }
    }
    return validScripts;
  } catch (error) {
    console.error('Error loading scripts:', error);
    return [];
  }
}

export async function getScriptBySlug(slug: string): Promise<ScriptMetadata | null> {
  try {
    // Load index to get category and platform
    let category = 'Other';
    let platform: 'windows' | 'unix' | 'both' = 'both';
    
    try {
      const indexResponse = await fetch('/scripts/index.json');
      if (indexResponse.ok) {
        const index = await indexResponse.json();
        // Get category
        for (const [, catData] of Object.entries(index.categories)) {
          if ((catData as any).scripts?.includes(slug)) {
            category = (catData as any).name;
            break;
          }
        }
        // Get platform
        if (index.platforms?.windows?.scripts?.includes(slug)) {
          platform = 'windows';
        } else if (index.platforms?.unix?.scripts?.includes(slug)) {
          platform = 'unix';
        }
      }
    } catch (e) {
      // Index not available
    }
    
    // Try to load script file (.ps1 first, then .sh)
    let content = '';
    let filename = '';
    
    const ps1Response = await fetch(`/scripts/${slug}.ps1`);
    if (ps1Response.ok) {
      content = await ps1Response.text();
      filename = `${slug}.ps1`;
      platform = 'windows';
    } else {
      const shResponse = await fetch(`/scripts/${slug}.sh`);
      if (shResponse.ok) {
        content = await shResponse.text();
        filename = `${slug}.sh`;
        platform = 'unix';
      } else {
        return null;
      }
    }
    
    // Extract description from script comments
    let description = '';
    if (content) {
      const lines = content.split('\n');
      for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i].trim();
        if (line.startsWith('#') && !line.includes('Usage:') && !line.includes('Prerequisites:') && !line.includes('param(')) {
          const desc = line.replace(/^#+\s*/, '').trim();
          if (desc && desc.length > 10 && !desc.toLowerCase().includes('script')) {
            description = desc;
            break;
          }
        }
      }
    }
    
    return {
      id: slug,
      name: slug,
      title: slug,
      description: description || `Script: ${slug}`,
      platform,
      category,
      filename: filename || slug,
      content,
    };
  } catch (error) {
    console.error(`Error loading script ${slug}:`, error);
    return null;
  }
}
