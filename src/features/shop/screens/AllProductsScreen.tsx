import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppText, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { categories, products } from '../../catalog/data';
import { ProductRail } from '../ProductRail';
import { RootNav, RootStackParamList } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function AllProductsScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'AllProducts'>>();
  const { state, t } = useShop();
  const [categoryId, setCategoryId] = useState(route.params?.categoryId ?? 'all');
  const items =
    categoryId === 'all'
      ? products
      : products.filter(item => item.categoryId === categoryId);
  const title =
    categories.find(item => item.id === categoryId)?.name ?? t('oswal_products');

  return (
    <Screen
      title={title}
      onBack={() => navigation.goBack()}
      onCart={() => navigation.navigate('Bag')}
      cartCount={state.cart.length}>
      <AppText variant="caption" style={styles.count}>
        {items.length} {t('products_suffix')}
      </AppText>
      <View style={styles.chips}>
        <Pressable
          style={[styles.chip, categoryId === 'all' && styles.chipOn]}
          onPress={() => setCategoryId('all')}>
          <AppText color={categoryId === 'all' ? colors.white : colors.text}>{t('offer')}</AppText>
        </Pressable>
        {categories.map(category => {
          const selected = category.id === categoryId;
          return (
            <Pressable
              key={category.id}
              style={[styles.chip, selected && styles.chipOn]}
              onPress={() => setCategoryId(category.id)}>
              <AppText color={selected ? colors.white : colors.text}>{category.name}</AppText>
            </Pressable>
          );
        })}
      </View>
      <ProductRail items={items} layout="grid" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  count: { marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
});
