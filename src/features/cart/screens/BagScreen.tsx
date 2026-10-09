import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, EmptyState, PriceRow, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { findProduct, findVariant } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function BagScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const signedIn = shop.state.session.status !== 'guest';

  return (
    <Screen
      title={shop.t('shopping_bag')}
      onBack={() => navigation.goBack()}
      footer={
        shop.state.cart.length > 0 ? (
          <View style={styles.footer}>
            <Button
              label={signedIn ? shop.t('proceed_checkout') : shop.t('login_proceed')}
              onPress={() => navigation.navigate(signedIn ? 'Payment' : 'Login')}
              testID="bag-checkout"
            />
          </View>
        ) : null
      }>
      <View style={styles.gift}>
        <AppText>{shop.t('surprise_gift_msg')}</AppText>
      </View>
      {shop.state.cart.length === 0 ? (
        <EmptyState title={shop.t('shopping_bag')} action={shop.t('explore_more')} onAction={() => navigation.navigate('Main')} />
      ) : (
        shop.state.cart.map(line => {
          const product = findProduct(line.productId);
          if (!product) {
            return null;
          }
          const variant = findVariant(product, line.variantId);
          return (
            <View key={line.id} style={styles.line}>
              <Image source={product.image} style={styles.image} resizeMode="contain" />
              <View style={styles.copy}>
                <AppText numberOfLines={2}>{product.name}</AppText>
                <AppText variant="caption">{variant.name}</AppText>
                <AppText variant="price">{inr(variant.price)}</AppText>
                <View style={styles.stepper}>
                  <Pressable
                    accessibilityRole="button"
                    style={styles.step}
                    onPress={() => shop.setQuantity(line.id, line.quantity - 1)}>
                    <AppText>−</AppText>
                  </Pressable>
                  <AppText>{line.quantity}</AppText>
                  <Pressable
                    accessibilityRole="button"
                    style={styles.step}
                    onPress={() => shop.setQuantity(line.id, line.quantity + 1)}>
                    <AppText>+</AppText>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })
      )}
      <AppText variant="section" style={styles.heading}>
        {shop.t('cart_details')}
      </AppText>
      <PriceRow label={shop.t('item_total')} value={inr(shop.quote.itemTotal)} />
      <PriceRow label={shop.t('saved')} value={inr(shop.quote.saved)} valueColor={colors.success} />
      <PriceRow label={shop.t('total')} value={inr(shop.quote.total)} />
      <View style={styles.address}>
        <AppText variant="section">{shop.t('delivery_to')}</AppText>
        <AppText>
          {shop.address.name}, {shop.address.line}, {shop.address.city}
        </AppText>
        <Button label={shop.t('change')} variant="outline" onPress={() => navigation.navigate('Map')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gift: {
    backgroundColor: colors.soft,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  line: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  copy: { flex: 1, gap: 4 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 96,
    height: 28,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  step: { minWidth: 18, alignItems: 'center' },
  heading: { marginTop: 8, marginBottom: 4 },
  address: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  footer: { padding: 16, backgroundColor: colors.white },
});
