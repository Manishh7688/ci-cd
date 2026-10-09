import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { normalizeCoupon } from '../../../security/validation';
import { coupons } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function PromoScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const apply = (next: string) => {
    const ok = shop.tryCoupon(normalizeCoupon(next));
    setMessage(ok ? shop.t('coupon_applied_successfully') : shop.t('something_went_wrong'));
    if (ok) {
      navigation.goBack();
    }
  };

  return (
    <Screen title={shop.t('coupons')} onBack={() => navigation.goBack()}>
      <TextField
        value={code}
        onChangeText={value => setCode(normalizeCoupon(value))}
        placeholder={shop.t('coupons')}
        testID="coupon-input"
      />
      <Button label={shop.t('apply')} onPress={() => apply(code)} />
      {message ? <AppText color={colors.primary}>{message}</AppText> : null}
      {coupons.map(coupon => (
        <View key={coupon.code} style={styles.card}>
          <AppText variant="section">{coupon.code}</AppText>
          <AppText>
            {shop.t('save_upto')} {inr(coupon.saveUpto)}
          </AppText>
          <AppText variant="caption">
            {shop.t('applicable_for_minimum_cart_value_of')} {inr(coupon.minCart)}
          </AppText>
          <Button label={shop.t('apply')} variant="outline" onPress={() => apply(coupon.code)} />
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
  },
});
