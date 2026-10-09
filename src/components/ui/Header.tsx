import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../design/colors';
import { AppText } from './AppText';
import { Icon } from './Icon';

export function Header({
  title,
  onBack,
  onCart,
  cartCount = 0,
}: {
  title: string;
  onBack?: () => void;
  onCart?: () => void;
  cartCount?: number;
}) {
  return (
    <View style={styles.bar}>
      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.slot} testID="header-back">
          <Icon name="back" color={colors.white} size={28} />
        </Pressable>
      ) : (
        <View style={styles.slot} />
      )}
      <AppText variant="body" color={colors.white} style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      {onCart ? (
        <Pressable accessibilityRole="button" onPress={onCart} style={styles.slot} testID="header-cart">
          <Icon name="cart" color={colors.white} size={18} />
          {cartCount > 0 ? (
            <View style={styles.badge}>
              <AppText variant="caption" color={colors.black}>
                {cartCount}
              </AppText>
            </View>
          ) : null}
        </Pressable>
      ) : (
        <View style={styles.slot} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  slot: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontWeight: '700', fontSize: 15 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});
