export type PriceLine = {
  mrp: number;
  price: number;
  quantity: number;
};

export type PriceInput = {
  lines: PriceLine[];
  couponPercent: number;
  giftAmount: number;
  walletBalance: number;
  useWallet: boolean;
  paymentMethod: 'online' | 'cod';
  shippingFee: number;
  freeShippingOver: number;
  codCharge: number;
};

export type PriceQuote = {
  itemTotal: number;
  mrpTotal: number;
  saved: number;
  couponDiscount: number;
  giftAmount: number;
  walletDiscount: number;
  shipping: number;
  codCharge: number;
  total: number;
};

function sum(lines: PriceLine[], pick: (line: PriceLine) => number): number {
  return lines.reduce(
    (total, line) => total + pick(line) * Math.max(0, line.quantity),
    0,
  );
}

export function quoteCart(input: PriceInput): PriceQuote {
  const itemTotal = sum(input.lines, line => line.price);
  const mrpTotal = sum(input.lines, line => line.mrp);
  const saved = Math.max(0, mrpTotal - itemTotal);
  const couponDiscount =
    itemTotal > 0
      ? Math.min(
          itemTotal,
          Math.round((itemTotal * Math.max(0, input.couponPercent)) / 100),
        )
      : 0;
  const afterCoupon = itemTotal - couponDiscount;
  const giftAmount = Math.min(Math.max(0, input.giftAmount), afterCoupon);
  const afterGift = afterCoupon - giftAmount;
  const walletDiscount = input.useWallet
    ? Math.min(Math.max(0, input.walletBalance), afterGift)
    : 0;
  const shipping =
    itemTotal === 0 || itemTotal >= input.freeShippingOver
      ? 0
      : input.shippingFee;
  const codCharge =
    input.paymentMethod === 'cod' && itemTotal > 0 ? input.codCharge : 0;
  const total = afterGift - walletDiscount + shipping + codCharge;

  return {
    itemTotal,
    mrpTotal,
    saved,
    couponDiscount,
    giftAmount,
    walletDiscount,
    shipping,
    codCharge,
    total,
  };
}
