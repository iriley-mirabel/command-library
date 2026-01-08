import { getCommandBySlug, getAllCommands, getCategoryForCommand } from '@/lib/commands';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import { Copy, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CopyButton from './CopyButton';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const commands = await getAllCommands();
  return commands.map((command) => ({
    slug: command.id,
  }));
}

export default async function CommandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const command = await getCommandBySlug(slug);

  if (!command) {
    notFound();
  }

  const category = getCategoryForCommand(command.id);

  const getSpeedColor = (speed?: string) => {
    if (!speed) return 'text-zinc-400';
    if (speed.toLowerCase().includes('fast')) return 'text-green-400';
    if (speed.toLowerCase().includes('moderate')) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          href="/library"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <code className="text-2xl font-bold text-white font-mono">{command.title}</code>
              <p className="text-zinc-400 mt-3">{command.description}</p>
            </div>
            <CopyButton content={command.content} />
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-400">{category}</span>
            </div>
            {command.speed && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className={`text-sm ${getSpeedColor(command.speed)}`}>{command.speed}</span>
              </div>
            )}
          </div>
        </div>

        {command.purpose && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3">Purpose</h2>
            <p className="text-zinc-400 leading-relaxed">{command.purpose}</p>
          </div>
        )}

        {command.usage && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3">Usage</h2>
            <code className="block p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-sm">
              {command.usage}
            </code>
          </div>
        )}

        {command.whenToUse && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3">When to Use</h2>
            <p className="text-zinc-400 leading-relaxed">{command.whenToUse}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Full Command</h2>
          <div className="relative">
            <pre className="p-6 bg-zinc-950 border border-zinc-800 rounded-lg overflow-x-auto">
              <code className="text-sm text-zinc-300 font-mono leading-relaxed">{command.content}</code>
            </pre>
            <div className="absolute top-4 right-4">
              <CopyButton content={command.content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

