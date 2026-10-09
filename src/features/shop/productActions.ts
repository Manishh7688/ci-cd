import { useNavigation } from '@react-navigation/native';
import { lineId, quantityFor } from '../../domain/shop';
import { RootNav } from '../../navigation/types';
import { useShop } from '../../state/ShopContext';

export function useProductActions() {
  const shop = useShop();
  const navigation = useNavigation<RootNav>();
  return {
    shop,
    navigation,
    quantityFor: (productId: string, variantId: string) =>
      quantityFor(shop.state.cart, productId, variantId),
    add: (productId: string, variantId: string) => shop.addToCart(productId, variantId),
    change: (productId: string, variantId: string, quantity: number) =>
      shop.setQuantity(lineId(productId, variantId), quantity),
    open: (productId: string) => navigation.navigate('ProductDetail', { productId }),
  };
}
