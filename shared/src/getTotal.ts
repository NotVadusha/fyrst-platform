export type TotalTax = {
  percentage: number;
  additionalAmount: number;
};

export const getTotal = (totalTax: TotalTax, amountPaid: number): number => {
  return (amountPaid + totalTax.additionalAmount) / (1 - totalTax.percentage / 100);
};
