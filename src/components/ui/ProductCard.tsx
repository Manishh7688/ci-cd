import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Product, findVariant } from '../../features/catalog/data';
import { colors } from '../../design/colors';
import { theme } from '../../design/theme';
import { inr, percentOff } from '../../domain/money';
import { AppText } from './AppText';
import { Icon } from './Icon';

export function ProductCard({
  product,
  quantityFor,
  onQuantity,
  onPress,
  onAdd,
  layout = 'rail',
  addLabel,
  offLabel,
}: {
  product: Product;
  quantityFor: (variantId: string) => number;
  onQuantity: (variantId: string, quantity: number) => void;
  onPress: () => void;
  onAdd: (variantId: string) => void;
  layout?: 'rail' | 'grid';
  addLabel: string;
  offLabel: string;
}) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [open, setOpen] = useState(false);
  const variant = findVariant(product, variantId);
  const quantity = quantityFor(variant.id);
  const discount = percentOff(variant.mrp, variant.price);

  const rail = layout === 'rail';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, rail ? styles.rail : styles.grid]}
      testID={`product-${product.id}`}>
      <View style={styles.photo}>
        <Image
          source={product.image}
          style={rail ? styles.image : styles.imageGrid}
          resizeMode="contain"
        />
        {discount > 0 ? (
          <View style={styles.off}>
            <AppText style={styles.offText}>
              {discount}% {offLabel}
            </AppText>
          </View>
        ) : null}
      </View>
      <AppText numberOfLines={2} style={styles.name}>
        {product.name}
      </AppText>
      <AppText style={styles.price}>{inr(variant.price)}</AppText>
      <View style={styles.row}>
        <Pressable
          onPress={() => setOpen(value => !value)}
          style={styles.type}
          testID={`variant-${product.id}`}>
          <AppText variant="caption" numberOfLines={1} color={colors.gray}>
            {variant.name}
          </AppText>
          <Icon name="chevron" color={colors.gray} size={10} style={styles.typeIcon} />
        </Pressable>
        {quantity > 0 ? (
          <View style={styles.stepper}>
            <Pressable
              accessibilityRole="button"
              onPress={() => onQuantity(variant.id, quantity - 1)}
              testID={`minus-${product.id}`}>
              <Icon name="minus" color={colors.brown} size={14} />
            </Pressable>
            <AppText style={styles.qty}>{quantity}</AppText>
            <Pressable
              accessibilityRole="button"
              onPress={() => onQuantity(variant.id, quantity + 1)}
              testID={`plus-${product.id}`}>
              <Icon name="plus" color={colors.brown} size={14} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            style={styles.add}
            onPress={() => onAdd(variant.id)}
            testID={`add-${product.id}`}>
            <AppText style={styles.addText}>{addLabel}</AppText>
          </Pressable>
        )}
      </View>
      {open ? (
        <View style={styles.menu}>
          {product.variants.map(item => (
            <Pressable
              key={item.id}
              onPress={() => {
                setVariantId(item.id);
                setOpen(false);
              }}>
              <AppText variant="caption">{item.name}</AppText>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
  rail: { width: 150, marginRight: 12 },
  grid: {
    width: '48%',
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 8,
    ...theme.shadow.card,
  },
  photo: { position: 'relative' },
  image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
  },
  imageGrid: {
    width: '100%',
    height: 140,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
  },
  name: {
    height: 40,
    marginTop: 4,
    fontWeight: '700',
    color: colors.text,
    fontSize: 13,
  },
  price: { fontWeight: '600', color: colors.text, marginTop: 2 },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 72,
  },
  typeIcon: { transform: [{ rotate: '90deg' }], marginLeft: 2 },
  add: {
    width: 70,
    height: 28,
    borderWidth: 1,
    borderColor: '#D71828',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { fontWeight: '700', color: colors.brown, fontSize: 12 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
    height: 28,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  qty: { fontWeight: '700', color: colors.brown },
  off: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  offText: { color: colors.white, fontSize: 11, fontWeight: '600' },
  menu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 5,
    padding: 6,
    gap: 6,
    backgroundColor: colors.white,
  },
});
