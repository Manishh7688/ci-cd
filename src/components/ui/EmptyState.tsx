import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { Button } from './Button';

export function EmptyState({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.box}>
      <AppText variant="section" align="center">
        {title}
      </AppText>
      {body ? (
        <AppText variant="caption" align="center">
          {body}
        </AppText>
      ) : null}
      {action && onAction ? <Button label={action} onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 28, gap: 10, alignItems: 'center' },
});
