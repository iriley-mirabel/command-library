'use client';

import { useState, useMemo } from 'react';
import { getAllCommands, getCategoryForCommand, CommandMetadata } from '@/lib/commands';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CommandCard from '@/components/CommandCard';

interface LibraryClientProps {
  commands: CommandMetadata[];
}

export default function LibraryClient({ commands }: LibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(commands.map(cmd => getCategoryForCommand(cmd.id)));
    return ['all', ...Array.from(cats).sort()];
  }, [commands]);

  const filteredCommands = useMemo(() => {
    return commands.filter(command => {
      const matchesSearch = searchQuery === '' || 
        command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.purpose?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryForCommand(command.id).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        getCategoryForCommand(command.id) === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [commands, searchQuery, selectedCategory]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandMetadata[]> = {};
    filteredCommands.forEach(command => {
      const category = getCategoryForCommand(command.id);
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(command);
    });
    return groups;
  }, [filteredCommands]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Command Library</h1>
          <p className="text-zinc-400 mb-8">
            Browse all {commands.length} available commands. Search by name, category, or purpose.
          </p>
          
          <div className="mb-6">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-zinc-900'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {category === 'all' ? 'All Commands' : category}
              </button>
            ))}
          </div>
        </div>

        {filteredCommands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">No commands found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
              <div key={category}>
                <h2 className="text-xl font-bold text-white mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCommands.map(command => (
                    <CommandCard 
                      key={command.id} 
                      command={command}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

