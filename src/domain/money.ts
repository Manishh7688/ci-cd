export function inr(value: number): string {
  const rounded = Math.round(value);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

export function percentOff(mrp: number, price: number): number {
  if (mrp <= price || mrp <= 0) {
    return 0;
  }
  return Math.round(((mrp - price) / mrp) * 100);
}
