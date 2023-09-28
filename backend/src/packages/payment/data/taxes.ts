import { Tax } from 'src/packages/tax/entities/tax.entity';

type TaxTemplate = {
  name: string;
  percentage: number;
  additionalAmount?: number;
};

export const defaultTaxes: TaxTemplate[] = [
  {
    name: 'Local',
    percentage: 5,
  },
  {
    name: 'Stripe fee',
    percentage: 2.9,
    additionalAmount: 0.3,
  },
];
