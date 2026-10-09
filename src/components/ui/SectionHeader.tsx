import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../design/colors';
import { AppText } from './AppText';

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.row}>
      <AppText variant="section">{title}</AppText>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" style={styles.action}>
          <AppText variant="caption" color={colors.primary}>
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  action: {
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
