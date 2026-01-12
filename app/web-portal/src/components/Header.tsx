import { Link } from 'react-router-dom';
import { Terminal, Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Cursor Command Library</h1>
              <p className="text-xs text-zinc-500">Browse & search slash commands</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/library" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Commands
            </Link>
            <Link to="/scripts" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Scripts
            </Link>
            <Link to="/install" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Install
            </Link>
            <a 
              href="https://github.com/iriley-mirabel/command-library" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

