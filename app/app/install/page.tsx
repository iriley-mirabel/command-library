import Header from '@/components/Header';
import { Terminal, Download, CheckCircle } from 'lucide-react';

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-3">Installation Guide</h1>
        <p className="text-lg text-zinc-400 mb-12">
          Get up and running with the Cursor Command Library in 5 minutes.
        </p>

        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            Quick Start
          </h2>
          
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-100 font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Clone the Repository</h3>
                  <p className="text-zinc-400 mb-3">
                    Clone the command library to a standard location on your machine:
                  </p>
                  <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="text-sm text-zinc-300 font-mono">
                      {`# Linux/Mac
git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands

# Windows (PowerShell)
git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\\cursor-commands`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-100 font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">Run Setup Script</h3>
                  <p className="text-zinc-400 mb-3">
                    Navigate to your project and run the setup script:
                  </p>
                  <pre className="bg-zinc-950 border border-zinc-800 rounded p-4 overflow-x-auto">
                    <code className="text-sm text-zinc-300 font-mono">
                      {`cd ~/your-project

# Linux/Mac
bash ~/cursor-commands/scripts/setup-commands.sh

# Windows (PowerShell)
~/cursor-commands/scripts/setup-commands.ps1`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-100 font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">Start Using Commands</h3>
                  <p className="text-zinc-400 mb-3">
                    Open Cursor IDE and type <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">/</code> to see all available commands!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Updates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <Download className="h-6 w-6" />
            Daily Updates
          </h2>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-400 mb-4">
              Pull the latest commands at the start of each day:
            </p>
            <pre className="bg-zinc-950 border border-zinc-800 rounded p-4 overflow-x-auto">
              <code className="text-sm text-zinc-300 font-mono">
                {`cd ~/cursor-commands
git pull`}
              </code>
            </pre>
            <p className="text-zinc-400 mt-4 text-sm">
              If using symlinks, commands update automatically in all projects!
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">How It Works</h2>
          
          <div className="space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Symlink Integration</h3>
              <p className="text-zinc-400">
                The setup script creates a symlink from your project&apos;s <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.cursor/commands/</code> to the library. 
                This means commands stay in one place and updates are automatic.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Git Strategy</h3>
              <p className="text-zinc-400">
                The setup script adds <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.cursor/commands</code> to your project&apos;s <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.gitignore</code>. 
                Commands stay in the library repo, keeping your project repos clean.
              </p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Verify Installation
          </h2>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-400 mb-4">
              After installation, verify everything works:
            </p>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.cursor/commands/</code> exists in your project</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Commands appear when typing <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">/</code> in Cursor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.cursor/commands</code> is in <code className="text-zinc-100 bg-zinc-800 px-2 py-1 rounded">.gitignore</code></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://github.com/iriley-mirabel/command-library"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">View on GitHub</h3>
            <p className="text-zinc-400 text-sm">
              Access the repository, contribute, or report issues.
            </p>
          </a>

          <a 
            href="https://github.com/iriley-mirabel/command-library#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Full Documentation</h3>
            <p className="text-zinc-400 text-sm">
              Read the complete README with troubleshooting and advanced usage.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

