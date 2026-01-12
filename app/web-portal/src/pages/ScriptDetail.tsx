import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { getScriptBySlug, ScriptMetadata } from '../utils/scripts';
import { ArrowLeft, Download, Windows, Terminal, Copy, Check } from 'lucide-react';

export default function ScriptDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [script, setScript] = useState<ScriptMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadScript() {
      if (!slug) return;
      setLoading(true);
      const loadedScript = await getScriptBySlug(slug);
      setScript(loadedScript);
      setLoading(false);
    }
    loadScript();
  }, [slug]);

  const downloadScript = () => {
    if (script?.content && script?.filename) {
      const blob = new Blob([script.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = script.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const copyScript = () => {
    if (script?.content) {
      navigator.clipboard.writeText(script.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPlatformIcon = () => {
    if (script?.platform === 'windows') {
      return <Windows className="h-5 w-5" />;
    } else if (script?.platform === 'unix') {
      return <Terminal className="h-5 w-5" />;
    }
    return <Terminal className="h-5 w-5" />;
  };

  const getPlatformLabel = () => {
    if (script?.platform === 'windows') return 'PowerShell';
    if (script?.platform === 'unix') return 'Bash';
    return 'Cross-platform';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <p className="text-zinc-400">Loading script...</p>
        </main>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <p className="text-zinc-400">Script not found.</p>
          <Link to="/scripts" className="text-white hover:underline mt-4 inline-block">
            ← Back to Scripts
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          to="/scripts" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scripts
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getPlatformIcon()}
                <code className="text-2xl font-bold text-white font-mono">
                  {script.filename}
                </code>
              </div>
              <p className="text-zinc-400">{script.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded">
                {getPlatformLabel()}
              </span>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded">
                {script.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={downloadScript}
              className="px-4 py-2 bg-white text-zinc-900 rounded-lg font-medium hover:bg-zinc-100 transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Script
            </button>
            <button
              onClick={copyScript}
              className="px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg font-medium hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Script
                </>
              )}
            </button>
          </div>
        </div>

        {script.content && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Script Content</h2>
            <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto text-sm text-zinc-300 font-mono">
              <code>{script.content}</code>
            </pre>
          </div>
        )}

        {script.prerequisites && script.prerequisites.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-white mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              {script.prerequisites.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {script.usage && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-white mb-4">Usage</h2>
            <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto text-sm text-zinc-300 font-mono">
              <code>{script.usage}</code>
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
