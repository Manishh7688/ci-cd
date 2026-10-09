import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppText, Button, Screen, SectionHeader } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr, percentOff } from '../../../domain/money';
import { findProduct, findVariant, products } from '../../catalog/data';
import { ProductRail } from '../ProductRail';
import { RootNav, RootStackParamList } from '../../../navigation/types';
import { useProductActions } from '../productActions';

export function ProductDetailScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const actions = useProductActions();
  const product = findProduct(route.params.productId) ?? products[0];
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = findVariant(product, variantId);
  const discount = percentOff(variant.mrp, variant.price);
  const quantity = actions.quantityFor(product.id, variant.id);
  const related = products.filter(
    item => item.categoryId === product.categoryId && item.id !== product.id,
  );

  return (
    <Screen
      title={actions.shop.t('product_detail')}
      onBack={() => navigation.goBack()}
      onCart={() => navigation.navigate('Bag')}
      cartCount={actions.shop.state.cart.length}
      footer={
        <View style={styles.footer}>
          <Button
            label={quantity > 0 ? `${actions.shop.t('view_cart')} (${quantity})` : actions.shop.t('add')}
            onPress={() =>
              quantity > 0
                ? navigation.navigate('Bag')
                : actions.add(product.id, variant.id)
            }
            testID="detail-add"
          />
        </View>
      }>
      <View style={styles.hero}>
        <Image source={product.image} style={styles.image} resizeMode="contain" />
        {discount > 0 ? (
          <View style={styles.off}>
            <AppText color={colors.white}>
              {discount}% {actions.shop.t('off')}
            </AppText>
          </View>
        ) : null}
      </View>
      <AppText variant="section">{product.name}</AppText>
      <View style={styles.priceRow}>
        <AppText variant="title">{inr(variant.price)}</AppText>
        <AppText variant="body" color={colors.gray} style={styles.mrp}>
          {inr(variant.mrp)}
        </AppText>
      </View>
      <AppText variant="caption" style={styles.block}>
        {actions.shop.t('select_unit')}
      </AppText>
      <View style={styles.units}>
        {product.variants.map(item => {
          const selected = item.id === variant.id;
          return (
            <Pressable
              key={item.id}
              style={[styles.unit, selected && styles.unitOn]}
              onPress={() => setVariantId(item.id)}>
              <AppText color={selected ? colors.white : colors.text}>{item.name}</AppText>
            </Pressable>
          );
        })}
      </View>
      <AppText variant="section" style={styles.block}>
        {actions.shop.t('product_details_header')}
      </AppText>
      <AppText>{product.description}</AppText>
      <SectionHeader title={actions.shop.t('you_might_like')} />
      <ProductRail items={related} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  image: { width: '100%', height: 260 },
  off: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 6 },
  mrp: { textDecorationLine: 'line-through', marginBottom: 6 },
  block: { marginTop: 16, marginBottom: 8 },
  units: { flexDirection: 'row', gap: 8 },
  unit: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  unitOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  footer: { padding: 16, backgroundColor: colors.white },
});
