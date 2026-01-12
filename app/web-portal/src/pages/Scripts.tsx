import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ScriptCard from '../components/ScriptCard';
import { getAllScripts, ScriptMetadata } from '../utils/scripts';

export default function Scripts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scripts, setScripts] = useState<ScriptMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  useEffect(() => {
    async function loadScripts() {
      setLoading(true);
      const loadedScripts = await getAllScripts();
      setScripts(loadedScripts);
      setLoading(false);
    }
    loadScripts();
  }, []);

  // Filter scripts based on search query, category, and platform
  const filteredScripts = scripts.filter((script) => {
    const matchesSearch = 
      !searchQuery ||
      script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || script.category === selectedCategory;
    
    const matchesPlatform = !selectedPlatform || 
      (selectedPlatform === 'windows' && script.platform === 'windows') ||
      (selectedPlatform === 'unix' && script.platform === 'unix') ||
      (selectedPlatform === 'both' && script.platform === 'both');
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  // Get unique categories
  const categories = Array.from(new Set(scripts.map(s => s.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Scripts Library</h1>
          <p className="text-zinc-400 mb-8">
            Browse and download utility scripts for deployment, setup, and automation.
          </p>
          
          <div className="mb-6">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-zinc-700 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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

          {/* Platform filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedPlatform(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === null
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setSelectedPlatform('windows')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === 'windows'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              Windows
            </button>
            <button
              onClick={() => setSelectedPlatform('unix')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === 'unix'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              Unix/Linux/Mac
            </button>
            <button
              onClick={() => setSelectedPlatform('both')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === 'both'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              Both
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">Loading scripts...</p>
          </div>
        ) : filteredScripts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">
              {searchQuery || selectedCategory || selectedPlatform
                ? 'No scripts found matching your criteria.'
                : 'No scripts available.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-zinc-500 text-sm">
              Showing {filteredScripts.length} of {scripts.length} scripts
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
