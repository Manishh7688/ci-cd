export const colors = {
  primary: '#D71828',
  primaryDark: '#A8121E',
  white: '#FFFFFF',
  black: '#111111',
  text: '#1C1C1C',
  brown: '#5E493B',
  muted: '#6E6D78',
  gray: '#9D9CA9',
  line: '#DEDEDE',
  background: '#F6F8FA',
  surface: '#FFFFFF',
  intro: '#FEBD2F',
  success: '#1B8A3E',
  chip: 'rgba(232, 152, 21, 0.14)',
  soft: '#FFF1E6',
} as const;

export type ColorName = keyof typeof colors;
