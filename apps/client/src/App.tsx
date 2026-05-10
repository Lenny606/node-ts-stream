import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Zap, Play, Info } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [pingData, setPingData] = useState<any>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/v1/ping');
        if (response.ok) {
          const data = await response.json();
          setPingData(data);
          setStatus('connected');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <header className="flex flex-col items-center gap-4">
          <div className="bg-brand-primary p-4 rounded-full shadow-[0_0_30px_rgba(229,9,20,0.4)] animate-pulse">
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Stream <span className="text-brand-primary">Node</span>
          </h1>
          <p className="text-white/60 text-lg">Premium ABR Streaming Engine</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status Panel */}
          <div className="glass-morphism p-6 rounded-2xl border border-white/10 flex flex-col gap-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-primary" />
              System Status
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/70">Backend Connectivity</span>
                {status === 'checking' && (
                  <span className="text-xs px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-md">CHECKING</span>
                )}
                {status === 'connected' && (
                  <span className="text-xs px-2 py-1 bg-green-400/20 text-green-400 rounded-md">OPERATIONAL</span>
                )}
                {status === 'error' && (
                  <span className="text-xs px-2 py-1 bg-red-400/20 text-red-400 rounded-md">ERROR</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/70">Security Protocol</span>
                <span className="text-xs px-2 py-1 bg-blue-400/20 text-blue-400 rounded-md">ENCRYPTED</span>
              </div>
            </div>

            {status === 'connected' && (
              <button 
                onClick={() => setShowPlayer(!showPlayer)}
                className="mt-4 w-full py-3 px-6 bg-brand-primary hover:bg-brand-secondary transition-all rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
              >
                <Play className="w-4 h-4 fill-current" />
                {showPlayer ? 'Hide Test Stream' : 'Launch Test Stream'}
              </button>
            )}
          </div>

          {/* Telemetry Panel */}
          <div className="glass-morphism p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              Live Telemetry
            </h2>
            <div className="flex-1 bg-black/40 rounded-xl p-4 font-mono text-xs overflow-hidden">
              {pingData ? (
                <pre className="text-green-400/80 leading-relaxed">
                  {JSON.stringify(pingData, null, 2)}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-white/20 italic">
                  Waiting for telemetry...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        {showPlayer && (
          <div className="glass-morphism p-4 rounded-3xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-black">
              <video 
                className="w-full h-full object-contain"
                controls
                autoPlay
                src="/api/v1/videos/test-id/stream"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 px-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Test Stream: sample.mp4</p>
                <p className="text-xs text-white/40">RFC 7233 Range-Based Delivery</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-brand-primary/20 text-brand-primary rounded border border-brand-primary/30 font-bold uppercase">206 Partial</span>
                <span className="text-[10px] px-2 py-0.5 bg-white/10 text-white/60 rounded border border-white/20 font-bold uppercase">H.264</span>
              </div>
            </div>
          </div>
        )}

        <footer className="pt-8 pb-4 text-center">
          <p className="text-xs text-white/20 uppercase tracking-[0.2em] font-medium">
            &copy; 2026 StreamNode • Advanced Streaming Solutions
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
