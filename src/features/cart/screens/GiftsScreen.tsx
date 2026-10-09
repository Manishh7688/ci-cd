import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { gifts } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function GiftsScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();

  return (
    <Screen title={shop.t('Gift_Cards')} onBack={() => navigation.goBack()}>
      {gifts.map(gift => {
        const selected = shop.state.giftId === gift.id;
        return (
          <View key={gift.id} style={styles.row}>
            <View style={styles.copy}>
              <AppText style={styles.name}>{gift.name}</AppText>
              <AppText variant="caption">{shop.t('Select_to_get_gift')}</AppText>
              <AppText color={colors.success}>
                {inr(gift.price)} {shop.t('Rupee')}
              </AppText>
            </View>
            <Button
              label={selected ? shop.t('received') : shop.t('Select')}
              variant={selected ? 'primary' : 'outline'}
              onPress={() => {
                shop.selectGift(selected ? null : gift.id);
                if (!selected) {
                  navigation.goBack();
                }
              }}
            />
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  copy: { flex: 1, gap: 4 },
  name: { fontWeight: '700' },
});
