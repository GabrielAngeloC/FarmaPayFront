import { api } from "../api/api";
import type {
  PaymentRequest,
  PaymentResponse,
} from "../types/payment";

export async function fetchPayments(): Promise<PaymentResponse[]> {
  const response = await api.get<PaymentResponse[]>("/payment");
  return response.data;
}

export async function createPayment(
  data: PaymentRequest
): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>("/payment", data);
  return response.data;
}

export async function fetchPaymentByOrderId(
  orderId: number
): Promise<PaymentResponse> {
  const response = await api.get<PaymentResponse>(`/payment/by-order/${orderId}`);
  return response.data;
}
