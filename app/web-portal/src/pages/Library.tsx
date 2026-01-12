import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CommandCard from '../components/CommandCard';
import { getAllCommands, CommandMetadata } from '../utils/commands';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [commands, setCommands] = useState<CommandMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadCommands() {
      setLoading(true);
      const loadedCommands = await getAllCommands();
      setCommands(loadedCommands);
      setLoading(false);
    }
    loadCommands();
  }, []);

  // Filter commands based on search query and category
  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch = 
      !searchQuery ||
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || cmd.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(commands.map(cmd => cmd.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Command Library</h1>
          <p className="text-zinc-400 mb-8">
            Browse all available commands. Search by name, category, or purpose.
          </p>
          
          <div className="mb-6">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-zinc-700 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-zinc-700 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">Loading commands...</p>
          </div>
        ) : filteredCommands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">
              {searchQuery || selectedCategory
                ? 'No commands found matching your criteria.'
                : 'No commands available.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-zinc-500 text-sm">
              Showing {filteredCommands.length} of {commands.length} commands
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommands.map((command) => (
                <CommandCard key={command.id} command={command} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

