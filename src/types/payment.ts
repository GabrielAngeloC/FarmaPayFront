export type PaymentMethod = 'CREDIT_CARD' | 'BOLETO' | 'PIX';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface PaymentRequest {
  orderId: number;
  amountPaid: number;
  method: PaymentMethod;
}

export interface PaymentResponse {
  id: number;
  orderId: number;
  customerId: number;
  customerName: string;
  orderAmount: number;
  amountPaid: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string;
}