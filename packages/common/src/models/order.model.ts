export interface OrderModel {
  id: number;
  type: 'payment' | 'invite';
  datetime: string;
  amount: string;
  description: string;
}
