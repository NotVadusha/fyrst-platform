import { DropdownOption } from '../../../common/components/ui/common/Dropdown/Dropdown';

export const getPaymentData = () => {
  return [
    {
      id: 1,
      date: '09/07/2021',
      worker: 'John Brown',
      amountPaid: 1273,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Completed',
    },
    {
      id: 2,
      date: '25/07/2021',
      worker: 'Mike Dors',
      amountPaid: 579.44,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Completed',
    },
    {
      id: 3,
      date: '28/07/2021',
      worker: 'Linda Moon',
      amountPaid: 5793,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Pending',
    },
    {
      id: 4,
      date: '20/07/2021',
      worker: 'Linda Moon',
      amountPaid: 5783,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Completed',
    },
    {
      date: '15/07/2021',
      worker: 'Serj Potter',
      amountPaid: 375,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Pending',
    },
    {
      id: 5,
      date: '16/07/2021',
      worker: 'Serj Potter',
      amountPaid: 375,
      type: 'Stripe',
      instapayPercentage: 100,
      status: 'Failed',
    },
  ];
};

export const workerOptions: DropdownOption[] = [
  { label: 'John Brown', value: 'John Brown' },
  { label: 'Mike Dors', value: 'Mike Dors' },
  { label: 'Linda Moon', value: 'Linda Moon' },
  { label: 'Serj Potter', value: 'Serj Potter' },
];
