export interface Tax {
  id: number;
  name: string;
  percentage: number;
  additionalAmount?: number;
  paymentId: number;
}
