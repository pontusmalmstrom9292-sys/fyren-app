/**
 * Fyren Design Tokens — Colors
 * Extracted from Figma file VL3p2rwWdo2DTwRhCgyLkt
 */

export const colors = {
  // Backgrounds
  background: '#0A0A0A',
  surface: '#141414',
  surfaceLight: '#1C1C1C',
  card: '#0F0F12',

  // Brand — Gold
  gold: '#D4AF37',
  goldLight: '#E8D48A',
  goldMuted: '#C9A84C',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textDim: '#6B6D75',

  // Functional
  white: '#FFFFFF',
  black: '#000000',
  error: '#EF4444',
  accent: '#2CC6C6',
  border: '#555555',

  // Semantic aliases
  primary: '#D4AF37',
  primaryLight: '#E8D48A',
} as const;

export type ColorToken = keyof typeof colors;
