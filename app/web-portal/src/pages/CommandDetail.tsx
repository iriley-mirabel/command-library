import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { getCommandBySlug, CommandMetadata } from '../utils/commands';
import { ArrowLeft, Clock, Copy, Check } from 'lucide-react';

export default function CommandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [command, setCommand] = useState<CommandMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCommand() {
      if (!slug) return;
      setLoading(true);
      const loadedCommand = await getCommandBySlug(slug);
      setCommand(loadedCommand);
      setLoading(false);
    }
    loadCommand();
  }, [slug]);

  const copyCommand = () => {
    if (command?.title) {
      navigator.clipboard.writeText(command.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSpeedColor = (speed?: string) => {
    if (!speed) return 'text-zinc-400';
    if (speed.toLowerCase().includes('fast')) return 'text-green-400';
    if (speed.toLowerCase().includes('moderate')) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getCategoryColor = (cat?: string) => {
    if (!cat) return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    const colors: Record<string, string> = {
      'Code Quality & Cleanup': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'UI Component Fixes': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Testing & Debugging': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Development Workflows': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Discovery & Help': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Design System': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Utilities': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    };
    return colors[cat] || 'bg-zinc-800 text-zinc-400 border-zinc-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center py-12">
            <p className="text-zinc-400">Loading command...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!command) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">Command not found.</p>
            <Link
              to="/library"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Back to Library
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          to="/library"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <code className="text-2xl font-bold text-white font-mono">
                  {command.title}
                </code>
                <button
                  onClick={copyCommand}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  title="Copy command"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              {command.description && (
                <p className="text-lg text-zinc-300 mb-4">{command.description}</p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                {command.category && (
                  <span className={`text-xs px-3 py-1.5 rounded-md border ${getCategoryColor(command.category)}`}>
                    {command.category}
                  </span>
                )}
                {command.speed && (
                  <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <Clock className="h-4 w-4" />
                    <span className={getSpeedColor(command.speed)}>{command.speed}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-zinc-800 pt-6">
            {command.purpose && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Purpose</h3>
                <p className="text-zinc-400">{command.purpose}</p>
              </div>
            )}

            {command.usage && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Usage</h3>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm text-zinc-300">
                  {command.usage}
                </pre>
              </div>
            )}

            {command.whenToUse && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">When to Use</h3>
                <p className="text-zinc-400">{command.whenToUse}</p>
              </div>
            )}

            {command.content && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Full Details</h3>
                <div className="prose prose-invert prose-zinc max-w-none">
                  <div className="text-zinc-400 whitespace-pre-wrap font-mono text-sm bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                    {command.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
