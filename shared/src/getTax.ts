export const getTax = (
  total: number,
  percentage: number,
  additionalAmount: number | undefined,
): number => (total / 100) * percentage + (additionalAmount ?? 0);
