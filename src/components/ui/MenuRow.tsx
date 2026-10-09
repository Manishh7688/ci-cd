import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../design/colors';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

export function MenuRow({
  label,
  icon,
  image,
  onPress,
  testID,
}: {
  label: string;
  icon?: IconName;
  image?: ImageSourcePropType;
  onPress: () => void;
  testID?: string;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row} testID={testID}>
      <View style={styles.icon}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="contain" />
        ) : icon ? (
          <Icon name={icon} color={colors.brown} />
        ) : null}
      </View>
      <AppText style={styles.label}>{label}</AppText>
      <Icon name="chevron" color={colors.brown} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  image: { width: 22, height: 22 },
  label: { flex: 1, fontWeight: '600', color: colors.brown },
});
