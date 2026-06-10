export type ThemeType = 'day' | 'night';

export const Themes = {
  day: {
    bg: {
      start: '#f7f3ed',
      end: '#ede6d8',
      card: 'rgba(255,255,255,0.85)',
      cardBorder: 'rgba(0,0,0,0.06)',
    },
    accent: {
      gold: '#b8860b',
      goldLight: '#d4a843',
      rose: '#c44569',
      roseLight: '#e08a9d',
      cream: '#2c1810',
      creamMuted: '#6b5b4f',
    },
    text: {
      primary: '#2c1810',
      secondary: '#5c4d3c',
      muted: '#8a7d6b',
    },
  },
  night: {
    bg: {
      start: '#0a0e1a',
      end: '#141b2d',
      card: 'rgba(255,255,255,0.06)',
      cardBorder: 'rgba(255,255,255,0.08)',
    },
    accent: {
      gold: '#d4af37',
      goldLight: '#f0d878',
      rose: '#e11d48',
      roseLight: '#fb7185',
      cream: '#f0e6d2',
      creamMuted: '#b8a99a',
    },
    text: {
      primary: '#f0e6d2',
      secondary: '#b8a99a',
      muted: '#8a7d6b',
    },
  },
} as const;

export const Fonts = {
  title: 'PlayfairDisplay_700Bold',
  titleItalic: 'PlayfairDisplay_700Bold_Italic',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  letter: 'DancingScript_400Regular',
  letterBold: 'DancingScript_700Bold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;
