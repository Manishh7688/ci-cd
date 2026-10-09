import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';

export function PriceRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.row}>
      <AppText variant="body">{label}</AppText>
      <AppText variant="body" color={valueColor} style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  value: { fontWeight: '700' },
});
