import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, PriceRow, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { appConfig } from '../../../security/config';
import { gifts } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function PaymentScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [message, setMessage] = useState<string | null>(null);
  const gift = gifts.find(item => item.id === shop.state.giftId);

  const place = () => {
    const orderId = shop.checkout();
    if (!orderId) {
      setMessage(shop.t('login_proceed'));
      return;
    }
    navigation.replace('OrderDetail', { orderId });
  };

  return (
    <Screen
      title={shop.t('payment')}
      onBack={() => navigation.goBack()}
      footer={
        <View style={styles.footer}>
          <Button
            label={shop.state.paymentMethod === 'online' ? shop.t('pay_now') : shop.t('place_order')}
            onPress={place}
            testID="place-order"
          />
        </View>
      }>
      <View style={styles.card}>
        <AppText variant="section">{shop.address.name}</AppText>
        <AppText>
          {shop.address.line} {shop.address.city} {shop.address.state} {shop.address.pincode}
        </AppText>
        <AppText>
          {shop.t('email')}: {shop.address.email}
        </AppText>
        <AppText>
          {shop.t('mobile_number')}: {shop.address.phone}
        </AppText>
        <Pressable onPress={() => navigation.navigate('Map')}>
          <AppText color={colors.primary}>{shop.t('change_add_address')}</AppText>
        </Pressable>
      </View>

      <AppText variant="caption" style={styles.kicker}>
        {shop.t('payment_options_header')}
      </AppText>
      <Pressable
        style={[styles.option, shop.state.paymentMethod === 'online' && styles.optionOn]}
        onPress={() => shop.setPaymentMethod('online')}>
        <AppText>{shop.t('pay_online')}</AppText>
      </Pressable>
      <Pressable
        style={[styles.option, shop.state.paymentMethod === 'cod' && styles.optionOn]}
        onPress={() => shop.setPaymentMethod('cod')}>
        <AppText>{shop.t('cash_on_delivery')}</AppText>
        <AppText variant="caption">
          <AppText variant="caption" color={colors.primary}>
            {inr(appConfig.codCharge)}
          </AppText>{' '}
          {shop.t('cod_charge_msg')}
        </AppText>
      </Pressable>

      <AppText variant="caption" style={styles.kicker}>
        {shop.t('other_options')}
      </AppText>
      <Pressable style={styles.option} onPress={() => navigation.navigate('Promo')}>
        <AppText>{shop.state.couponCode ? shop.state.couponCode : shop.t('use_coupons')}</AppText>
      </Pressable>
      <Pressable style={styles.option} onPress={() => navigation.navigate('Gifts')}>
        <AppText>{gift ? shop.t('gift_card_applied') : shop.t('apply_gift_card')}</AppText>
      </Pressable>
      <Pressable style={styles.option} onPress={() => shop.setUseWallet(!shop.state.useWallet)}>
        <AppText>
          {shop.t('wallet')} · {inr(shop.state.walletBalance)}
        </AppText>
        <AppText color={colors.primary}>
          {shop.state.useWallet ? shop.t('yes') : shop.t('no')}
        </AppText>
      </Pressable>

      <AppText variant="section" style={styles.kicker}>
        {shop.t('price_details')}
      </AppText>
      <PriceRow label={shop.t('item_total')} value={inr(shop.quote.mrpTotal)} />
      <PriceRow label={shop.t('discount_mrp')} value={`- ${inr(shop.quote.saved)}`} valueColor={colors.success} />
      <PriceRow label={shop.t('coupon_discount')} value={`- ${inr(shop.quote.couponDiscount)}`} valueColor={colors.success} />
      <PriceRow label={shop.t('gift_amount')} value={`- ${inr(shop.quote.giftAmount)}`} valueColor={colors.success} />
      <PriceRow label={shop.t('wallet_discount')} value={`- ${inr(shop.quote.walletDiscount)}`} valueColor={colors.success} />
      <PriceRow label={shop.t('shipping_charges')} value={inr(shop.quote.shipping)} />
      <PriceRow label={shop.t('cod_charges')} value={inr(shop.quote.codCharge)} />
      <PriceRow label={shop.t('total')} value={inr(shop.quote.total)} />
      {message ? <AppText color={colors.primary}>{message}</AppText> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  kicker: { marginTop: 16, marginBottom: 8 },
  option: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionOn: { borderColor: colors.primary },
  footer: { padding: 16, backgroundColor: colors.white },
});
