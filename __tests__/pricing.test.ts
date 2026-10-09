import { quoteCart } from '../src/domain/pricing';
import { addLine, applyCoupon, createShopState, getQuote, placeOrder, verifyPending } from '../src/domain/shop';

describe('pricing and shop rules', () => {
  const base = {
    lines: [{ mrp: 100, price: 80, quantity: 2 }],
    couponPercent: 10,
    giftAmount: 20,
    walletBalance: 50,
    useWallet: true,
    paymentMethod: 'cod' as const,
    shippingFee: 40,
    freeShippingOver: 499,
    codCharge: 20,
  };

  test('applies savings, coupon, gift, wallet, shipping, and COD', () => {
    const quote = quoteCart(base);
    expect(quote.itemTotal).toBe(160);
    expect(quote.saved).toBe(40);
    expect(quote.couponDiscount).toBe(16);
    expect(quote.giftAmount).toBe(20);
    expect(quote.walletDiscount).toBe(50);
    expect(quote.shipping).toBe(40);
    expect(quote.codCharge).toBe(20);
    expect(quote.total).toBe(160 - 16 - 20 - 50 + 40 + 20);
  });

  test('drops shipping and COD on an empty cart', () => {
    const quote = quoteCart({ ...base, lines: [], paymentMethod: 'online' });
    expect(quote.total).toBe(0);
    expect(quote.shipping).toBe(0);
    expect(quote.codCharge).toBe(0);
  });

  test('adds a product once, then increases quantity', () => {
    const first = addLine([], 'soap-neem', '75g');
    const second = addLine(first, 'soap-neem', '75g');
    expect(first).toHaveLength(1);
    expect(second[0].quantity).toBe(2);
  });

  test('rejects an unknown coupon and a short OTP', () => {
    const state = createShopState();
    const pending = {
      ...state,
      pending: { purpose: 'login' as const, role: 'customer' as const, phone: '9876543210' },
    };
    expect(applyCoupon(state, 'NOPE').ok).toBe(false);
    expect(verifyPending(pending, '12')).toBe(pending);
    expect(verifyPending(pending, '123456').session.status).toBe('customer');
  });

  test('places an order only for a signed-in shopper', () => {
    const guest = createShopState();
    expect(placeOrder(guest).orders).toHaveLength(guest.orders.length);
    const signedIn = verifyPending(
      { ...guest, pending: { purpose: 'login', role: 'customer', phone: '9876543210' } },
      '123456',
    );
    const next = placeOrder(signedIn);
    expect(next.cart).toHaveLength(0);
    expect(next.orders[0].status).toBe('Placed');
    expect(getQuote(next).itemTotal).toBe(0);
  });
});
