'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
      <input
        type="text"
        placeholder="Search commands by name, category, or purpose..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-700 text-white placeholder-zinc-500 transition-all"
      />
    </div>
  );
}

