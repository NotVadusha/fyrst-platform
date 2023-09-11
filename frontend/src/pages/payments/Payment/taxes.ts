import { Tax } from 'src/common/packages/payments/types/models/Tax.model';

export const getTaxes = (total: number): Tax[] => [
  {
    id: 1,
    type: 'Local',
    rate: '5%',
    amount: total * 0.05,
    classnames: 'text-black text-body-large font-medium',
  },
  {
    id: 2,
    type: 'Stripe fee',
    rate: '2.9% + $0.30',
    amount: total * 0.029 + 0.3,
    classnames: 'text-black text-body-large font-medium',
  },
  {
    id: 3,
    type: 'Total payment taxes',
    rate: '7.9% + $0.30',
    amount: total * 0.079 + 0.3,
    classnames: 'text-blue text-body-large font-medium',
  },
  {
    id: 4,
    type: 'Payment after taxes',
    rate: '',
    amount: total - (total * 0.079 + 0.3),
    classnames: 'text-black text-body-large font-bold',
  },
];
