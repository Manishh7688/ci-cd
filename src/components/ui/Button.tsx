import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../design/colors';
import { AppText } from './AppText';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  testID,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  testID?: string;
}) {
  const style: ViewStyle[] = [styles.base];
  if (variant === 'primary') {
    style.push(styles.primary);
  } else if (variant === 'outline') {
    style.push(styles.outline);
  }
  if (disabled) {
    style.push(styles.disabled);
  }
  const textColor = variant === 'primary' ? colors.white : colors.primary;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={style}
      testID={testID}>
      <AppText variant="body" color={textColor} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  primary: { backgroundColor: colors.primary },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: { opacity: 0.6 },
  label: { fontWeight: '700' },
});
