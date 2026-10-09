import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ProductCard } from '../../components/ui';
import { Product } from '../catalog/data';
import { useProductActions } from './productActions';

export function ProductRail({
  items,
  layout = 'rail',
}: {
  items: Product[];
  layout?: 'rail' | 'grid';
}) {
  const actions = useProductActions();
  const cards = items.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      layout={layout}
      addLabel={actions.shop.t('add')}
      offLabel={actions.shop.t('off')}
      quantityFor={variantId => actions.quantityFor(product.id, variantId)}
      onAdd={variantId => actions.add(product.id, variantId)}
      onQuantity={(variantId, quantity) =>
        actions.change(product.id, variantId, quantity)
      }
      onPress={() => actions.open(product.id)}
    />
  ));

  if (layout === 'grid') {
    return <View style={styles.grid}>{cards}</View>;
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cards}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
