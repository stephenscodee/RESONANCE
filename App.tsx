import React, { useState } from 'react';
import { Search, Music, Zap, BarChart3, TrendingUp, Play, Clock, Heart } from 'lucide-react';
import axios from 'axios';

interface Song {
  id: string;
  title: string;
  artist: string;
  similarity?: number;
  features: Record<string, number>;
}

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (song: Song) => {
    setLoading(true);
    setSelectedSong(song);
    try {
      const res = await axios.get(`http://localhost:8000/api/recommendations/${song.id}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight gradient-text">SIMILI</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Neural Music Engine</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">Explorer</a>
            <a href="#" className="hover:text-white transition-colors">Library</a>
            <a href="#" className="hover:text-white transition-colors">ML Insights</a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight">
            Discover music that <br />
            <span className="gradient-text">actually feels right</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Traditional algorithms look at genres. SIMILI looks at audio DNA: 
            energy, rhythm, and timber to find your next favorite song.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/20" />
          </div>
          <input
            type="text"
            className="w-full bg-surface border border-white/10 rounded-2xl py-5 pl-14 pr-32 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg placeholder:text-white/20 shadow-2xl"
            placeholder="Search for a song you love..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-2.5 bottom-2.5 px-6 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
          >
            Find Similar
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading && (
            <div className="flex flex-col items-center py-12 gap-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-white/40 animate-pulse font-medium">Analyzing audio patterns...</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white/40 uppercase tracking-widest text-[11px] font-bold">
                  {selectedSong ? `SIMILAR TO ${selectedSong.title}` : 'SEARCH RESULTS'}
                </h3>
                {selectedSong && (
                  <button onClick={() => {setResults([]); setSelectedSong(null); setQuery('');}} className="text-[11px] text-primary hover:underline">Clear</button>
                )}
              </div>
              {results.map((song) => (
                <div 
                  key={song.id}
                  className="glass-card rounded-2xl p-5 group hover:border-white/20 transition-all cursor-pointer flex items-center gap-6"
                  onClick={() => !song.similarity && getRecommendations(song)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                    <Music className="w-8 h-8 text-white/20 group-hover:text-primary transition-all" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{song.title}</h4>
                    <p className="text-white/40 text-sm">{song.artist}</p>
                  </div>
                  {song.similarity && (
                    <div className="text-right">
                      <div className="text-2xl font-black gradient-text">{(song.similarity * 100).toFixed(0)}%</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-tighter">Match Score</div>
                    </div>
                  )}
                  <div className="p-3 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features / Why Simili */}
        {results.length === 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {[
              { icon: <Zap />, title: "Audio DNA", desc: "We analyze the actual waveform, not just tags." },
              { icon: <BarChart3 />, title: "BPM Sync", desc: "Find songs that match the energy of your current vibe." },
              { icon: <TrendingUp />, title: "Evolving AI", desc: "The more you search, the better Simili understands your taste." }
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl border-white/5 border hover:border-white/10 transition-all group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:text-primary transition-colors">
                  {feature.icon}
                </div>
                <h5 className="font-bold mb-2">{feature.title}</h5>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-black" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Built for humans</span>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-widest">© 2026 SIMILI NEURAL SYSTEMS • PRIVACY • TERMS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
