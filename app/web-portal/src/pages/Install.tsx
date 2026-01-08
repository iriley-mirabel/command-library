import Header from '../components/Header';
import { Terminal, Download } from 'lucide-react';

export default function Install() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-3">Installation Guide</h1>
        <p className="text-lg text-zinc-400 mb-12">
          Get up and running with the Cursor Command Library in 5 minutes.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Clone the Repository</h3>
                <p className="text-zinc-400 mb-3">
                  Clone the command library to a standard location on your machine:
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                  {`git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run Setup Script</h3>
                <p className="text-zinc-400 mb-3">
                  Navigate to your project and run the setup script:
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                  {`cd ~/your-project
bash ~/cursor-commands/scripts/setup-commands.sh`}
                </pre>
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
      </main>
    </div>
  );
}

