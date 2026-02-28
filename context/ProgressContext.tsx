
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PlayerProgress } from '../types';

const STORAGE_KEY = 'shadow_paw_progress_v1';

const defaultProgress: PlayerProgress = {
  coins: 0,
  totalCoinsEarned: 0,
  xp: 0,
  level: 1,
  unlockedSkins: ['default'],
  equippedSkin: 'default',
  upgrades: {
    maxAmmo: 5,
    jumpPower: 15,
    speed: 5,
  },
  achievements: [],
  dailyQuests: [
    { id: '1', description: 'Samla 50 fiskar', target: 50, current: 0, reward: 100, completed: false },
    { id: '2', description: 'Nivå 5', target: 5, current: 0, reward: 200, completed: false },
    { id: '3', description: 'Besegra 20 fiender', target: 20, current: 0, reward: 150, completed: false },
  ],
};

interface ProgressContextType {
  progress: PlayerProgress;
  addCoins: (amount: number) => void;
  addXP: (amount: number) => void;
  completeQuest: (questId: string) => void;
  updateQuestProgress: (questId: string, increment: number) => void;
  buyUpgrade: (type: 'maxAmmo' | 'jumpPower' | 'speed', cost: number) => boolean;
  equipSkin: (skinId: string) => void;
  resetDailyQuests: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultProgress, ...JSON.parse(saved) };
        } catch {
          return defaultProgress;
        }
      }
    }
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const addCoins = (amount: number) => {
    setProgress(p => ({
      ...p,
      coins: p.coins + amount,
      totalCoinsEarned: p.totalCoinsEarned + amount,
    }));
  };

  const addXP = (amount: number) => {
    setProgress(p => {
      const newXP = p.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return {
        ...p,
        xp: newXP,
        level: newLevel > p.level ? newLevel : p.level,
      };
    });
  };

  const completeQuest = (questId: string) => {
    setProgress(p => ({
      ...p,
      dailyQuests: p.dailyQuests.map(q =>
        q.id === questId && !q.completed ? { ...q, completed: true } : q
      ),
    }));
  };

  const updateQuestProgress = (questId: string, increment: number) => {
    setProgress(p => ({
      ...p,
      dailyQuests: p.dailyQuests.map(q => {
        if (q.id !== questId || q.completed) return q;
        const newCurrent = q.current + increment;
        if (newCurrent >= q.target) {
          return { ...q, current: q.target, completed: true };
        }
        return { ...q, current: newCurrent };
      }),
    }));
  };

  const buyUpgrade = (type: 'maxAmmo' | 'jumpPower' | 'speed', cost: number): boolean => {
    if (progress.coins < cost) return false;
    
    setProgress(p => ({
      ...p,
      coins: p.coins - cost,
      upgrades: {
        ...p.upgrades,
        [type]: p.upgrades[type] + (type === 'maxAmmo' ? 1 : 0.5),
      },
    }));
    return true;
  };

  const equipSkin = (skinId: string) => {
    if (progress.unlockedSkins.includes(skinId)) {
      setProgress(p => ({ ...p, equippedSkin: skinId }));
    }
  };

  const resetDailyQuests = () => {
    setProgress(p => ({
      ...p,
      dailyQuests: defaultProgress.dailyQuests,
    }));
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      addCoins,
      addXP,
      completeQuest,
      updateQuestProgress,
      buyUpgrade,
      equipSkin,
      resetDailyQuests,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
