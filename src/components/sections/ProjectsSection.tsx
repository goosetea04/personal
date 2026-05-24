import React, { useState, useEffect, useMemo } from 'react';
import { projects } from '@/constants/projects';
import { ExternalLink, Github, X, FolderCode, Zap, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  links: {
    demo?: string;
    repo?: string;
  };
}

type SortOption = 'default' | 'az' | 'za';

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Derive unique tags
  const allTags = useMemo(() => {
    const tags = Array.from(new Set((projects as Project[]).map(p => p.tag)));
    return ['ALL', ...tags];
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...(projects as Project[])];
    if (activeTag !== 'ALL') list = list.filter(p => p.tag === activeTag);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [activeTag, searchQuery, sort]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  // Close sort dropdown on outside click
  useEffect(() => {
    if (!sortOpen) return;
    const handler = () => setSortOpen(false);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [sortOpen]);

  const sortLabels: Record<SortOption, string> = {
    default: 'DEFAULT',
    az: 'A → Z',
    za: 'Z → A',
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">

      {/* HEADER */}
      <h2 className="text-5xl md:text-7xl font-black text-white mb-10 transform -rotate-3 border-b-4 border-[#39ff14] animate-mask-wipe uppercase tracking-tighter">
        My Projects
      </h2>

      {/* ── CONTROLS BAR ── */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-8 flex flex-col gap-4">

        {/* Search + Sort row */}
        <div className="flex gap-3 items-stretch">

          {/* Search */}
          <div className={`relative flex-1 border-2 transition-colors duration-150 ${searchFocused ? 'border-[#39ff14]' : 'border-white/20'}`}>
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-[#39ff14]' : 'text-white/40'}`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="SEARCH_PROJECT..."
              className="w-full bg-zinc-900 text-white placeholder-white/25 font-black text-xs tracking-widest pl-9 pr-4 py-3 outline-none uppercase"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#39ff14] transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSortOpen(o => !o)}
              className={`flex items-center gap-2 border-2 bg-zinc-900 px-4 py-3 font-black text-xs tracking-widest uppercase transition-colors h-full ${sortOpen ? 'border-[#39ff14] text-[#39ff14]' : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'}`}
            >
              <SlidersHorizontal size={14} />
              <span>{sortLabels[sort]}</span>
              <ChevronDown size={12} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-black border-2 border-[#39ff14] min-w-[130px]">
                {(['default', 'az', 'za'] as SortOption[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSort(opt); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 font-black text-xs tracking-widest uppercase transition-colors ${sort === opt ? 'bg-[#39ff14] text-black' : 'text-white/70 hover:bg-zinc-800 hover:text-white'}`}
                  >
                    {sortLabels[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tag Filter pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase mr-1">FILTER//</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`relative px-3 py-1.5 font-black text-[10px] tracking-[0.15em] uppercase border-2 transition-all duration-150 transform
                ${activeTag === tag
                  ? 'bg-[#39ff14] text-black border-[#39ff14] -skew-x-3 shadow-[4px_4px_0_rgba(57,255,20,0.3)]'
                  : 'bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white -skew-x-1'
                }`}
            >
              {tag}
            </button>
          ))}

          {/* Result count */}
          <span className="ml-auto text-[10px] font-black text-white/30 tracking-widest uppercase">
            {filtered.length}/{(projects as Project[]).length}_RESULTS
          </span>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-[#39ff14]/20 font-black text-7xl tracking-tighter">??</div>
            <p className="font-black text-white/30 text-sm tracking-[0.3em] uppercase">NO_RESULTS_FOUND</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTag('ALL'); }}
              className="mt-2 border-2 border-white/20 text-white/50 hover:border-[#39ff14] hover:text-[#39ff14] font-black text-[10px] tracking-widest uppercase px-4 py-2 transition-colors"
            >
              [ CLEAR_FILTERS ]
            </button>
          </div>
        ) : (
          filtered.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="group relative cursor-pointer"
              style={{
                animation: `slide-up-stagger 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                animationDelay: `${0.05 + (i * 0.07)}s`,
                opacity: 0,
              }}
            >
              {/* Background Skewed Card */}
              <div className="bg-zinc-900 border-2 border-white/20 transform -skew-x-2 transition-all duration-200 group-hover:border-[#39ff14] group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0_rgba(57,255,20,0.2)] overflow-hidden">

                {/* Image Container */}
                <div className="relative h-44 overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-[#39ff14]/10 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute top-0 right-0 bg-[#39ff14] text-black font-black px-4 py-1 text-[12px] uppercase tracking-tighter">
                    {p.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 mt-5">
                  <h3 className="text-xl font-black text-white group-hover:text-[#39ff14] transition-colors flex items-center gap-2 italic">
                    <Zap size={18} className="fill-current" />
                    {p.title}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm line-clamp-2 font-bold leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    {/* Tag badge (secondary) */}
                    <span
                      onClick={e => { e.stopPropagation(); setActiveTag(p.tag); }}
                      className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase border border-white/10 px-2 py-1 hover:border-[#39ff14]/40 hover:text-[#39ff14]/60 transition-colors cursor-pointer"
                    >
                      #{p.tag}
                    </span>
                    <span className="text-[10px] font-black text-[#39ff14] tracking-[0.2em] uppercase bg-[#39ff14]/10 px-2 py-1">
                      [ VIEW_STORY ]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

          <div className="relative bg-black border-2 border-[#39ff14] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform -skew-x-1 animate-in zoom-in-95 duration-300 shadow-[20px_20px_0_rgba(57,255,20,0.1)]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-0 right-0 z-50 bg-[#39ff14] text-black p-2 hover:bg-white transition-colors"
            >
              <X size={24} strokeWidth={3} />
            </button>

            {/* Modal Left */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProject.image} alt="" className="w-full h-full object-cover contrast-125 grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              {/* Tag chip on modal */}
              <span className="absolute top-4 left-4 bg-[#39ff14] text-black font-black text-[10px] tracking-widest uppercase px-3 py-1">
                {selectedProject.tag}
              </span>
              <h2 className="absolute bottom-6 left-6 text-4xl font-black text-white italic uppercase leading-none tracking-tighter">
                {selectedProject.title}
              </h2>
            </div>

            {/* Modal Right */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-black text-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6 text-[#39ff14]">
                <FolderCode size={24} />
                <span className="font-black text-sm tracking-widest uppercase">Technical_Analysis</span>
              </div>
              <p className="text-lg leading-relaxed font-bold mb-8 text-gray-300">
                {selectedProject.description}
              </p>
              <div className="flex flex-col gap-3">
                {selectedProject.links.repo && (
                  <a href={selectedProject.links.repo} target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between bg-white text-black font-black p-4 text-sm hover:bg-[#39ff14] transition-all transform -skew-x-3"
                  >
                    <span className="flex items-center gap-2"><Github size={20} /> SOURCE_CODE</span>
                    <ExternalLink size={18} />
                  </a>
                )}
                {selectedProject.links.demo && (
                  <a href={selectedProject.links.demo} target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between bg-[#39ff14] text-black font-black p-4 text-sm hover:bg-white transition-all transform -skew-x-3"
                  >
                    <span className="flex items-center gap-2"><Zap size={20} fill="black" /> LIVE_DEMO</span>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>

              {/* Navigation arrows in modal */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between">
                <button
                  onClick={() => {
                    const idx = filtered.findIndex(p => p.id === selectedProject.id);
                    if (idx > 0) setSelectedProject(filtered[idx - 1]);
                  }}
                  disabled={filtered.findIndex(p => p.id === selectedProject.id) === 0}
                  className="font-black text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-[#39ff14] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  ← PREV
                </button>
                <span className="font-black text-[10px] tracking-widest text-white/20 uppercase">
                  {filtered.findIndex(p => p.id === selectedProject.id) + 1} / {filtered.length}
                </span>
                <button
                  onClick={() => {
                    const idx = filtered.findIndex(p => p.id === selectedProject.id);
                    if (idx < filtered.length - 1) setSelectedProject(filtered[idx + 1]);
                  }}
                  disabled={filtered.findIndex(p => p.id === selectedProject.id) === filtered.length - 1}
                  className="font-black text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-[#39ff14] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up-stagger {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-mask-wipe {
          mask-image: linear-gradient(to right, black 0%, black 100%);
          mask-size: 100% 100%;
          animation: mask-wipe-anim 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        }
        @keyframes mask-wipe-anim {
          0% { mask-size: 0% 100%; }
          100% { mask-size: 100% 100%; }
        }
      `}</style>
    </div>
  );
};