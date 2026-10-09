import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors } from '../../design/colors';

type Variant = 'title' | 'subtitle' | 'section' | 'body' | 'caption' | 'price';

const variants: Record<Variant, TextStyle> = {
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, fontWeight: '500', color: colors.muted },
  section: { fontSize: 16, fontWeight: '700', color: colors.text },
  body: { fontSize: 14, fontWeight: '400', color: colors.text },
  caption: { fontSize: 12, fontWeight: '500', color: colors.muted },
  price: { fontSize: 16, fontWeight: '700', color: colors.text },
};

export function AppText({
  children,
  variant = 'body',
  color,
  align,
  style,
  numberOfLines,
  onPress,
}: {
  children: React.ReactNode;
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[variants[variant], align ? { textAlign: align } : null, color ? { color } : null, style]}>
      {children}
    </Text>
  );
}
