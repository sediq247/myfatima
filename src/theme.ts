export const Colors = {
  bg: {
    morningStart: '#2d1b4e',
    morningEnd: '#5e3a8c',
    nightStart: '#0f0518',
    nightEnd: '#1a0b2e',
    card: 'rgba(255,255,255,0.06)',
    cardBorder: 'rgba(255,255,255,0.1)',
  },
  accent: {
    gold: '#d4af37',
    goldLight: '#f0d878',
    rose: '#e11d48',
    roseLight: '#fb7185',
    cream: '#fff8e7',
    creamMuted: '#d4c5a9',
  },
  text: {
    primary: '#fff8e7',
    secondary: '#b8a99a',
    muted: '#8a7d6b',
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
