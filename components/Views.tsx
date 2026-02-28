
import React, { useState, useEffect, useRef } from 'react';
import { AppView, ScoreEntry } from '../types';
import { getGameTip, getJerryTaunt } from '../services/geminiService';
import { useProgress } from '../context/ProgressContext';
import { AudioEngine } from '../services/AudioEngine';

/** Stylized Cat Component for Menu that matches the in-game character **/
const CatMenuIcon: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const scheduleBlink = () => {
      const nextBlinkDelay = Math.random() * 5000 + 2000;

      timeoutId = window.setTimeout(() => {
        setIsBlinking(true);
        window.setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, nextBlinkDelay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative size-24 md:size-32 animate-bounce-slow">
      {/* Ears - matches in-game triangle style */}
      <div className="absolute top-0 left-[5%] w-8 h-10 md:w-10 md:h-12 bg-[#333] clip-triangle -rotate-12"></div>
      <div className="absolute top-0 right-[5%] w-8 h-10 md:w-10 md:h-12 bg-[#333] clip-triangle rotate-12"></div>

      {/* Head/Body */}
      <div className="absolute inset-0 top-4 bg-[#4169E1] rounded-full shadow-2xl overflow-visible border-b-4 border-black/10">

        {/* Eyes with Blinking Logic */}
        {isBlinking ? (
          <>
            <div className="absolute top-[40%] left-[20%] w-5 md:w-7 h-[2px] bg-black/60 rounded-full"></div>
            <div className="absolute top-[40%] right-[20%] w-5 md:w-7 h-[2px] bg-black/60 rounded-full"></div>
          </>
        ) : (
          <>
            <div className="absolute top-[32%] left-[20%] size-5 md:size-7 bg-white rounded-full flex items-center justify-center">
              <div className="size-2 md:size-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="absolute top-[32%] right-[20%] size-5 md:size-7 bg-white rounded-full flex items-center justify-center">
              <div className="size-2 md:size-3 bg-green-600 rounded-full"></div>
            </div>
          </>
        )}

        {/* Nose */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 size-3 md:size-4 bg-pink-400 rounded-full z-10"></div>

        {/* Whiskers */}
        <div className="absolute top-[58%] left-[25%] w-[45%] h-2 md:h-3 bg-black origin-right -rotate-[5deg] -translate-x-full" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 60%, 0% 40%)' }}></div>
        <div className="absolute top-[66%] left-[25%] w-[45%] h-2 md:h-3 bg-black origin-right -translate-x-full" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 60%, 0% 40%)' }}></div>
        <div className="absolute top-[74%] left-[25%] w-[45%] h-2 md:h-3 bg-black origin-right rotate-[5deg] -translate-x-full" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 60%, 0% 40%)' }}></div>

        <div className="absolute top-[58%] right-[25%] w-[45%] h-2 md:h-3 bg-black origin-left rotate-[5deg] translate-x-full" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 60%, 100% 40%)' }}></div>
        <div className="absolute top-[66%] right-[25%] w-[45%] h-2 md:h-3 bg-black origin-left translate-x-full" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 60%, 100% 40%)' }}></div>
        <div className="absolute top-[74%] right-[25%] w-[45%] h-2 md:h-3 bg-black origin-left -rotate-[5deg] translate-x-full" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 60%, 100% 40%)' }}></div>

        {/* Mouth */}
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 flex gap-0">
          <div className="w-4 md:w-6 h-3 md:h-4 border-b-2 border-black rounded-full"></div>
          <div className="w-4 md:w-6 h-3 md:h-4 border-b-2 border-black rounded-full"></div>
        </div>
      </div>

      <style>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

/** Injured Cat Visual for Game Over Screen **/
const InjuredCatVisual: React.FC = () => {
  return (
    <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
      <div className="relative size-64 md:size-80 animate-dizzy">
        {/* Ears */}
        <div className="absolute top-0 left-[10%] w-16 h-20 bg-[#222] clip-triangle -rotate-12"></div>
        <div className="absolute top-0 right-[10%] w-16 h-20 bg-[#222] clip-triangle rotate-12"></div>

        {/* Head/Body */}
        <div className="absolute inset-0 top-8 bg-[#4169E1] rounded-full border-4 border-black/20 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Bandage */}
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-12 bg-white/90 -rotate-12 flex items-center justify-center gap-2 border-y-2 border-gray-300 z-30">
            <div className="w-4 h-4 bg-primary-red/20 rounded-full blur-sm"></div>
            <div className="w-4 h-4 bg-primary-red/10 rounded-full blur-md"></div>
          </div>

          {/* Dazed Eyes */}
          <div className="flex gap-12 mt-4 z-20">
            {/* Left Eye: Swirly/Dizzy */}
            <div className="size-16 bg-white rounded-full relative flex items-center justify-center animate-spin-slow">
              <div className="absolute inset-0 border-4 border-black/10 rounded-full"></div>
              <div className="w-10 h-10 border-t-4 border-l-4 border-green-600 rounded-full"></div>
            </div>
            {/* Right Eye: X */}
            <div className="size-16 flex items-center justify-center relative">
              <div className="absolute w-12 h-2 bg-black/60 rotate-45 rounded-full"></div>
              <div className="absolute w-12 h-2 bg-black/60 -rotate-45 rounded-full"></div>
            </div>
          </div>

          {/* Nose */}
          <div className="absolute top-[58%] size-8 bg-pink-400 rounded-full border-b-4 border-black/10"></div>

          {/* Sad/Injured Mouth */}
          <div className="absolute top-[70%] flex gap-0">
            <div className="w-10 h-6 border-t-2 border-black rounded-full"></div>
            <div className="w-10 h-6 border-t-2 border-black rounded-full"></div>
          </div>
        </div>

        {/* Floating Stars / Dizzy Effect */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 animate-stars-orbit">
          <span className="material-symbols-outlined text-yellow-400 text-4xl fill-current">star</span>
          <span className="material-symbols-outlined text-yellow-400 text-3xl fill-current animate-pulse">star</span>
          <span className="material-symbols-outlined text-yellow-400 text-4xl fill-current">star</span>
        </div>
      </div>

      <style>{`
        @keyframes dizzy {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-10px); }
        }
        @keyframes stars-orbit {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-dizzy { animation: dizzy 4s ease-in-out infinite; }
        .animate-stars-orbit { animation: stars-orbit 6s linear infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
      `}</style>
    </div>
  );
};

/** START MENU **/
export const StartMenuView: React.FC<{ onNavigate: (v: AppView) => void }> = ({ onNavigate }) => {
  const [tip, setTip] = useState<string>("Hämtar dagens tips...");
  const { progress } = useProgress();

  useEffect(() => {
    getGameTip().then(setTip);
  }, []);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-10 md:py-14 animate-fade-in-up">
      <div className="mb-10 md:mb-12">
        <CatMenuIcon />
      </div>

      <div className="w-full max-w-xl text-center">
        <h1 className="text-white tracking-tight text-5xl md:text-7xl font-black leading-[0.95] uppercase">
          Shadow <span className="text-primary">Paw</span>
        </h1>
        <p className="mt-3 text-white/90 text-sm md:text-base leading-relaxed">
          Ett snabbt neon-plattformsäventyr. Enkelt att lära, svårt att bemästra.
        </p>

        {/* Quick Stats */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <span className="material-symbols-outlined text-yellow-500 text-sm">monetization_on</span>
            <span className="text-yellow-500 font-black">{progress.coins}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-sm">military_tech</span>
            <span className="text-primary font-black">Nivå {progress.level}</span>
          </div>
        </div>

        {/* Main Play Button - Most Prominent */}
        <div className="mt-8 mb-4">
          <button
            onClick={() => onNavigate(AppView.PLAYING)}
            className="group w-full inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-[#112218] font-black text-lg uppercase tracking-wider transition-all active:scale-[0.98] hover:scale-[1.02] border-2"
            style={{
              backgroundColor: 'rgb(43 238 121)',
              borderColor: 'rgba(43, 238, 121, 0.85)',
              boxShadow:
                '0 0 30px rgba(43,238,121,0.45), 0 0 70px rgba(43,238,121,0.22)'
            }}
          >
            <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform">play_arrow</span>
            <span>Spela</span>
          </button>
        </div>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate(AppView.SHOP)}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-4 glass-card text-white font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">store</span>
            Butik
          </button>
          <button
            onClick={() => onNavigate(AppView.QUESTS)}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-4 glass-card text-white font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">task_alt</span>
            Uppdrag
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate(AppView.HOW_TO_PLAY)}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-3 glass-card text-white/80 font-medium uppercase tracking-wider border border-white/5 hover:border-white/10 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Guide
          </button>
          <button
            onClick={() => onNavigate(AppView.LEADERBOARD)}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-3 glass-card text-white/80 font-medium uppercase tracking-wider border border-white/5 hover:border-white/10 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">emoji_events</span>
            Topplista
          </button>
        </div>

        <div className="mt-6 glass-card rounded-2xl border border-white/10 p-5 text-left">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Dagens AI Tips</p>
          <p className="mt-2 text-white/95 text-sm leading-relaxed italic">"{tip}"</p>
        </div>

        <button
          onClick={() => onNavigate(AppView.SETTINGS)}
          className="mt-4 text-white/70 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
        >
          Inställningar
        </button>
      </div>
    </div>
  );
};

