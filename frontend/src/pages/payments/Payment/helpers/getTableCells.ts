import { Payment } from '../../../../common/packages/payments/types/models/Payment.model';
import { TaxCell } from '../../../../common/packages/payments/types/models/TaxCell.model';
import { Tax } from '../../../../common/packages/tax/types/models/Tax.model';
import { getTax } from 'shared/getTax';
import { getTotal } from 'shared/getTotal';

export const getTableCells = (payment: Payment, taxes: Tax[]): TaxCell[] => {
  const totalTax = {
    percentage: 0,
    additionalAmount: 0,
  };

  taxes.forEach(tax => {
    totalTax.percentage += tax.percentage;
    if (tax.additionalAmount) totalTax.additionalAmount += tax.additionalAmount;
  });

  const total = getTotal(totalTax, payment.amountPaid);
  const taxesCells: TaxCell[] = [];

  taxes.forEach((tax, index) => {
    let rate = `${tax.percentage}%`;
    if (tax.additionalAmount) rate += ` + $${tax.additionalAmount.toFixed(2)}`;
    taxesCells.push({
      id: index,
      type: tax.name,
      rate,
      amount: getTax(total, tax.percentage, tax.additionalAmount),
      classnames: 'text-black text-body-large font-medium',
    });
  });

  let totalRate = `${totalTax.percentage}%`;
  if (totalTax.additionalAmount) totalRate += ` + $${totalTax.additionalAmount.toFixed(2)}`;

  taxesCells.push({
    id: taxes.length,
    type: 'Total payment taxes',
    rate: totalRate,
    amount: getTax(total, totalTax.percentage, totalTax.additionalAmount),
    classnames: 'text-blue text-body-large font-medium',
  });

  taxesCells.push({
    id: taxes.length + 1,
    type: 'Total payment taxes',
    rate: '',
    amount: total - getTax(total, totalTax.percentage, totalTax.additionalAmount),
    classnames: 'text-black text-body-large font-bold',
  });

  return taxesCells;
};
