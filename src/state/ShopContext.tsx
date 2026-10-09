import React, { createContext, useContext, useMemo, useState } from 'react';
import { CopyKey, translate } from '../i18n/translate';
import {
  Address,
  CustomerDraft,
  PendingAuth,
  Role,
  ShopState,
  VendorDraft,
  addLine,
  applyCoupon,
  createShopState,
  getQuote,
  placeOrder,
  selectedAddress,
  setLineQuantity,
  toggleWishlist,
  verifyPending,
} from '../domain/shop';
import { PriceQuote } from '../domain/pricing';

type ShopApi = {
  state: ShopState;
  t: (key: CopyKey) => string;
  quote: PriceQuote;
  address: Address;
  setLanguage: (language: ShopState['language']) => void;
  setLocation: (location: { state: string; city: string }) => void;
  beginLogin: (phone: string, role: Role) => void;
  beginCustomerRegister: (draft: CustomerDraft) => void;
  beginVendorRegister: (draft: VendorDraft) => void;
  verifyOtp: (code: string) => boolean;
  clearPending: () => void;
  logout: () => void;
  addToCart: (productId: string, variantId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  toggleWish: (productId: string) => void;
  tryCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  selectGift: (giftId: string | null) => void;
  setUseWallet: (enabled: boolean) => void;
  setPaymentMethod: (method: ShopState['paymentMethod']) => void;
  selectAddress: (addressId: string) => void;
  saveAddress: (address: Address) => void;
  checkout: () => string | null;
  cancelOrder: (orderId: string) => void;
};

const ShopContext = createContext<ShopApi | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ShopState>(createShopState);

  const api = useMemo<ShopApi>(() => {
    const patch = (recipe: (current: ShopState) => ShopState) => {
      setState(recipe);
    };
    return {
      state,
      t: key => translate(state.language, key),
      quote: getQuote(state),
      address: selectedAddress(state),
      setLanguage: language => patch(current => ({ ...current, language })),
      setLocation: location => patch(current => ({ ...current, location })),
      beginLogin: (phone, role) =>
        patch(current => ({
          ...current,
          pending: { purpose: 'login', role, phone } satisfies PendingAuth,
        })),
      beginCustomerRegister: draft =>
        patch(current => ({
          ...current,
          pending: { purpose: 'register-customer', draft },
        })),
      beginVendorRegister: draft =>
        patch(current => ({
          ...current,
          pending: { purpose: 'register-vendor', draft },
        })),
      verifyOtp: code => {
        const next = verifyPending(state, code);
        const ok = next !== state && next.pending === null;
        if (ok) {
          setState(next);
        }
        return ok;
      },
      clearPending: () => patch(current => ({ ...current, pending: null })),
      logout: () =>
        patch(current => ({
          ...current,
          session: { status: 'guest' },
          pending: null,
        })),
      addToCart: (productId, variantId) =>
        patch(current => ({
          ...current,
          cart: addLine(current.cart, productId, variantId),
        })),
      setQuantity: (id, quantity) =>
        patch(current => ({
          ...current,
          cart: setLineQuantity(current.cart, id, quantity),
        })),
      toggleWish: productId =>
        patch(current => ({
          ...current,
          wishlistIds: toggleWishlist(current.wishlistIds, productId),
        })),
      tryCoupon: code => {
        const result = applyCoupon(state, code);
        if (result.ok) {
          setState(result.state);
        }
        return result.ok;
      },
      clearCoupon: () => patch(current => ({ ...current, couponCode: null })),
      selectGift: giftId => patch(current => ({ ...current, giftId })),
      setUseWallet: useWallet => patch(current => ({ ...current, useWallet })),
      setPaymentMethod: paymentMethod =>
        patch(current => ({ ...current, paymentMethod })),
      selectAddress: addressId => patch(current => ({ ...current, addressId })),
      saveAddress: address =>
        patch(current => ({
          ...current,
          addresses: [
            address,
            ...current.addresses.filter(item => item.id !== address.id),
          ],
          addressId: address.id,
        })),
      checkout: () => {
        if (state.cart.length === 0 || state.session.status === 'guest') {
          return null;
        }
        const next = placeOrder(state);
        const orderId = next.orders[0]?.id ?? null;
        setState(next);
        return orderId;
      },
      cancelOrder: orderId =>
        patch(current => ({
          ...current,
          orders: current.orders.map(order =>
            order.id === orderId && order.status !== 'Delivered'
              ? { ...order, status: 'Cancelled' }
              : order,
          ),
        })),
    };
  }, [state]);

  return <ShopContext.Provider value={api}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopApi {
  const value = useContext(ShopContext);
  if (!value) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return value;
}
