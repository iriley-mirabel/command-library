import Link from 'next/link';
import { getAllCommands, getCategoryForCommand } from '@/lib/commands';
import { Download, Zap, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CommandCard from '@/components/CommandCard';

export const dynamic = 'force-static';

export default async function Home() {
  const allCommands = await getAllCommands();
  const mostUsed = [
    'cleanup-unused-code',
    'fix-import-paths',
    'standardize-page',
    'test-page-quick',
    'pre-commit-checklist',
    'pr-ready'
  ];
  
  const featuredCommands = allCommands.filter(cmd => mostUsed.includes(cmd.id));

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Cursor Command Library
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A centralized repository of slash commands for Cursor IDE. Browse, search, and download 20+ commands to standardize your development workflow.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
            <Link 
              href="/library"
              className="px-6 py-3 bg-white text-zinc-900 rounded-lg font-medium hover:bg-zinc-100 transition-colors flex items-center gap-2 shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              Browse Commands
            </Link>
            <Link 
              href="/install"
              className="px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg font-medium hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Install Guide
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-zinc-700 transition-colors">
            <div className="text-4xl font-bold text-white mb-2">20+</div>
            <div className="text-zinc-400 text-sm uppercase tracking-wide">Slash Commands</div>
          </div>
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-zinc-700 transition-colors">
            <div className="text-4xl font-bold text-white mb-2">7</div>
            <div className="text-zinc-400 text-sm uppercase tracking-wide">Categories</div>
          </div>
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-zinc-700 transition-colors">
            <div className="text-4xl font-bold text-white mb-2">Open</div>
            <div className="text-zinc-400 text-sm uppercase tracking-wide">Source</div>
          </div>
        </div>

        {/* Most Used Commands */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Most Used Commands</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCommands.map((command) => (
              <CommandCard 
                key={command.id} 
                command={command}
                category={getCategoryForCommand(command.id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">Quick Start</h3>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Get up and running in 5 minutes. Clone the repo, run the setup script, and start using commands immediately.
            </p>
            <Link 
              href="/install"
              className="text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-2 font-medium"
            >
              View Installation Guide →
            </Link>
          </div>
          
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">Contribute</h3>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Add your own commands or improve existing ones. All contributions are welcome to help the team grow.
            </p>
            <a 
              href="https://github.com/iriley-mirabel/command-library"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-2 font-medium"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
