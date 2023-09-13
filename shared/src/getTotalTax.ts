import { Tax } from 'packages/tax/Tax';

export const getTotalTax = (taxes: Tax[]) => {
  const totalTax = {
    percentage: 0,
    additionalAmount: 0,
  };

  taxes.forEach(tax => {
    totalTax.percentage += tax.percentage;
    if (tax.additionalAmount) totalTax.additionalAmount += tax.additionalAmount;
  });

  return totalTax;
};
