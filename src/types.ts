import { LucideIcon } from 'lucide-react';

export type LevelId = 'diagnostico' | 'logistica' | 'responsabilidad' | 'proyecto';

export interface Activity {
  id: string;
  type: 'quiz' | 'case-study' | 'debate' | 'design';
  title: string;
  description: string;
  points: number;
  content?: any;
}

export interface Level {
  id: LevelId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  activities: Activity[];
  unlockedAt: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface Manual {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'maquinaria' | 'logistica' | 'territorio';
}

export interface UserProgress {
  completedActivities: string[];
  totalPoints: number;
  currentLevel: LevelId;
  rank: string;
  theme: 'dark' | 'light';
  unlockedBadges: string[];
}
