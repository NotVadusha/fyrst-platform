import { TotalTax } from 'getTotal';
import { Tax } from 'packages/tax/Tax';

export const getTotalTax = (taxes: Tax[]) => {
  return taxes.reduce(
    (totalTax: TotalTax, tax: Tax): TotalTax => {
      totalTax.percentage += tax.percentage;
      if (tax.additionalAmount) totalTax.additionalAmount += tax.additionalAmount;
      return totalTax;
    },
    {
      percentage: 0,
      additionalAmount: 0,
    },
  );
};
