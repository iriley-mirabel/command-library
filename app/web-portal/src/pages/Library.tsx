import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
// import CommandCard from '../components/CommandCard';
// import { getAllCommands, getCategoryForCommand } from '../utils/commands';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');

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
        </div>

        <div className="text-center py-12">
          <p className="text-zinc-400">
            Command library coming soon. Commands will be loaded from the .cursor/commands directory.
          </p>
        </div>
      </main>
    </div>
  );
}

