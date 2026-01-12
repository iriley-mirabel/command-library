import { Link } from 'react-router-dom';
import { FileCode, Windows, Terminal } from 'lucide-react';
import type { ScriptMetadata } from '../utils/scripts';

interface ScriptCardProps {
  script: ScriptMetadata;
}

export default function ScriptCard({ script }: ScriptCardProps) {
  const getPlatformIcon = () => {
    if (script.platform === 'windows') {
      return <Windows className="h-4 w-4" />;
    } else if (script.platform === 'unix') {
      return <Terminal className="h-4 w-4" />;
    }
    return <FileCode className="h-4 w-4" />;
  };

  const getPlatformLabel = () => {
    if (script.platform === 'windows') return 'PowerShell';
    if (script.platform === 'unix') return 'Bash';
    return 'Both';
  };

  return (
    <Link to={`/script/${script.id}`}>
      <div className="group p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getPlatformIcon()}
            <code className="text-base font-semibold text-white font-mono">
              {script.filename}
            </code>
          </div>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
            {getPlatformLabel()}
          </span>
        </div>
        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
          {script.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="bg-zinc-800 px-2 py-1 rounded">
            {script.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
