import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Download, FileCode } from 'lucide-react';

export default function Install() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-3">Installation Guide</h1>
        <p className="text-lg text-zinc-400 mb-12">
          Get up and running with the Cursor Command Library in 5 minutes.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Understanding the Setup</h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            <strong className="text-white">Clone once</strong> to your machine (not in a project). Then <strong className="text-white">run setup in each project</strong> where you want the commands. Each project gets its own <code className="text-white bg-zinc-800 px-2 py-1 rounded">.cursor/commands/</code> folder that links to the shared library.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Clone the Repository (Once)</h3>
                <p className="text-zinc-400 mb-3">
                  Clone the command library to a standard location on your machine:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-500 mb-2">Linux/Mac:</p>
                    <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                      {`git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-2">Windows (PowerShell):</p>
                    <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                      {`git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\\cursor-commands`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run Setup Script (In Each Project)</h3>
                <p className="text-zinc-400 mb-3">
                  Navigate to your project directory and run the setup script:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-500 mb-2">Linux/Mac:</p>
                    <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                      {`cd ~/your-project
bash ~/cursor-commands/scripts/setup-commands.sh`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-2">Windows (PowerShell):</p>
                    <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                      {`cd C:\\Projects-AICodeAssistants\\YourProject
& "$env:USERPROFILE\\cursor-commands\\scripts\\setup-commands.ps1"`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Start Using Commands</h3>
                <p className="text-zinc-400 mb-3">
                  Open Cursor IDE and type <code className="text-white bg-zinc-800 px-2 py-1 rounded">/</code> to see all available commands!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Scripts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileCode className="h-6 w-6" />
            Utility Scripts
          </h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-4">
            <p className="text-zinc-400 mb-4 leading-relaxed">
              The library also includes utility scripts for deployment, automation, and setup tasks. These are separate from commands and can be downloaded as needed.
            </p>
            <Link 
              to="/scripts"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 rounded-lg font-medium hover:bg-zinc-100 transition-colors"
            >
              <FileCode className="h-4 w-4" />
              Browse Scripts Library
            </Link>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Available Scripts</h3>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <div>
                  <strong className="text-white">deploy-and-fix.ps1</strong> - Automated AWS Amplify deployment with build monitoring
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <div>
                  <strong className="text-white">setup-commands.sh/.ps1</strong> - Setup script for linking commands to projects
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <div>
                  <strong className="text-white">update-commands.sh/.ps1</strong> - Update script for pulling latest commands
                </div>
              </li>
            </ul>
            <p className="text-zinc-400 mt-4 text-sm">
              <strong className="text-white">How to use:</strong> Visit the <Link to="/scripts" className="text-blue-400 hover:text-blue-300 underline">Scripts Library</Link> page to browse, view details, and download scripts. Scripts can be copied to your clipboard or downloaded directly.
            </p>
          </div>
        </div>

        {/* Daily Updates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Download className="h-6 w-6" />
            Daily Updates
          </h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-400 mb-4">
              Pull the latest commands at the start of each day:
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-500 mb-2">Linux/Mac:</p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                  {`cd ~/cursor-commands
git pull`}
                </pre>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-2">Windows (PowerShell):</p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                  {`cd $env:USERPROFILE\\cursor-commands
git pull`}
                </pre>
              </div>
            </div>
            <p className="text-zinc-400 mt-4 text-sm">
              If using symlinks, commands update automatically in all projects!
            </p>
          </div>
        </div>

        {/* Windows-Specific Notes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Windows PowerShell Notes</h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">PowerShell Execution Policy</h3>
              <p className="text-zinc-400 mb-3 text-sm leading-relaxed">
                If you get an execution policy error, you may need to allow scripts:
              </p>
              <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                {`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Symlink Creation</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Creating symlinks on Windows may require Administrator privileges. If the script fails, it will offer to copy the commands instead.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-white">Alternative:</strong> Right-click PowerShell and select &quot;Run as Administrator&quot; before running the setup script.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Symlink Integration</h3>
              <p className="text-zinc-400 leading-relaxed">
                The setup script creates a symlink from your project&apos;s <code className="text-white bg-zinc-800 px-2 py-1 rounded">.cursor/commands/</code> to the library. 
                This means commands stay in one place and updates are automatic.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Git Strategy</h3>
              <p className="text-zinc-400 leading-relaxed">
                The setup script adds <code className="text-white bg-zinc-800 px-2 py-1 rounded">.cursor/commands</code> to your project&apos;s <code className="text-white bg-zinc-800 px-2 py-1 rounded">.gitignore</code>. 
                Commands stay in the library repo, keeping your project repos clean.
              </p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Verify Installation</h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-400 mb-4">
              After installation, verify everything works:
            </p>
            <ul className="space-y-2 text-zinc-400 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><code className="text-white bg-zinc-800 px-2 py-1 rounded">.cursor/commands/</code> exists in your project</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Commands appear when typing <code className="text-white bg-zinc-800 px-2 py-1 rounded">/</code> in Cursor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><code className="text-white bg-zinc-800 px-2 py-1 rounded">.cursor/commands</code> is in <code className="text-white bg-zinc-800 px-2 py-1 rounded">.gitignore</code></span>
              </li>
            </ul>
            
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500 mb-3 font-medium">Windows PowerShell - Verify setup:</p>
              <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                {`# Check if .cursor/commands exists
Test-Path .cursor\\commands

# Check if it's in .gitignore
Select-String -Path .gitignore -Pattern "\\.cursor/commands"`}
              </pre>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://github.com/iriley-mirabel/command-library"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">View on GitHub</h3>
            <p className="text-zinc-400 text-sm">
              Access the repository, contribute, or report issues.
            </p>
          </a>

          <a 
            href="https://github.com/iriley-mirabel/command-library#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Full Documentation</h3>
            <p className="text-zinc-400 text-sm">
              Read the complete README with troubleshooting and advanced usage.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

