import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { CommandMetadata } from '../utils/commands';

interface CommandCardProps {
  command: CommandMetadata;
}

export default function CommandCard({ command }: CommandCardProps) {
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

  return (
    <Link to={`/command/${command.id}`}>
      <div className="group p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <code className="text-base font-semibold text-white font-mono">
            {command.title}
          </code>
          <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2 mt-1" />
        </div>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
          {command.description || command.purpose}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {command.category && (
            <span className={`text-xs px-2.5 py-1 rounded-md border ${getCategoryColor(command.category)}`}>
              {command.category}
            </span>
          )}
          {command.speed && (
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock className="h-3 w-3" />
              <span className={getSpeedColor(command.speed)}>{command.speed}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

