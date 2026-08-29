import { useState, useCallback } from 'react';

// Simple state management for Fyren app

export type Mood = 'great' | 'good' | 'okay' | 'low' | 'bad';

export interface Reflection {
  id: string;
  date: string;
  mood: Mood;
  text: string;
  tags: string[];
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  category: 'halsa' | 'rutin' | 'familj' | 'ekonomi';
}

export interface FamilyEvent {
  id: string;
  title: string;
  member: string;
  time: string;
  location?: string;
  color: string;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  milestones: { text: string; done: boolean }[];
  streak: number;
}

// Mock data
export const MOCK_REFLECTIONS: Reflection[] = [
  { id: '1', date: '2026-08-29', mood: 'great', text: 'Fantastisk morgonpromenad. Kände mig lugn hela dagen.', tags: ['natur', 'lugn'] },
  { id: '2', date: '2026-08-28', mood: 'good', text: 'Produktiv dag på jobbet. Barnen var glada.', tags: ['jobb', 'familj'] },
  { id: '3', date: '2026-08-27', mood: 'okay', text: 'Lite stressad, men meditationen hjälpte.', tags: ['stress', 'meditation'] },
  { id: '4', date: '2026-08-26', mood: 'good', text: 'Lagade middag med familjen. Mysig kväll.', tags: ['familj', 'mat'] },
  { id: '5', date: '2026-08-25', mood: 'great', text: 'Löpning i skogen. Ny personbästa!', tags: ['träning', 'natur'] },
];

export const MOCK_HABITS: Habit[] = [
  { id: '1', name: 'Morgonmeditation', icon: 'leaf-outline', streak: 7, completedToday: true, category: 'halsa' },
  { id: '2', name: 'Drick vatten', icon: 'water-outline', streak: 14, completedToday: true, category: 'halsa' },
  { id: '3', name: 'Skriv dagbok', icon: 'book-outline', streak: 3, completedToday: false, category: 'rutin' },
  { id: '4', name: 'Läs 20 min', icon: 'glasses-outline', streak: 5, completedToday: false, category: 'rutin' },
  { id: '5', name: 'Familjepromenad', icon: 'walk-outline', streak: 2, completedToday: false, category: 'familj' },
];

export const MOCK_FAMILY_EVENTS: FamilyEvent[] = [
  { id: '1', title: 'Simskola', member: 'Ella', time: '10:00-17:00', location: 'Eriksdalspolen', color: '#D4AF37' },
  { id: '2', title: 'Morgonrutin', member: 'Marcus', time: '06:30-07:30', color: '#2CC6C6' },
  { id: '3', title: 'Teamlunch', member: 'Anna', time: '12:00-13:00', location: 'Kontoret', color: '#94A3B8' },
  { id: '4', title: 'Fotbollsträning', member: 'Leo', time: '15:30-17:00', location: 'Plan 5', color: '#E8D48A' },
];

export const MOCK_GOALS: Goal[] = [
  { id: '1', title: 'Sov 8 timmar', progress: 0.72, milestones: [{ text: '3 dagar i rad', done: true }, { text: '7 dagar i rad', done: true }, { text: '14 dagar i rad', done: false }, { text: '30 dagar i rad', done: false }], streak: 9 },
  { id: '2', title: 'Meditera dagligen', progress: 0.85, milestones: [{ text: 'Första sessionen', done: true }, { text: '7-dagars streak', done: true }, { text: '30 sessioner', done: true }, { text: '100 sessioner', done: false }], streak: 21 },
  { id: '3', title: 'Spara 5000 kr/mån', progress: 0.45, milestones: [{ text: 'Skapa budget', done: true }, { text: 'Första månaden', done: true }, { text: '3 månader', done: false }, { text: '6 månader', done: false }], streak: 2 },
];

export const MOOD_EMOJIS: Record<Mood, string> = {
  great: '😊',
  good: '🙂',
  okay: '😐',
  low: '😞',
  bad: '😢',
};

export const MOOD_LABELS: Record<Mood, string> = {
  great: 'Strålande',
  good: 'Bra',
  okay: 'Okäj',
  low: 'Låg',
  bad: 'Tung',
};
