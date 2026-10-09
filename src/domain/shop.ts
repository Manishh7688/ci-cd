import {
  type Address,
  Coupon,
  Order,
  coupons,
  findProduct,
  findVariant,
  gifts,
  seedAddresses,
  seedOrders,
  seedTransactions,
  WalletTxn,
} from '../features/catalog/data';
import { quoteCart, PriceQuote } from './pricing';
import { appConfig } from '../security/config';
import { Language } from '../i18n/translate';
import { validateOtp } from '../security/validation';

export type { Address };

export type Role = 'customer' | 'vendor';

export type Session =
  | { status: 'guest' }
  | { status: 'customer'; name: string; phone: string }
  | { status: 'vendor'; name: string; phone: string; shopName: string };

export type CartLine = {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
};

export type CustomerDraft = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referral: string;
};

export type VendorDraft = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shopName: string;
  storeCode: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  gst: string;
};

export type PendingAuth =
  | { purpose: 'login'; role: Role; phone: string }
  | { purpose: 'register-customer'; draft: CustomerDraft }
  | { purpose: 'register-vendor'; draft: VendorDraft };

export type ShopState = {
  language: Language;
  location: { state: string; city: string } | null;
  session: Session;
  pending: PendingAuth | null;
  cart: CartLine[];
  wishlistIds: string[];
  couponCode: string | null;
  giftId: string | null;
  useWallet: boolean;
  paymentMethod: 'online' | 'cod';
  addresses: Address[];
  addressId: string;
  orders: Order[];
  walletBalance: number;
  transactions: WalletTxn[];
};

export function createShopState(): ShopState {
  return {
    language: 'en',
    location: null,
    session: { status: 'guest' },
    pending: null,
    cart: [
      { id: 'soap-neem:75g', productId: 'soap-neem', variantId: '75g', quantity: 2 },
    ],
    wishlistIds: ['tea-masala'],
    couponCode: null,
    giftId: null,
    useWallet: false,
    paymentMethod: 'online',
    addresses: seedAddresses,
    addressId: seedAddresses[0].id,
    orders: seedOrders,
    walletBalance: 120,
    transactions: seedTransactions,
  };
}

export function lineId(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function addLine(cart: CartLine[], productId: string, variantId: string): CartLine[] {
  const product = findProduct(productId);
  if (!product) {
    return cart;
  }
  const variant = findVariant(product, variantId);
  const id = lineId(product.id, variant.id);
  const existing = cart.find(line => line.id === id);
  if (!existing) {
    return [...cart, { id, productId: product.id, variantId: variant.id, quantity: variant.minQty }];
  }
  return cart.map(line =>
    line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
  );
}

export function setLineQuantity(cart: CartLine[], id: string, quantity: number): CartLine[] {
  if (quantity <= 0) {
    return cart.filter(line => line.id !== id);
  }
  return cart.map(line => (line.id === id ? { ...line, quantity } : line));
}

export function toggleWishlist(ids: string[], productId: string): string[] {
  return ids.includes(productId)
    ? ids.filter(id => id !== productId)
    : [...ids, productId];
}

export function findCoupon(code: string | null): Coupon | undefined {
  if (!code) {
    return undefined;
  }
  return coupons.find(coupon => coupon.code === code);
}

export function selectedAddress(state: ShopState): Address {
  return (
    state.addresses.find(item => item.id === state.addressId) ?? state.addresses[0]
  );
}

export function cartLinesForQuote(cart: CartLine[]) {
  return cart.flatMap(line => {
    const product = findProduct(line.productId);
    if (!product) {
      return [];
    }
    const variant = findVariant(product, line.variantId);
    return [{ mrp: variant.mrp, price: variant.price, quantity: line.quantity }];
  });
}

export function getQuote(state: ShopState): PriceQuote {
  const lines = cartLinesForQuote(state.cart);
  const itemTotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const coupon = findCoupon(state.couponCode);
  const couponPercent =
    coupon && itemTotal >= coupon.minCart ? coupon.percent : 0;
  const gift = gifts.find(item => item.id === state.giftId);
  return quoteCart({
    lines,
    couponPercent,
    giftAmount: gift?.price ?? 0,
    walletBalance: state.walletBalance,
    useWallet: state.useWallet,
    paymentMethod: state.paymentMethod,
    shippingFee: appConfig.shipping,
    freeShippingOver: appConfig.freeShippingOver,
    codCharge: appConfig.codCharge,
  });
}

export function applyCoupon(
  state: ShopState,
  code: string,
): { state: ShopState; ok: boolean } {
  const coupon = findCoupon(code);
  if (!coupon) {
    return { state, ok: false };
  }
  const itemTotal = cartLinesForQuote(state.cart).reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  if (itemTotal < coupon.minCart) {
    return { state, ok: false };
  }
  return { state: { ...state, couponCode: coupon.code }, ok: true };
}

export function placeOrder(state: ShopState): ShopState {
  if (state.cart.length === 0 || state.session.status === 'guest') {
    return state;
  }
  const quote = getQuote(state);
  const address = selectedAddress(state);
  const order: Order = {
    id: `SG${10422 + state.orders.length}`,
    placedOn: '08 Oct 2026',
    status: 'Placed',
    items: state.cart.flatMap(line => {
      const product = findProduct(line.productId);
      if (!product) {
        return [];
      }
      const variant = findVariant(product, line.variantId);
      return [{ name: product.name, quantity: line.quantity, price: variant.price }];
    }),
    total: quote.total,
    payment: state.paymentMethod === 'cod' ? 'COD' : 'Online',
    address: `${address.line}, ${address.city}, ${address.state} ${address.pincode}`,
  };
  const nextBalance = state.walletBalance - quote.walletDiscount;
  const nextTransactions =
    quote.walletDiscount > 0
      ? [
          {
            id: `w-${order.id}`,
            title: 'purchase' as const,
            amount: quote.walletDiscount,
            date: order.placedOn,
          },
          ...state.transactions,
        ]
      : state.transactions;
  return {
    ...state,
    cart: [],
    couponCode: null,
    giftId: null,
    useWallet: false,
    orders: [order, ...state.orders],
    walletBalance: nextBalance,
    transactions: nextTransactions,
  };
}

export function verifyPending(state: ShopState, code: string): ShopState {
  if (!state.pending || validateOtp(code) || appConfig.authMode !== 'design') {
    return state;
  }
  const pending = state.pending;
  if (pending.purpose === 'login') {
    const session: Session =
      pending.role === 'vendor'
        ? {
            status: 'vendor',
            name: 'Vendor',
            phone: pending.phone,
            shopName: 'My Shop',
          }
        : { status: 'customer', name: 'Guest', phone: pending.phone };
    return { ...state, pending: null, session };
  }
  if (pending.purpose === 'register-customer') {
    return {
      ...state,
      pending: null,
      session: {
        status: 'customer',
        name: `${pending.draft.firstName} ${pending.draft.lastName}`,
        phone: pending.draft.phone,
      },
    };
  }
  return {
    ...state,
    pending: null,
    session: {
      status: 'vendor',
      name: `${pending.draft.firstName} ${pending.draft.lastName}`,
      phone: pending.draft.phone,
      shopName: pending.draft.shopName,
    },
  };
}

export function quantityFor(
  cart: CartLine[],
  productId: string,
  variantId: string,
): number {
  return cart.find(line => line.id === lineId(productId, variantId))?.quantity ?? 0;
}