/** SETTINGS **/
export const SettingsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [music, setMusic] = useState(75);
  const [sfx, setSfx] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
    } else document.exitFullscreen?.();
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-up py-8 md:py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
          <span className="material-symbols-outlined text-primary text-sm">settings</span>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">System</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Inställningar</h1>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 divide-y divide-white/5">
        {/* Audio Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary">equalizer</span>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Ljud</span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">Musikvolym</span>
                <span className="text-primary font-mono text-sm">{music}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={music}
                onChange={(e) => setMusic(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">Ljudeffekter</span>
                <span className="text-primary font-mono text-sm">{sfx}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={sfx}
                onChange={(e) => setSfx(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">fullscreen</span>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Skärm</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white/60">open_in_full</span>
              <div className="text-left">
                <p className="text-white font-medium text-sm">Helskärmsläge</p>
                <p className="text-white/40 text-xs">Maximal inlevelse</p>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${isFullscreen ? 'bg-primary' : 'bg-white/20'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isFullscreen ? 'left-5' : 'left-0.5'}`} />
            </div>
          </button>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Tillbaka till menyn
      </button>
    </div>
  );
};

/** HOW TO PLAY **/
export const HowToPlayView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up py-8 md:py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
          <span className="material-symbols-outlined text-primary text-sm">school</span>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Guide</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Hur man spelar</h1>
        <p className="mt-2 text-white/70 text-sm">Lär dig grunderna för att dominera neonstaden</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-2xl">flag</span>
          </div>
          <h3 className="text-white font-bold text-lg uppercase mb-2">Målet</h3>
          <p className="text-white/60 text-sm leading-relaxed">Navigera genom staden, samla alla fiskar och nå målet. Undvik fiender och fallgropar.</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-2xl">gamepad</span>
          </div>
          <h3 className="text-white font-bold text-lg uppercase mb-2">Kontroller</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs font-mono">A / D</span>
              <span className="text-white/60">Gå</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs font-mono">W / ↑</span>
              <span className="text-white/60">Hoppa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs font-mono">Click</span>
              <span className="text-white/60">Skjut</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-2xl">stars</span>
          </div>
          <h3 className="text-white font-bold text-lg uppercase mb-2">Pro Tips</h3>
          <ul className="text-white/60 text-sm space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Dubbelhopp räddar liv</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Skjut fiender från distans</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Samla alla fiskar före mål</span>
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-[#112218] font-black uppercase tracking-wider hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined">check</span>
        Jag förstår
      </button>
    </div>
  );
};

