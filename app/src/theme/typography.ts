/**
 * Fyren Design Tokens — Typography
 * Fonts: Inter, Cormorant Garamond, Outfit
 */

export const fontFamily = {
  // Primary — UI text
  sans: 'Outfit',
  sansLight: 'Outfit-Light',
  sansMedium: 'Outfit-Medium',
  sansSemiBold: 'Outfit-SemiBold',
  sansBold: 'Outfit-Bold',
  sansExtraBold: 'Outfit-ExtraBold',

  // Secondary — Body & labels
  inter: 'Inter',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',
  interExtraBold: 'Inter-ExtraBold',

  // Accent — Headings & quotes
  serif: 'CormorantGaramond-Regular',
  serifItalic: 'CormorantGaramond-Italic',
  serifSemiBold: 'CormorantGaramond-SemiBold',
  serifBold: 'CormorantGaramond-Bold',
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 40,
  '6xl': 48,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;
