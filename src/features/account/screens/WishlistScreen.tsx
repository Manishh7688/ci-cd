import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, EmptyState, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { products } from '../../catalog/data';
import { TabNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function WishlistScreen() {
  const navigation = useNavigation<TabNav>();
  const shop = useShop();
  const items = products.filter(product => shop.state.wishlistIds.includes(product.id));

  return (
    <Screen
      title={shop.t('wishlist')}
      onCart={() => navigation.navigate('Bag')}
      cartCount={shop.state.cart.length}
      tabBar>
      {items.length === 0 ? (
        <EmptyState
          title={shop.t('wishlist')}
          action={shop.t('explore_more')}
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        items.map(product => (
          <View key={product.id} style={styles.row}>
            <Pressable onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}>
              <Image source={product.image} style={styles.image} resizeMode="contain" />
            </Pressable>
            <View style={styles.copy}>
              <AppText numberOfLines={2} style={styles.name}>
                {product.name}
              </AppText>
              <AppText style={styles.price}>{inr(product.variants[0].price)}</AppText>
              <Pressable
                style={styles.move}
                onPress={() => {
                  shop.addToCart(product.id, product.variants[0].id);
                  shop.toggleWish(product.id);
                }}>
                <AppText style={styles.moveText}>{shop.t('move_to_cart')}</AppText>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 10,
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
  copy: { flex: 1, justifyContent: 'center', gap: 4 },
  name: { fontWeight: '700', color: colors.brown },
  price: { fontWeight: '700' },
  move: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveText: { color: colors.brown, fontWeight: '700', fontSize: 12 },
});