/** LEADERBOARD **/
export const LeaderboardView: React.FC<{ onBack: () => void, onPlay: () => void }> = ({ onBack, onPlay }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const mockScores: ScoreEntry[] = [
      { rank: 1, name: 'ShadowNinja', score: 50400, level: 'Level 42', date: 'Oct 24', avatar: 'https://picsum.photos/seed/ShadowNinja/50/50' },
      { rank: 2, name: 'NeonHunter', score: 48200, level: 'Level 40', date: 'Oct 23', avatar: 'https://picsum.photos/seed/NeonHunter/50/50' },
      { rank: 3, name: 'CyberCat', score: 45000, level: 'Level 38', date: 'Oct 22', avatar: 'https://picsum.photos/seed/CyberCat/50/50' },
      { rank: 4, name: 'GhostPaw', score: 42100, level: 'Level 35', date: 'Oct 21', avatar: 'https://picsum.photos/seed/GhostPaw/50/50' },
    ];

    const savedScoresData = localStorage.getItem('shadow_paw_scores');
    const savedScores = savedScoresData ? JSON.parse(savedScoresData) : [];

    const userScores: ScoreEntry[] = savedScores.map((s: any) => ({
      rank: 0,
      name: s.name,
      score: s.score,
      level: `Level ${Math.floor(s.score / 1000) || 1}`,
      date: s.date,
      avatar: `https://picsum.photos/seed/${s.name}/50/50`,
      isUser: true
    }));

    const combined = [...mockScores, ...userScores].sort((a, b) => b.score - a.score);
    const finalScores = combined.map((s, idx) => ({ ...s, rank: idx + 1 })).slice(0, 15);
    setScores(finalScores);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up py-8 md:py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
          <span className="material-symbols-outlined text-primary text-sm">emoji_events</span>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Rangordning</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Topplista</h1>
        <p className="mt-2 text-white/70 text-sm">Se vem som är mästaren av neonstaden</p>
      </div>

      {/* Top 3 Podium */}
      {scores.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-400 ring-4 ring-white/10 mb-2 overflow-hidden">
              <img src={scores[1].avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-24 glass-card rounded-t-xl border border-white/10 flex flex-col items-center justify-end pb-2">
              <span className="text-slate-400 font-black text-xl">2</span>
            </div>
          </div>
          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-2">
            <div className="w-20 h-20 rounded-full bg-yellow-500 ring-4 ring-yellow-500/30 mb-2 overflow-hidden">
              <img src={scores[0].avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-32 glass-card rounded-t-xl border border-yellow-500/30 flex flex-col items-center justify-end pb-2 bg-yellow-500/5">
              <span className="text-yellow-500 font-black text-3xl">1</span>
            </div>
          </div>
          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-700 ring-4 ring-white/10 mb-2 overflow-hidden">
              <img src={scores[2].avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-20 glass-card rounded-t-xl border border-white/10 flex flex-col items-center justify-end pb-2">
              <span className="text-orange-700 font-black text-xl">3</span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto">
          {scores.map((s) => (
            <div
              key={`${s.name}-${s.score}-${s.date}`}
              className={`flex items-center gap-4 p-4 border-b border-white/5 ${s.isUser ? 'bg-primary/5' : 'hover:bg-white/5'} transition-colors`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${s.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                s.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                  s.rank === 3 ? 'bg-orange-700/20 text-orange-700' :
                    'bg-white/5 text-white/40'
                }`}>
                {s.rank}
              </div>
              <img src={s.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${s.isUser ? 'text-primary' : 'text-white'}`}>{s.name}</p>
                <p className="text-white/40 text-xs">{s.level}</p>
              </div>
              <div className="text-right">
                <p className={`font-black text-lg ${s.isUser ? 'text-primary' : 'text-white'}`}>{s.score.toLocaleString()}</p>
                <p className="text-white/30 text-xs">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
        >
          Tillbaka
        </button>
        <button
          onClick={onPlay}
          className="flex-1 py-3 rounded-xl bg-primary text-[#112218] font-black uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          Spela Nu
        </button>
      </div>
    </div>
  );
};

/** GAME OVER **/
export const GameOverView: React.FC<{ score: number, fishesCollected?: number, onRestart: () => void, onMenu: () => void }> = ({ score, fishesCollected = 0, onRestart, onMenu }) => {
  const [taunt, setTaunt] = useState<string>("Bättre lycka nästa gång!");
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { progress, addCoins, addXP, updateQuestProgress } = useProgress();
  
  // Get coins: every 10 fish = 5 coins. So fish / 2
  const coinsEarned = Math.floor(fishesCollected / 2);
  const totalCoins = progress.coins;

  useEffect(() => {
    getJerryTaunt(score).then(setTaunt);
    // Save coins and XP when game ends
    if (coinsEarned > 0) {
      addCoins(coinsEarned);
    }
    addXP(Math.floor(score / 10));
    // Update quest progress
    updateQuestProgress('1', fishesCollected); // Fish collection quest
    updateQuestProgress('2', 1); // Level completion quest
  }, [score, fishesCollected, coinsEarned]);

  const handleSaveScore = () => {
    if (name.trim()) {
      setIsSaved(true);
      const highScores = JSON.parse(localStorage.getItem('shadow_paw_scores') || '[]');
      highScores.push({ name: name.trim(), score, date: new Date().toLocaleDateString() });
      localStorage.setItem('shadow_paw_scores', JSON.stringify(highScores));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-8 md:mb-10 grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 md:gap-8 items-center">
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
          <div className="relative aspect-square bg-gradient-to-b from-black/25 to-black/60">
            <InjuredCatVisual />
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-white/60 text-base">warning</span>
              <div className="min-w-0">
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Status</p>
                <p className="text-white font-black uppercase tracking-wide truncate">Mission Failed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-red/10 border border-primary-red/20 mb-4">
            <span className="material-symbols-outlined text-primary-red text-lg">sentiment_dissatisfied</span>
            <span className="text-white text-xs font-bold uppercase tracking-widest">Mission Failed</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tight">
            Game <span className="text-primary-red">Over</span>
          </h1>
          <p className="mt-4 text-white text-base md:text-lg max-w-lg mx-auto">
            {taunt}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">flag</span>
            Poäng
          </div>
          <p className="text-white text-2xl md:text-3xl font-black">{score.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            Bästa
          </div>
          <p className="text-white text-2xl md:text-3xl font-black">15,000</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">set_meal</span>
            Fiskar
          </div>
          <p className="text-blue-400 text-2xl md:text-3xl font-black">{fishesCollected}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">attach_money</span>
            +Mynt
          </div>
          <p className="text-primary text-2xl md:text-3xl font-black">+{coinsEarned}</p>
          <p className="text-white/50 text-xs">({fishesCollected} fiskar ÷ 2)</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">monetization_on</span>
            Totalt
          </div>
          <p className="text-yellow-400 text-2xl md:text-3xl font-black">{totalCoins}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            XP
          </div>
          <p className="text-white text-2xl md:text-3xl font-black">+{Math.floor(score / 10)}</p>
        </div>
      </div>

      {/* High Score Section */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-[#112218] text-xl">🏆</span>
          </div>
          <div>
            <h3 className="text-white font-black text-lg uppercase">Nytt High Score!</h3>
            <p className="text-white/50 text-xs font-medium">Spara ditt resultat till topplistan</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">person</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSaved}
              placeholder="Ange ditt namn"
              maxLength={15}
              className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors ${isSaved ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <button
            onClick={handleSaveScore}
            disabled={isSaved || !name.trim()}
            className={`font-black px-8 py-4 rounded-xl transition-all uppercase text-sm whitespace-nowrap ${isSaved ? 'bg-primary text-[#112218]' : 'bg-white text-[#112218] hover:bg-white/90 active:scale-95'}`}
          >
            {isSaved ? 'Sparat!' : 'Spara'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="flex-1 bg-primary-red py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform shadow-[0_0_30px_rgba(238,43,43,0.25)] uppercase text-white"
        >
          <span className="material-symbols-outlined">replay</span>
          Spela Igen
        </button>
        <button
          onClick={onMenu}
          className="flex-1 glass-card border-2 border-white/10 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors uppercase text-white"
        >
          <span className="material-symbols-outlined">home</span>
          Huvudmeny
        </button>
      </div>
    </div>
  );
};

// AUDIO MANAGER FOR BACKGROUND MUSIC
const useBackgroundMusic = (level: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only play music for levels 1-10
    if (level >= 1 && level <= 10) {
      const musicPath = `/Sounds/Level ${level}.mp3`;

      // Create new audio element
      const audio = new Audio(musicPath);
      audio.loop = true;
      audio.volume = 0; // Start with volume 0 for fade-in

      // Play and fade in
      audio.play().catch(e => console.log('Audio play failed:', e));

      // Fade in over 3 seconds
      let currentVolume = 0;
      const targetVolume = 0.3;
      const fadeStep = targetVolume / 30; // 30 steps for 3 seconds

      fadeIntervalRef.current = setInterval(() => {
        currentVolume += fadeStep;
        if (currentVolume >= targetVolume) {
          currentVolume = targetVolume;
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
        }
        audio.volume = currentVolume;
      }, 100);

      audioRef.current = audio;
    }

    return () => {
      // Cleanup: fade out and stop
      if (audioRef.current) {
        const audio = audioRef.current;

        // Fade out quickly
        let currentVolume = audio.volume;
        const fadeOutStep = currentVolume / 10;

        const fadeOutInterval = setInterval(() => {
          currentVolume -= fadeOutStep;
          if (currentVolume <= 0) {
            currentVolume = 0;
            audio.pause();
            audio.src = '';
            clearInterval(fadeOutInterval);
          }
          audio.volume = currentVolume;
        }, 50);
      }

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [level]);
};

// LEVEL DESIGN SYSTEM - 50 unique levels with progressive difficulty
const getLevelDesign = (level: number) => {
  const designs = [
    // Levels 1-10: Tutorial & Easy
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'park', difficulty: 1 },
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'suburban', difficulty: 1.2 },
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'NIGHT', theme: 'city', difficulty: 1.4 },
    { weather: 'REGNIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'park', difficulty: 1.6 },
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'SUNSET', theme: 'industrial', difficulty: 1.8 },
    { weather: 'DIMMIGT', intensity: 'LIGHT', timeOfDay: 'NIGHT', theme: 'downtown', difficulty: 2.0 },
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'beach', difficulty: 2.2 },
    { weather: 'SNÖIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'mountain', difficulty: 2.4 },
    { weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'SUNSET', theme: 'forest', difficulty: 2.6 },
    { weather: 'STORMIGT', intensity: 'LIGHT', timeOfDay: 'NIGHT', theme: 'harbor', difficulty: 2.8 },

    // Levels 11-20: Medium
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'sewers', difficulty: 3.0 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'alpine', difficulty: 3.3 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'construction', difficulty: 3.6 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'rooftops', difficulty: 3.9 },
    { weather: 'REGNIGT', intensity: 'LIGHT', timeOfDay: 'DAWN', theme: 'countryside', difficulty: 4.2 },
    { weather: 'SNÖIGT', intensity: 'LIGHT', timeOfDay: 'NIGHT', theme: 'ice_cave', difficulty: 4.5 },
    { weather: 'STORMIGT', intensity: 'LIGHT', timeOfDay: 'DAY', theme: 'power_plant', difficulty: 4.8 },
    { weather: 'DIMMIGT', intensity: 'LIGHT', timeOfDay: 'SUNSET', theme: 'abandoned', difficulty: 5.1 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'highway', difficulty: 5.4 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'glacier', difficulty: 5.7 },

    // Levels 21-30: Hard
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'space_station', difficulty: 6.0 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'volcano', difficulty: 6.4 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'underground', difficulty: 6.8 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'sky_bridge', difficulty: 7.2 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'nuclear', difficulty: 7.6 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'laboratory', difficulty: 8.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'datacenter', difficulty: 8.4 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'arctic_base', difficulty: 8.8 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'warzone', difficulty: 9.2 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'quantum', difficulty: 9.6 },

    // Levels 31-40: Very Hard
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'hell', difficulty: 10.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'nightmare', difficulty: 10.5 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'void', difficulty: 11.0 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'chaos', difficulty: 11.5 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'inferno', difficulty: 12.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'abyss', difficulty: 12.5 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'oblivion', difficulty: 13.0 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'pandemonium', difficulty: 13.5 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'apocalypse', difficulty: 14.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'armageddon', difficulty: 14.5 },

    // Levels 41-50: Extreme
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'titan', difficulty: 15.0 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'hades', difficulty: 16.0 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'tartarus', difficulty: 17.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'nexus', difficulty: 18.0 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'omega', difficulty: 19.0 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'infinity', difficulty: 20.0 },
    { weather: 'DIMMIGT', intensity: 'HEAVY', timeOfDay: 'SUNSET', theme: 'transcendence', difficulty: 21.0 },
    { weather: 'REGNIGT', intensity: 'HEAVY', timeOfDay: 'NIGHT', theme: 'enlightenment', difficulty: 22.0 },
    { weather: 'SNÖIGT', intensity: 'HEAVY', timeOfDay: 'DAY', theme: 'ascension', difficulty: 23.0 },
    { weather: 'STORMIGT', intensity: 'HEAVY', timeOfDay: 'DAWN', theme: 'legendary', difficulty: 25.0 }
  ];

  return designs[Math.min(level - 1, designs.length - 1)];
};

// BACKGROUND ELEMENTS GENERATOR
const generateBackgroundElements = (level: number, levelLength: number, theme: string) => {
  const elements = [];
  const elementCount = Math.floor(levelLength / 400); // One element every 400px

  for (let i = 0; i < elementCount; i++) {
    const x = Math.random() * levelLength;
    const type = Math.random();

    if (theme.includes('city') || theme.includes('downtown')) {
      // Buildings
      if (type < 0.6) {
        elements.push({
          type: 'building',
          x: x,
          y: 200 + Math.random() * 100,
          width: 60 + Math.random() * 80,
          height: 150 + Math.random() * 200,
          color: `hsl(${200 + Math.random() * 40}, 30%, ${15 + Math.random() * 10}%)`
        });
      }
    } else if (theme.includes('park') || theme.includes('forest')) {
      // Trees
      if (type < 0.7) {
        elements.push({
          type: 'tree',
          x: x,
          y: 250 + Math.random() * 150,
          width: 30 + Math.random() * 40,
          height: 80 + Math.random() * 120,
          color: `hsl(${100 + Math.random() * 40}, 50%, ${20 + Math.random() * 15}%)`
        });
      }
    } else if (theme.includes('industrial') || theme.includes('construction')) {
      // Cranes and structures
      if (type < 0.5) {
        elements.push({
          type: 'crane',
          x: x,
          y: 100,
          width: 40,
          height: 300 + Math.random() * 100,
          color: `hsl(${0 + Math.random() * 30}, 20%, ${25 + Math.random() * 10}%)`
        });
      }
    }

    // Generic background elements for all themes
    if (type > 0.8) {
      elements.push({
        type: 'cloud',
        x: x,
        y: 50 + Math.random() * 100,
        width: 80 + Math.random() * 120,
        height: 30 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
  }

  return elements;
};

/** ADVANCED 50-LEVEL PLAYABLE GAME VIEW **/
export const PlayingView: React.FC<{ onEnd: (score: number, fishesCollected: number) => void }> = ({ onEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [stats, setStats] = useState({ score: 0, progress: 0, collectedCount: 0, totalFish: 0, ammo: 5, weather: 'SOLIGT', intensity: 'LIGHT', timeOfDay: 'NIGHT' });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [isMobile, setIsMobile] = useState(false);
  const { progress, addCoins } = useProgress();

  const gameRef = useRef<any>(null);

  // Use background music for levels 1-10
  useBackgroundMusic(currentLevel);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsMobile(window.innerWidth < 768);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const setupLevel = (level: number, existingScore: number, existingLives: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    // Massively increase level length by 10x
    const levelLength = 80000 + (level * 24000);
    const levelDesign = getLevelDesign(level);
    const weather = levelDesign.weather;
    const intensity = levelDesign.intensity;
    const timeOfDay = levelDesign.timeOfDay;
    const theme = levelDesign.theme;

    const game = {
      running: true,
      level: level,
      score: existingScore,
      lives: existingLives,
      ammo: stats.ammo || 5,
      levelLength: levelLength,
      weather: weather,
      intensity: intensity,
      timeOfDay: timeOfDay,
      scrollX: 0,
      gravity: 0.8,
      friction: 0.85,
      flashTimer: 0,
      bolts: [] as any[], // Current active lightning bolts
      weatherParticles: [] as any[],
      player: {
        x: 100, y: 150, width: 50, height: 70,
        velocityX: 0, velocityY: 0,
        speed: 5 + (level * 0.15),
        jumpPower: 15, doubleJumpPower: 18,
        isJumping: false, canDoubleJump: true, hasDoubleJumped: false,
        color: '#4169E1', invincible: false, invincibleTimer: 0,
        isBlinking: false, blinkTimer: 0,
        facing: 1 // 1 for right, -1 for left
      },
      jerry: { x: levelLength - 150, y: 350, width: 40, height: 50, rescued: false },
      platforms: [] as any[],
      holes: [] as any[],
      fishes: [] as any[],
      enemies: [] as any[],
      bullets: [] as any[],
      particles: [] as any[],
      floatingTexts: [] as any[],
      keys: {} as Record<number, boolean>,
      showFishWarning: false,
      totalCollectedInLevel: 0,
      backgroundElements: [] as any[], // Trees, buildings, etc.
      lastStatUpdate: 0
    };

    // Generate background elements
    game.backgroundElements = generateBackgroundElements(level, levelLength, theme);

    // Initialize Weather Particles
    if (weather !== 'SOLIGT') {
      let pCount = 50;
      if (weather === 'SNÖIGT') pCount = intensity === 'HEAVY' ? 200 : 50;
      else if (weather === 'REGNIGT') pCount = intensity === 'HEAVY' ? 120 : 60;
      else if (weather === 'STORMIGT') pCount = 150;
      else if (weather === 'DIMMIGT') pCount = 15; // Fewer but larger clouds

      for (let i = 0; i < pCount; i++) {
        if (weather === 'DIMMIGT') {
          game.weatherParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 0.2 + Math.random() * 0.5,
            radius: 100 + Math.random() * 150,
            opacity: 0.05 + Math.random() * 0.1,
            sway: Math.random() * Math.PI * 2
          });
        } else {
          game.weatherParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: weather === 'SNÖIGT' ? (intensity === 'HEAVY' ? 1.5 + Math.random() * 2 : 1 + Math.random() * 2) : 10 + Math.random() * 5,
            length: weather === 'SNÖIGT' ? 0 : 10 + Math.random() * 20,
            radius: weather === 'SNÖIGT' ? 1.5 + Math.random() * 2.5 : 0,
            sway: Math.random() * Math.PI * 2
          });
        }
      }
    }

    const segmentWidth = 200;
    const segments = Math.ceil(levelLength / segmentWidth);
    for (let i = 0; i < segments; i++) {
      // Progressive difficulty for holes - size increases with level
      // Level 1: ~20% hole, Level 50: ~70% hole
      const baseHoleSize = 0.2 + (Math.min(level, 50) * 0.01); 
      const holeChance = Math.min(0.25, 0.015 + (levelDesign.difficulty * 0.01));
      if (i > 3 && i < segments - 3 && Math.random() < holeChance) {
        // Hole size based on level
        const holeWidth = segmentWidth * baseHoleSize;
        const holeOffset = (segmentWidth - holeWidth) / 2;
        
        // Add hole to holes array - this is what kills the player!
        game.holes.push({ x: i * segmentWidth + holeOffset, width: holeWidth, y: canvas.height - 40 });
        
        // Add platform to the LEFT of the hole (before hole)
        game.platforms.push({ x: i * segmentWidth, y: canvas.height - 40, width: holeOffset, height: 40, color: '#1c3a2a', isGround: true });
        
        // Add platform to the RIGHT of the hole (after hole)
        game.platforms.push({ x: i * segmentWidth + holeOffset + holeWidth, y: canvas.height - 40, width: segmentWidth - holeOffset - holeWidth, height: 40, color: '#1c3a2a', isGround: true });
        
        // DON'T add the full segment - that's the hole!
        continue;
      }
      // Normal ground segment with no hole
      game.platforms.push({ x: i * segmentWidth, y: canvas.height - 40, width: segmentWidth, height: 40, color: '#1c3a2a', isGround: true });
    }

    // MANY MORE platforms - but ALL reachable with double jump!
    const platCount = Math.floor(25 + (level * 3));
    // Maximum height player can reach with double jump is about 250px
    const maxJumpHeight = 250;
    const minGap = Math.max(50, 120 - (level * 1.5));

    for (let i = 0; i < platCount; i++) {
      let attempts = 0;
      let validPos = false;
      let px = 0;
      let py = 0;
      // Vary platform widths for more interesting gameplay
      const widthVariation = Math.random();
      let pw = widthVariation > 0.7 ? 80 : (widthVariation > 0.3 ? 120 : 150);
      pw = Math.max(50, pw - (level * 0.8));
      let ph = 20;

      while (!validPos && attempts < 50) {
        attempts++;
        // Spread platforms throughout the ENTIRE level
        px = 300 + Math.random() * (levelLength - 600);
        
        // ALL platforms must be reachable - not too high!
        // Keep platforms in the lower 2/3 of screen so double jump can reach
        py = 150 + Math.random() * (canvas.height - 200);

        // Ensure vertical variation - but always reachable!
        if (i > 0 && Math.random() < 0.4) {
          // Only go up by max jump height
          const prevY = game.platforms[game.platforms.length - 1].y;
          py = Math.max(150, Math.min(prevY - 50 - Math.random() * 100, canvas.height - 100));
        }

        const bufferX = minGap;
        const bufferY = 50;
        const hasCollision = game.platforms.some(oldP => {
          return (px < oldP.x + oldP.width + bufferX && px + pw + bufferX > oldP.x && py < oldP.y + oldP.height + bufferY && py + ph + bufferY > oldP.y);
        });
        if (!hasCollision) validPos = true;
      }
      if (validPos) {
        game.platforms.push({ x: px, y: py, width: pw, height: ph, color: '#234832' });
      }
    }

    // MUCH MORE enemies - spread throughout the entire level for excitement!
    // More enemies on EVERY level, not just higher levels
    const enemyCount = Math.floor(8 + (level * 1.5)); // Start with 8 enemies at level 1, up to 80+ at level 50
    let enemiesPlaced = 0;
    let spawnAttempts = 0;
    const minEnemyDistance = 250; // Enemies closer together for more action
    
    while (enemiesPlaced < enemyCount && spawnAttempts < 300) {
      spawnAttempts++;
      // Spread enemies throughout the ENTIRE level, not just the end
      const randomSegment = Math.floor(Math.random() * (game.platforms.length - 5)) + 3;
      const plat = game.platforms[randomSegment];
      
      // Skip some ground platforms but not all
      if (plat.isGround && Math.random() > 0.5) continue;

      const ex = plat.x + Math.random() * (plat.width - 40);
      // Place enemies earlier in the level too!
      if (ex < 400) continue; // Skip first 400px (start area)

      const tooClose = game.enemies.some(other => {
        return Math.abs(other.x - ex) < minEnemyDistance && Math.abs(other.y - (plat.y - 40)) < 80;
      });
      if (tooClose) continue;
      
      // Random enemy type
      const enemyType = Math.floor(Math.random() * 3);
      game.enemies.push({
        x: ex, y: plat.y - 40, width: 40, height: 40,
        velocityX: (2 + (level * 0.15)) * (Math.random() > 0.5 ? 1 : -1),
        direction: 1, platform: randomSegment, type: enemyType
      });
      enemiesPlaced++;
    }

    // MORE coins - more rewards throughout the level
    const fishCount = Math.floor(20 + (level * 2)); // Start with 20 coins at level 1
    let placedFish = 0;

    // Add dynamic moving items on later levels
    // More coins - ALL reachable with double jump!
    const flyingItems = level > 3;

    while (placedFish < fishCount) {
      const randomPlatIndex = Math.floor(Math.random() * game.platforms.length);
      const plat = game.platforms[randomPlatIndex];
      
      // 30% flying coins, 70% on/near platforms
      const isFlying = flyingItems && Math.random() > 0.7;
      
      let fx, fy;
      if (isFlying) {
        // Flying coins - but reachable with double jump!
        // Max height from ground with double jump is about 250px
        fx = 200 + Math.random() * (levelLength - 400);
        // Keep flying coins reachable - not too high!
        fy = canvas.height - 280 + Math.random() * 100;
      } else {
        // On platforms - just above the platform
        fx = plat.x + 10 + Math.random() * (plat.width - 30);
        // Just above the platform - always reachable
        fy = plat.y - 30 - Math.random() * 30;
      }
      
      // Keep everything reachable
      fy = Math.max(canvas.height - 300, Math.min(fy, canvas.height - 60));
      const clampedFx = Math.max(50, Math.min(fx, levelLength - 50));

      let fishCollision = false;
      const fishBounds = { x: clampedFx, y: fy, width: 24, height: 14 };
      
      // Check if fish would spawn inside a platform
      for (const p of game.platforms) {
        if (fishBounds.x < p.x + p.width && fishBounds.x + fishBounds.width > p.x && 
            fishBounds.y < p.y + p.height && fishBounds.y + fishBounds.height > p.y) {
          fishCollision = true;
          break;
        }
      }
      if (!fishCollision) {
        game.fishes.push({
          x: clampedFx,
          y: fy,
          width: 24, 
          height: 14,
          collected: false,
          isFlying: isFlying,
          hoverOffset: Math.random() * Math.PI * 2,
          baseY: fy
        });
        placedFish++;
      }
    }

    return game;
  };

  const triggerJump = () => {
    if (!gameRef.current) return;
    const game = gameRef.current;
    if (!game.player.isJumping) {
      game.player.velocityY = -game.player.jumpPower;
      game.player.isJumping = true;
      AudioEngine.playJump();
    } else if (game.player.canDoubleJump && !game.player.hasDoubleJumped) {
      game.player.velocityY = -game.player.doubleJumpPower;
      game.player.hasDoubleJumped = true;
      AudioEngine.playJump();
    }
  };

  const startNextLevel = () => {
    setShowLevelComplete(false);
    setCurrentLevel(prev => prev + 1);
  };

  const setKeyState = (code: number, active: boolean) => {
    if (!gameRef.current) return;
    const game = gameRef.current;
    game.keys[code] = active;
    if (active && [32, 38, 87].includes(code)) {
      triggerJump();
    }
  };

  const fireBullet = (targetX: number | null = null, targetY: number | null = null) => {
    if (!gameRef.current || !gameRef.current.running) return;
    const game = gameRef.current;
    if (game.ammo <= 0) return;
    const playerCenterX = game.player.x + game.player.width / 2;
    const playerCenterY = game.player.y + game.player.height / 2;

    let dx, dy;
    if (targetX !== null && targetY !== null) {
      dx = targetX - (playerCenterX - game.scrollX);
      dy = targetY - playerCenterY;
    } else {
      // Skjut framåt i den riktning katten tittar om ingen koordinat ges
      dx = game.player.facing * 500;
      dy = 0;
    }

    const distance = Math.sqrt(dx * dx + dy * dy);
    const bulletSpeed = 10;
    game.bullets.push({
      x: playerCenterX, y: playerCenterY, vx: (dx / distance) * bulletSpeed, vy: (dy / distance) * bulletSpeed, radius: 6, life: 100
    });
    game.ammo--;
    AudioEngine.playShoot();
  };

  // Helper function to generate a lightning bolt structure
  const createLightningBolt = (startX: number, canvasHeight: number) => {
    const points = [];
    let curX = startX;
    let curY = 0;
    points.push({ x: curX, y: curY });
    while (curY < canvasHeight * 0.8) {
      curX += (Math.random() - 0.5) * 60;
      curY += Math.random() * 40 + 10;
      points.push({ x: curX, y: curY });
    }
    return points;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas sizing
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const aspectRatio = 16 / 9;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let width = containerWidth;
        let height = containerWidth / aspectRatio;

        if (height > containerHeight) {
          height = containerHeight;
          width = height * aspectRatio;
        }

        canvas.width = Math.min(width, 1200);
        canvas.height = Math.min(height, 675);
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const game = setupLevel(currentLevel, totalScore, lives);
    if (!game) return;
    gameRef.current = game;

    const handleKeyDown = (e: KeyboardEvent) => setKeyState(e.keyCode, true);
    const handleKeyUp = (e: KeyboardEvent) => setKeyState(e.keyCode, false);
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      fireBullet(mouseX, mouseY);
    };

    // Touch controls for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);

      // Jump on left half of screen
      if (touchX < canvas.width / 2) {
        triggerJump();
      } else {
        // Shoot on right half of screen
        fireBullet(touchX, touchY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);

      // Move left/right based on touch position
      if (touchX < canvas.width * 0.3) {
        setKeyState(65, true); // A
        setKeyState(68, false); // D
      } else if (touchX > canvas.width * 0.7) {
        setKeyState(68, true); // D
        setKeyState(65, false); // A
      } else {
        setKeyState(65, false);
        setKeyState(68, false);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setKeyState(65, false);
      setKeyState(68, false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousedown', handleMouseDown);

    // Add touch events for mobile
    if (isTouchDevice) {
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('touchend', handleTouchEnd);
    }

    let animationId: number;
    const loop = () => {
      if (!game.running) return;

      // Player Logic
      game.player.velocityY += game.gravity;
      game.player.velocityX *= game.friction;
      if (game.keys[37] || game.keys[65]) {
        game.player.velocityX = -game.player.speed;
        game.player.facing = -1;
      }
      if (game.keys[39] || game.keys[68]) {
        game.player.velocityX = game.player.speed;
        game.player.facing = 1;
      }
      game.player.x += game.player.velocityX;
      game.player.y += game.player.velocityY;

      // Blinking
      if (!game.player.isBlinking) {
        if (Math.random() < 0.008) {
          game.player.isBlinking = true;
          game.player.blinkTimer = 10;
        }
      } else {
        game.player.blinkTimer--;
        if (game.player.blinkTimer <= 0) game.player.isBlinking = false;
      }

      // Bullets
      game.bullets = game.bullets.filter((b: any) => b.life > 0);
      game.bullets.forEach((b: any) => {
        b.x += b.vx; b.y += b.vy; b.life--;
        game.enemies.forEach((e: any) => {
          if (e.x < b.x + b.radius && e.x + e.width > b.x - b.radius && e.y < b.y + b.radius && e.y + e.height > b.y - b.radius) {
            e.x = -1000; b.life = 0; game.score += 200;
            AudioEngine.playExplosion();

            // Explosion particles
            for (let i = 0; i < 15; i++) {
              game.particles.push({
                x: e.x + e.width / 2, y: e.y + e.height / 2,
                vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                life: 30, color: '#ff2222', size: Math.random() * 4 + 2
              });
            }
            // Floating score text
            game.floatingTexts.push({ x: e.x, y: e.y, text: '+200', life: 40, color: '#ff2222' });
          }
        });
      });

      // Update Particles
      game.particles = game.particles.filter((p: any) => p.life > 0);
      game.particles.forEach((p: any) => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life--;
        p.size *= 0.95;
      });

      // Update Floating Texts
      game.floatingTexts = game.floatingTexts.filter((t: any) => t.life > 0);
      game.floatingTexts.forEach((t: any) => {
        t.y -= 1; // float up
        t.life--;
      });

      // Weather Logic
      game.weatherParticles.forEach((p: any) => {
        if (game.weather === 'DIMMIGT') {
          p.sway += 0.01;
          p.x += Math.sin(p.sway) * 0.5 + p.speed;
          if (p.x > canvas.width + p.radius) p.x = -p.radius;
        } else {
          p.y += p.speed;
          if (game.weather === 'SNÖIGT') {
            p.sway += 0.05;
            p.x += Math.sin(p.sway) * 0.8;
          }
          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
        }
      });

      if (game.weather === 'STORMIGT') {
        if (game.flashTimer > 0) game.flashTimer--;
        else game.bolts = []; // Clear bolts when flash ends

        if (Math.random() < 0.005) {
          game.flashTimer = 8;
          // Generate 1-2 bolts for the visual
          const boltCount = Math.floor(Math.random() * 2) + 1;
          game.bolts = [];
          for (let i = 0; i < boltCount; i++) {
            game.bolts.push(createLightningBolt(Math.random() * canvas.width, canvas.height));
          }
        }
      } else if (game.weather === 'REGNIGT' && game.intensity === 'HEAVY') {
        // Subtle thunder for heavy rain
        if (game.flashTimer > 0) game.flashTimer--;
        if (Math.random() < 0.002) game.flashTimer = 4;
      }

      // Check if player is over a hole - if so, they fall through!
      let isOverHole = false;
      const playerFeetX = game.player.x + game.player.width / 2;
      const playerFeetY = game.player.y + game.player.height;
      
      game.holes.forEach(hole => {
        // Player center is within hole horizontal bounds AND at ground level
        if (playerFeetX > hole.x && playerFeetX < hole.x + hole.width &&
            playerFeetY >= hole.y - 5 && playerFeetY <= hole.y + 50) {
          isOverHole = true;
        }
      });

      // Platforms - with more forgiving collision detection
      // Only check if player is falling (velocityY >= 0) and near platform top
      if (!isOverHole && game.player.velocityY >= 0) {
        for (const p of game.platforms) {
          const playerBottom = game.player.y + game.player.height;
          const playerRight = game.player.x + game.player.width;
          const playerLeft = game.player.x;
          
          // More lenient check - player must be horizontally overlapping AND vertically close to platform top
          if (playerRight > p.x + 5 && playerLeft < p.x + p.width - 5 &&
              playerBottom >= p.y - 5 && playerBottom <= p.y + 25) {
            game.player.y = p.y - game.player.height;
            game.player.velocityY = 0;
            game.player.isJumping = false;
            game.player.hasDoubleJumped = false;
            break; // Found a platform, stop checking
          }
        }
      }

      // Enemies - with better null safety
      game.enemies.forEach(e => {
        if (e.x < -500 || !game.platforms[e.platform]) return;
        
        // Only move enemy if platform exists
        const p = game.platforms[e.platform];
        if (p) {
          e.x += e.velocityX;
          if (e.x < p.x || e.x + e.width > p.x + p.width) e.velocityX *= -1;
        }

        // ONLY check collision if player is NOT invincible AND there's actual overlap
        if (!game.player.invincible) {
          // More strict collision check - must have CLEAR overlap
          const overlapX = game.player.x + game.player.width > e.x + 5 && game.player.x < e.x + e.width - 5;
          const overlapY = game.player.y + game.player.height > e.y + 5 && game.player.y < e.y + e.height - 5;
          
          if (overlapX && overlapY) {
            const playerBottom = game.player.y + game.player.height;
            const enemyTop = e.y;
            const enemyCenterY = e.y + e.height / 2;
            
            // Check if player is falling AND above enemy's center - then defeat enemy
            // Otherwise, player takes damage
            const isAboveEnemy = playerBottom < enemyCenterY;
            const isFalling = game.player.velocityY > 0;
            
            if (isFalling && isAboveEnemy && playerBottom < enemyTop + 20) {
              // Player jumps on enemy - defeat enemy!
              e.x = -1000;
              game.score += 200;
              game.player.velocityY = -12;
              AudioEngine.playExplosion();
              for (let i = 0; i < 15; i++) {
                game.particles.push({
                  x: e.x + e.width / 2, y: e.y + e.height / 2,
                  vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                  life: 30, color: '#ff8800', size: Math.random() * 4 + 2
                });
              }
              game.floatingTexts.push({ x: e.x, y: e.y, text: '+200', life: 40, color: '#ff8800' });
            } else {
              // Player touched enemy from side or below - die
              game.lives--;
              game.player.invincible = true; 
              game.player.invincibleTimer = 90;
              game.player.x = Math.max(100, game.player.x - 150);
              game.player.y = Math.max(50, game.player.y - 50);
              game.player.velocityY = 0;
              AudioEngine.playDamage();
              if (game.lives <= 0) { game.running = false; onEnd(game.score, game.totalCollectedInLevel); }
            }
          }
        }
      });

      if (game.player.invincibleTimer > 0) game.player.invincibleTimer--;
      else game.player.invincible = false;

      // Only die if falling into hole - with bigger buffer
      if (game.player.y > canvas.height + 100) {
        game.lives--;
        game.player.x = Math.max(100, game.player.x - 200);
        game.player.y = 100;
        game.player.velocityY = 0;
        if (game.lives <= 0) { game.running = false; onEnd(game.score, game.totalCollectedInLevel); }
      }



      // Camera
      const playerScreenX = game.player.x - game.scrollX;
      if (playerScreenX > canvas.width * 0.6) game.scrollX = game.player.x - canvas.width * 0.6;
      if (playerScreenX < canvas.width * 0.4) game.scrollX = game.player.x - canvas.width * 0.4;
      game.scrollX = Math.max(0, Math.min(game.scrollX, game.levelLength - canvas.width));

      // Update coin positions and check collection
      game.fishes.forEach((f: any) => {
        if (!f.collected) {
          // Dynamic bobbing effect
          if (f.isFlying) {
            f.hoverOffset += 0.05;
            f.y = f.baseY + Math.sin(f.hoverOffset) * 15;
          } else {
            // Even static coins bob slightly
            f.hoverOffset = (f.hoverOffset || 0) + 0.03;
            f.y = f.baseY + Math.sin(f.hoverOffset) * 5;
          }
          
          // Check collision with player - collect coin
          if (game.player.x < f.x + f.width && game.player.x + game.player.width > f.x &&
              game.player.y < f.y + f.height && game.player.y + game.player.height > f.y) {
            f.collected = true;
            game.score += 50;
            game.totalCollectedInLevel++;
            
            // Every 10 fish = 5 coins + 1 ammo!
            if (game.totalCollectedInLevel % 10 === 0) {
              game.ammo += 1;
              // Add coins to progress
              addCoins(5);
              // Show message
              game.floatingTexts.push({ x: f.x, y: f.y - 30, text: '+5 MYNT! +1 SKOTT!', life: 60, color: '#ffd700' });
            }
            
            // Floating score text
            game.floatingTexts.push({ x: f.x, y: f.y, text: '+50', life: 40, color: '#ffd700' });
          }
        }
      });

      // --- DRAWING ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background - Simple sky gradient with clouds (Tom & Jerry style)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F7FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 5; i++) {
        const x = (i * 200 + game.scrollX / 3) % (canvas.width + 300) - 100;
        const y = 50 + (i * 30) % 100;
        
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 25, y - 10, 25, 0, Math.PI * 2);
        ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw distant house
      ctx.fillStyle = 'rgba(139, 69, 19, 0.5)';
      ctx.fillRect(canvas.width - 200 + game.scrollX / 5, canvas.height - 200, 150, 160);
      
      // Draw windows
      ctx.fillStyle = 'rgba(255, 255, 200, 0.7)';
      ctx.fillRect(canvas.width - 180 + game.scrollX / 5, canvas.height - 180, 30, 40);
      ctx.fillRect(canvas.width - 110 + game.scrollX / 5, canvas.height - 180, 30, 40);

      // Platforms - Brown with grass on top (Tom & Jerry style)
      game.platforms.forEach(p => {
        if (p.x - game.scrollX + p.width > 0 && p.x - game.scrollX < canvas.width) {
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(p.x - game.scrollX, p.y, p.width, p.height);
          
          // Add texture
          ctx.fillStyle = '#A0522D';
          for (let i = 0; i < p.width; i += 20) {
            ctx.fillRect(p.x - game.scrollX + i, p.y, 10, p.height);
          }
          
          // Draw grass on top of ground platforms
          if (p.isGround) {
            ctx.fillStyle = '#228B22';
            ctx.fillRect(p.x - game.scrollX, p.y - 5, p.width, 5);
          }
        }
      });
      
      // Draw holes (black gaps)
      game.holes.forEach(hole => {
        if (hole.x - game.scrollX + hole.width > 0 && hole.x - game.scrollX < canvas.width) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(hole.x - game.scrollX, hole.y, hole.width, 100);
          
          // Add depth effect
          ctx.fillStyle = '#333333';
          ctx.fillRect(hole.x - game.scrollX, hole.y + 20, hole.width, 80);
        }
      });

      // Bullets - Bright Red color
      ctx.globalCompositeOperation = 'source-over';
      game.bullets.forEach((b: any) => {
        const bx = b.x - game.scrollX;

        // Outer red glow
        ctx.fillStyle = '#FF0000';
        ctx.beginPath(); ctx.arc(bx, b.y, b.radius * 2, 0, Math.PI * 2); ctx.fill();
        
        // Inner bright red
        ctx.fillStyle = '#FF4444';
        ctx.beginPath(); ctx.arc(bx, b.y, b.radius * 1.3, 0, Math.PI * 2); ctx.fill();

        // White center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(bx, b.y, b.radius * 0.5, 0, Math.PI * 2); ctx.fill();
      });

      // Enemies - Detailed enemies (Tom & Jerry style)
      game.enemies.forEach(e => {
        if (e.x < -500) return;
        
        const ex = e.x - game.scrollX;
        const ey = e.y;
        const ew = e.width;
        const eh = e.height;
        
        if (e.type === 0) { // Dog enemy
          // Draw dog body
          ctx.fillStyle = '#8B0000';
          ctx.beginPath();
          ctx.ellipse(ex + ew/2, ey + eh/2, ew/2, eh/2, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw head
          ctx.beginPath();
          ctx.arc(ex + ew/2, ey + eh/4, ew/3, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw ears
          ctx.fillStyle = '#333';
          ctx.beginPath();
          ctx.ellipse(ex + ew/2 - 10, ey + eh/4 - 10, 8, 12, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(ex + ew/2 + 10, ey + eh/4 - 10, 8, 12, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw eyes
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(ex + ew/2 - 8, ey + eh/4, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex + ew/2 + 8, ey + eh/4, 5, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw pupils
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(ex + ew/2 - 8, ey + eh/4, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex + ew/2 + 8, ey + eh/4, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw nose
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(ex + ew/2, ey + eh/4 + 10, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw mouth
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ex + ew/2, ey + eh/4 + 12, 3, 0, Math.PI);
          ctx.stroke();
        } else if (e.type === 1) { // Mouse enemy
          // Draw gray mouse enemy
          ctx.fillStyle = '#A9A9A9';
          ctx.beginPath();
          ctx.ellipse(ex + ew/2, ey + eh/2, ew/2, eh/2, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw ears
          ctx.fillStyle = '#666';
          ctx.beginPath();
          ctx.arc(ex + ew/2 - 8, ey + eh/4, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex + ew/2 + 8, ey + eh/4, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw eyes (angry)
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.arc(ex + ew/2 - 6, ey + eh/3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex + ew/2 + 6, ey + eh/3, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw teeth
          ctx.fillStyle = 'white';
          ctx.fillRect(ex + ew/2 - 4, ey + eh/2, 3, 6);
          ctx.fillRect(ex + ew/2 + 1, ey + eh/2, 3, 6);
        } else { // Spike ball
          const radius = ew / 2;
          
          // Draw spike ball
          ctx.fillStyle = '#444';
          ctx.beginPath();
          ctx.arc(ex + radius, ey + radius, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw spikes
          ctx.fillStyle = '#FF0000';
          const spikeCount = 8;
          for (let i = 0; i < spikeCount; i++) {
            const angle = (i * 2 * Math.PI) / spikeCount;
            const spikeLength = radius * 0.8;
            
            ctx.beginPath();
            ctx.moveTo(
              ex + radius + Math.cos(angle) * radius,
              ey + radius + Math.sin(angle) * radius
            );
            ctx.lineTo(
              ex + radius + Math.cos(angle) * (radius + spikeLength),
              ey + radius + Math.sin(angle) * (radius + spikeLength)
            );
            ctx.lineTo(
              ex + radius + Math.cos(angle + Math.PI / spikeCount) * radius * 0.7,
              ey + radius + Math.sin(angle + Math.PI / spikeCount) * radius * 0.7
            );
            ctx.closePath();
            ctx.fill();
          }
        }
      });

      // Draw Fishes (Yellow/Gold Fish) - Now drawn after background and platforms
      game.fishes.forEach((f: any) => {
        if (f.collected) return;
        
        const fxs = f.x - game.scrollX;
        
        // Skip if off screen
        if (fxs < -50 || fxs > canvas.width + 50) return;
        
        const fx = fxs;
        const fy = f.y;
        const fw = f.width;
        const fh = f.height;
        
        // Draw fish body (orange/gold like Jerry)
        ctx.fillStyle = '#FF8C00';
        
        // Fish body - ellipse shape
        ctx.beginPath();
        ctx.ellipse(fx + fw/2, fy + fh/2, fw/2, fh/2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fish tail
        ctx.beginPath();
        ctx.moveTo(fx, fy + fh/2);
        ctx.lineTo(fx - fh/2, fy);
        ctx.lineTo(fx - fh/2, fy + fh);
        ctx.closePath();
        ctx.fill();
        
        // Fish eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(fx + fw*0.7, fy + fh*0.4, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(fx + fw*0.7, fy + fh*0.4, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Fish fin on top
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.moveTo(fx + fw/2, fy);
        ctx.lineTo(fx + fw/2 + 5, fy - 5);
        ctx.lineTo(fx + fw/2 - 5, fy);
        ctx.closePath();
        ctx.fill();
      });

      // Draw coins - count collected
      let collectedCountInFrame = 0;
      game.fishes.forEach((f: any) => {
        if (f.collected) collectedCountInFrame++;
      });
      
      // Goal Logic - check if player can complete level
      const allFishesCollected = collectedCountInFrame === game.fishes.length;
      const overlapsGoal = game.player.x < game.jerry.x + game.jerry.width && game.player.x + game.player.width > game.jerry.x && game.player.y < game.jerry.y + game.jerry.height && game.player.y + game.player.height > game.jerry.y;
      if (overlapsGoal) {
        if (allFishesCollected) { game.running = false; setTotalScore(game.score + 1000); setShowLevelComplete(true); }
        else { game.showFishWarning = true; }
      } else { game.showFishWarning = false; }

      // Goal - Detailed Jerry the mouse (Tom & Jerry style)
      const jx = game.jerry.x - game.scrollX; const jy = game.jerry.y; const jw = game.jerry.width; const jh = game.jerry.height;
      
      // Draw Jerry as a proper mouse
      ctx.fillStyle = '#FF8C00';
      
      // Draw body
      ctx.beginPath();
      ctx.ellipse(jx + jw/2, jy + jh/2, jw/2, jh/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw head
      ctx.beginPath();
      ctx.arc(jx + jw/2, jy + jh/4, jw/3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw ears
      ctx.fillStyle = '#FF4500';
      ctx.beginPath();
      ctx.arc(jx + jw/2 - 8, jy + jh/4 - 5, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(jx + jw/2 + 8, jy + jh/4 - 5, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(jx + jw/2 - 5, jy + jh/4, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(jx + jw/2 + 5, jy + jh/4, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw pupils
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(jx + jw/2 - 5, jy + jh/4, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(jx + jw/2 + 5, jy + jh/4, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw nose
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(jx + jw/2, jy + jh/4 + 8, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw tail
      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(jx + jw, jy + jh - 5);
      ctx.bezierCurveTo(
        jx + jw + 20, jy + jh,
        jx + jw + 15, jy + jh + 10,
        jx + jw + 5, jy + jh
      );
      ctx.stroke();
      
      // Glow effect
      ctx.shadowBlur = 15; ctx.shadowColor = '#FF8C00'; ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.strokeRect(jx - 5, jy - 5, jw + 10, jh + 10); ctx.shadowBlur = 0;
      if (game.showFishWarning) {
        ctx.fillStyle = '#ee2b2b'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('SAMLA ALLA FISKAR FÖRST!', jx + jw / 2, jy - 15);
      }

      // Player
      const px = game.player.x - game.scrollX; const py = game.player.y; const pw = game.player.width; const ph = game.player.height;
      ctx.save();
      if (game.player.invincible) ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() / 50);

      // Kattens svans - Ritas bakom kroppen för att se ut som en riktig svans
      const isMovingRight = game.player.facing === 1;
      const tailX = isMovingRight ? px + 5 : px + pw - 5;
      const tailDir = isMovingRight ? -1 : 1;
      const tailWiggle = Math.sin(Date.now() / 150) * 5;

      ctx.strokeStyle = '#4169E1'; ctx.lineWidth = 8; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, py + ph * 0.7);
      ctx.bezierCurveTo(
        tailX + tailDir * 25, py + ph * 0.8 + tailWiggle,
        tailX + tailDir * 35, py + ph * 0.4 - tailWiggle,
        tailX + tailDir * 15, py + ph * 0.2
      );
      ctx.stroke();

      // Kropp (Ellipse)
      ctx.fillStyle = '#4169E1'; ctx.beginPath(); ctx.ellipse(px + pw / 2, py + ph / 2, pw / 2, ph / 2, 0, 0, Math.PI * 2); ctx.fill();

      // Öron (Trianglar)
      ctx.fillStyle = '#333'; ctx.beginPath(); ctx.moveTo(px + 5, py + 15); ctx.lineTo(px - 5, py - 10); ctx.lineTo(px + 20, py + 5); ctx.fill();
      ctx.beginPath(); ctx.moveTo(px + pw - 5, py + ph * 0.15); ctx.lineTo(px + pw + 5, py - 10); ctx.lineTo(px + pw - 20, py + 5); ctx.fill();

      // Ögon med blink-logik
      if (game.player.isBlinking) {
        ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px + pw * 0.25, py + ph * 0.4); ctx.lineTo(px + pw * 0.45, py + ph * 0.4); ctx.moveTo(px + pw * 0.55, py + ph * 0.4); ctx.lineTo(px + pw * 0.75, py + ph * 0.4); ctx.stroke();
      } else {
        ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(px + pw * 0.35, py + ph * 0.4, 8, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(px + pw * 0.65, py + ph * 0.4, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'green'; ctx.beginPath(); ctx.arc(px + pw * 0.35, py + ph * 0.4, 4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(px + pw * 0.65, py + ph * 0.4, 4, 0, Math.PI * 2); ctx.fill();
      }

      // Nos
      ctx.fillStyle = 'pink'; ctx.beginPath(); ctx.arc(px + pw * 0.5, py + ph * 0.55, 6, 0, Math.PI * 2); ctx.fill();

      // Morrhår
      ctx.fillStyle = 'black';
      const wl1 = [{ x: px + pw * 0.25, y: py + ph * 0.58 - 1 }, { x: px + pw * 0.25, y: py + ph * 0.58 + 1 }, { x: px - 10, y: py + ph * 0.55 + 3 }, { x: px - 10, y: py + ph * 0.55 - 3 }];
      const wl2 = [{ x: px + pw * 0.25, y: py + ph * 0.66 - 1 }, { x: px + pw * 0.25, y: py + ph * 0.66 + 1 }, { x: px - 10, y: py + ph * 0.66 + 3 }, { x: px - 10, y: py + ph * 0.66 - 3 }];
      const wl3 = [{ x: px + pw * 0.25, y: py + ph * 0.74 - 1 }, { x: px + pw * 0.25, y: py + ph * 0.74 + 1 }, { x: px - 10, y: py + ph * 0.77 + 3 }, { x: px - 10, y: py + ph * 0.77 - 3 }];
      const wr1 = [{ x: px + pw * 0.75, y: py + ph * 0.58 - 1 }, { x: px + pw * 0.75, y: py + ph * 0.58 + 1 }, { x: px + pw + 10, y: py + ph * 0.55 + 3 }, { x: px + pw + 10, y: py + ph * 0.55 - 3 }];
      const wr2 = [{ x: px + pw * 0.75, y: py + ph * 0.66 - 1 }, { x: px + pw * 0.75, y: py + ph * 0.66 + 1 }, { x: px + pw + 10, y: py + ph * 0.66 + 3 }, { x: px + pw + 10, y: py + ph * 0.66 - 3 }];
      const wr3 = [{ x: px + pw * 0.75, y: py + ph * 0.74 - 1 }, { x: px + pw * 0.75, y: py + ph * 0.74 + 1 }, { x: px + pw + 10, y: py + ph * 0.77 + 3 }, { x: px + pw + 10, y: py + ph * 0.77 - 3 }];
      const drawPolygon = (pts: any[]) => {
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.closePath(); ctx.fill();
      };
      drawPolygon(wl1); drawPolygon(wl2); drawPolygon(wl3); drawPolygon(wr1); drawPolygon(wr2); drawPolygon(wr3);

      // Mun
      ctx.strokeStyle = 'black'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px + pw * 0.5, py + ph * 0.55 + 6); ctx.lineTo(px + pw * 0.5, py + ph * 0.65); ctx.stroke(); ctx.beginPath(); ctx.arc(px + pw * 0.4, py + ph * 0.65, 5, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.arc(px + pw * 0.6, py + ph * 0.65, 5, 0, Math.PI); ctx.stroke();

      ctx.fillStyle = '#4169E1'; ctx.fillRect(px + 10, py + ph - 5, 12, 10); ctx.fillRect(px + pw - 22, py + ph - 5, 12, 10);
      ctx.restore();

      // Draw Particles
      ctx.globalCompositeOperation = 'lighter';
      game.particles.forEach((p: any) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x - game.scrollX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      // Draw Floating Texts
      ctx.font = 'bold 24px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      game.floatingTexts.forEach((t: any) => {
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.life / 40;
        ctx.fillText(t.text, t.x - game.scrollX, t.y);
      });
      ctx.globalAlpha = 1;

      // Weather Particles Rendering
      if (game.weather === 'REGNIGT' || game.weather === 'STORMIGT') {
        ctx.strokeStyle = game.timeOfDay === 'DAY' ? 'rgba(100, 100, 150, 0.4)' : 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        game.weatherParticles.forEach((p: any) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.length);
          ctx.stroke();
        });
      } else if (game.weather === 'SNÖIGT') {
        ctx.fillStyle = game.timeOfDay === 'DAY' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)';
        game.weatherParticles.forEach((p: any) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (game.weather === 'DIMMIGT') {
        game.weatherParticles.forEach((p: any) => {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          const fogColor = game.timeOfDay === 'DAY' ? '255, 255, 255' : '200, 200, 200';
          grd.addColorStop(0, `rgba(${fogColor}, ${p.opacity})`);
          grd.addColorStop(1, `rgba(${fogColor}, 0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        // Extra overlay for haze
        ctx.fillStyle = game.timeOfDay === 'DAY' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Throttle React state updates to prevent infinite loops and improve performance
      if (Date.now() - game.lastStatUpdate > 250) {
        setStats({
          score: game.score, progress: Math.min(100, Math.floor((game.player.x / game.levelLength) * 100)),
          collectedCount: collectedCountInFrame, totalFish: game.fishes.length, ammo: game.ammo,
          weather: game.weather,
          intensity: game.intensity,
          timeOfDay: game.timeOfDay
        });
        setLives(game.lives);
        setTotalScore(game.score);
        game.lastStatUpdate = Date.now();
      }
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', resizeCanvas);

      if (isTouchDevice) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }

      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, onEnd, isTouchDevice]);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-start gap-3 md:gap-6 py-2 md:py-4 animate-fade-in-up px-2 overflow-hidden max-h-screen ${isFullscreen ? 'fixed inset-0 z-[100] bg-background-dark' : ''}`}>
      {/* Mobile Touch Controls Overlay */}
      {isTouchDevice && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
              <p className="text-white/80 text-xs font-medium">Vänster: Hoppa</p>
              <p className="text-white/80 text-xs font-medium">Höger: Skjuta</p>
              <p className="text-white/80 text-xs font-medium">Svep: Rörelse</p>
            </div>
          </div>
        </div>
      )}

      {/* HUD - Mobiloptimerad */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-8 lg:gap-12 glass-card px-3 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-full border border-primary/30 w-full max-w-4xl flex-shrink-0">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="material-symbols-outlined text-primary-red text-lg md:text-3xl">favorite</span>
          <span className="text-sm md:text-2xl font-black text-white">{lives}</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 border-x border-white/10 px-3 md:px-8">
          <span className="material-symbols-outlined text-primary text-lg md:text-3xl">set_meal</span>
          <span className={`text-sm md:text-2xl font-black transition-colors ${stats.collectedCount === stats.totalFish ? 'text-primary' : 'text-white'}`}>
            {stats.collectedCount}/{stats.totalFish}
          </span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 border-r border-white/10 pr-3 md:pr-8">
          <span className="material-symbols-outlined text-[#ff8888] text-lg md:text-3xl">bolt</span>
          <span className={`text-sm md:text-2xl font-black ${stats.ammo <= 0 ? 'text-primary-red animate-pulse' : 'text-white'}`}>
            {stats.ammo}
          </span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 border-r border-white/10 pr-3 md:pr-8">
          <span className="material-symbols-outlined text-yellow-500 text-lg md:text-3xl">monetization_on</span>
          <span className="text-sm md:text-2xl font-black text-yellow-400">{progress.coins}</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 pr-3 md:pr-8 border-r border-white/10">
          <span className={`material-symbols-outlined text-lg md:text-3xl ${stats.weather === 'SOLIGT' ? (stats.timeOfDay === 'DAY' ? 'text-orange-400' : 'text-yellow-400') : (stats.weather === 'REGNIGT' ? 'text-blue-400' : (stats.weather === 'SNÖIGT' ? 'text-white' : (stats.weather === 'DIMMIGT' ? 'text-gray-400' : 'text-purple-400')))}`}>
            {stats.weather === 'SOLIGT' ? (stats.timeOfDay === 'DAY' ? 'sunny' : 'nightlight') : (stats.weather === 'REGNIGT' ? 'rainy' : (stats.weather === 'SNÖIGT' ? 'ac_unit' : (stats.weather === 'DIMMIGT' ? 'foggy' : 'thunderstorm')))}
          </span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="flex flex-col md:flex-row md:items-center text-left">
            <span className="text-[8px] md:text-xs font-bold text-primary/50 uppercase md:mr-2 leading-none">Nivå {currentLevel}</span>
            <span className="text-sm md:text-2xl font-black text-white leading-none">{stats.progress}%</span>
          </div>
        </div>
      </div>

      {/* Mobile Touch Controls Overlay */}
      {isTouchDevice && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
              <p className="text-white/80 text-xs font-medium">Vänster: Hoppa</p>
              <p className="text-white/80 text-xs font-medium">Höger: Skjuta</p>
              <p className="text-white/80 text-xs font-medium">Svep: Rörelse</p>
            </div>
          </div>
        </div>
      )}

      {/* GAME AREA */}
      <div className={`relative w-full max-w-7xl aspect-[16/10] glass-card rounded-2xl md:rounded-[2.5rem] border-2 border-primary/20 overflow-hidden shadow-[0_0_100px_rgba(43,238,121,0.15)] transition-all duration-500`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain cursor-crosshair bg-[#102217]"
        />

        {showLevelComplete && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in-up z-50">
            <span className="material-symbols-outlined text-5xl md:text-8xl text-primary mb-2 md:mb-4">stars</span>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-1 md:mb-2 uppercase tracking-tighter text-center leading-tight">Nivå {currentLevel} Klar!</h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs md:max-w-md">
              <button onClick={startNextLevel} className="bg-primary text-white px-8 md:px-12 py-4 rounded-full font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(43,238,121,0.3)] border-2 border-primary/80 w-full">NÄSTA NIVÅ ({currentLevel + 1})</button>
              <button onClick={() => onEnd(totalScore)} className="bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white/30 transition-all text-sm md:text-base w-full border border-white/30">Avsluta</button>
            </div>
          </div>
        )}
      </div>

      {/* TOUCH CONTROLS - UNDER spelrutan */}
      {isTouchDevice && !showLevelComplete && (
        <div className="flex w-full max-w-4xl justify-between items-center px-4 py-2 mt-auto select-none pointer-events-auto">
          {/* Vänster sida: Styrning (Gå vänster/höger) */}
          <div className="flex items-center gap-3">
            <button
              className="size-14 md:size-16 bg-[#16291e]/90 backdrop-blur-md rounded-2xl flex items-center justify-center border-b-4 border-black/60 shadow-xl active:translate-y-1 active:border-b-0 active:bg-primary/40 transition-all group"
              onTouchStart={(e) => { e.preventDefault(); setKeyState(65, true); }}
              onTouchEnd={(e) => { e.preventDefault(); setKeyState(65, false); }}
            >
              <span className="material-symbols-outlined text-3xl text-white group-active:text-primary">arrow_back</span>
            </button>
            <button
              className="size-14 md:size-16 bg-[#16291e]/90 backdrop-blur-md rounded-2xl flex items-center justify-center border-b-4 border-black/60 shadow-xl active:translate-y-1 active:border-b-0 active:bg-primary/40 transition-all group"
              onTouchStart={(e) => { e.preventDefault(); setKeyState(68, true); }}
              onTouchEnd={(e) => { e.preventDefault(); setKeyState(68, false); }}
            >
              <span className="material-symbols-outlined text-3xl text-white group-active:text-primary">arrow_forward</span>
            </button>
          </div>

          {/* Höger sida: Handlingar (Hoppa/Skjut) */}
          <div className="flex items-center gap-3">
            {/* Hopp-knapp */}
            <button
              className="size-16 md:size-20 bg-primary/20 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-4 border-primary/40 border-b-8 border-b-black/40 text-white shadow-2xl active:translate-y-2 active:border-b-0 active:bg-primary/60 transition-all group"
              onTouchStart={(e) => { e.preventDefault(); triggerJump(); }}
            >
              <span className="material-symbols-outlined text-3xl group-active:scale-110 transition-transform">arrow_upward</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-90">HOPPA</span>
            </button>

            {/* Skjut-knapp */}
            <button
              className="size-16 md:size-20 bg-primary-red/30 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-4 border-primary-red/50 border-b-8 border-b-black/40 text-white shadow-2xl active:translate-y-2 active:border-b-0 active:bg-primary-red/60 transition-all group"
              onTouchStart={(e) => { e.preventDefault(); fireBullet(); }}
            >
              <span className="material-symbols-outlined text-3xl group-active:scale-110 transition-transform">bolt</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-90">SKJUT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/** SHOP VIEW **/
export const ShopView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { progress, buyUpgrade, addCoins } = useProgress();
  const [message, setMessage] = useState('');

  const handleBuy = (type: 'maxAmmo' | 'jumpPower' | 'speed', cost: number) => {
    if (buyUpgrade(type, cost)) {
      setMessage('Uppgradering köpt!');
    } else {
      setMessage('Inte tillräckligt med mynt!');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up py-8 md:py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
          <span className="material-symbols-outlined text-primary text-sm">store</span>
          <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Butik</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Uppgraderingar</h1>
        <p className="mt-2 text-white/70 text-sm">Förbättra din katt med neon-teknologi</p>
      </div>

      {/* Coins Display */}
      <div className="glass-card rounded-2xl p-4 mb-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-500">monetization_on</span>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest">Dina Mynt</p>
              <p className="text-white text-xl font-black">{progress.coins}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs uppercase tracking-widest">Nivå</p>
            <p className="text-white text-xl font-black">{progress.level}</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-primary/20 border border-primary/30 text-center text-white font-medium">
          {message}
        </div>
      )}

      {/* Upgrades */}
      <div className="space-y-4">
        {/* Max Ammo */}
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">battery_full</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold uppercase">Max Ammo</h3>
              <p className="text-white/50 text-xs">Fler skott innan omladdning</p>
              <p className="text-white/80 text-sm mt-1">Nuvarande: {progress.upgrades.maxAmmo.toFixed(0)}</p>
              <button 
                onClick={() => handleBuy('maxAmmo', 500)}
                disabled={progress.coins < 500}
                className="mt-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-yellow-400 font-bold text-sm"
              >
                Köp (500 coins)
              </button>
            </div>
          </div>
        </div>

        {/* Jump Power */}
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">rocket</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold uppercase">Jump Power</h3>
              <p className="text-white/50 text-xs">Högre hopp</p>
              <p className="text-white/80 text-sm mt-1">Nuvarande: {progress.upgrades.jumpPower.toFixed(1)}</p>
              <button 
                onClick={() => handleBuy('jumpPower', 750)}
                disabled={progress.coins < 750}
                className="mt-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-yellow-400 font-bold text-sm"
              >
                Köp (750 coins)
              </button>
            </div>
          </div>
        </div>

        {/* Speed */}
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400">speed</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold uppercase">Speed</h3>
              <p className="text-white/50 text-xs">Snabbare rörelse</p>
              <p className="text-white/80 text-sm mt-1">Nuvarande: {progress.upgrades.speed.toFixed(1)}</p>
              <button 
                onClick={() => handleBuy('speed', 1000)}
                disabled={progress.coins < 1000}
                className="mt-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-yellow-400 font-bold text-sm"
              >
                Köp (1000 coins)
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Tillbaka
      </button>
    </div>
  );
};

/** QUESTS VIEW **/
export const QuestsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { progress, addCoins } = useProgress();

  const claimReward = (questId: string, reward: number) => {
    addCoins(reward);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up py-8 md:py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
          <span className="material-symbols-outlined text-primary text-sm">task_alt</span>
          <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Uppdrag</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Dagliga Uppdrag</h1>
        <p className="mt-2 text-white/70 text-sm">Slutför uppdrag för att tjäna mynt</p>
      </div>

      {/* XP Progress */}
      <div className="glass-card rounded-2xl p-4 mb-6 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">military_tech</span>
            <span className="text-white font-bold">Nivå {progress.level}</span>
          </div>
          <span className="text-white/60 text-sm">{progress.xp} XP</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(progress.xp % 1000) / 10}%` }}
          />
        </div>
        <p className="text-white/40 text-xs mt-2">{1000 - (progress.xp % 1000)} XP till nästa nivå</p>
      </div>

      {/* Quests */}
      <div className="space-y-4">
        {progress.dailyQuests.map((quest) => (
          <div
            key={quest.id}
            className={`glass-card rounded-2xl p-5 border ${quest.completed ? 'border-primary/30 bg-primary/5' : 'border-white/10'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${quest.completed ? 'bg-primary/20' : 'bg-white/5'}`}>
                <span className={`material-symbols-outlined ${quest.completed ? 'text-primary' : 'text-white/40'}`}>
                  {quest.completed ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{quest.description}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-xs">{quest.current}/{quest.target}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-yellow-500 font-black">+{quest.reward} 🪙</p>
                {quest.completed && quest.current >= quest.target && (
                  <button
                    onClick={() => claimReward(quest.id, quest.reward)}
                    className="mt-1 px-3 py-1 rounded-lg bg-primary text-[#112218] text-xs font-bold"
                  >
                    Hämta
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Tillbaka
      </button>
    </div>
  );
};
