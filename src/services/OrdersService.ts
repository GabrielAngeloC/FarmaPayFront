import { api } from "../api/api";;
import type { OrderRequest, OrderResponse, OrderStatus } from "../types/orders";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchOrders(): Promise<OrderResponse[]> {
  const response = await api.get<OrderResponse[]>("/orders");
  return response.data;
}

export async function fetchOrdersByCustomer(
  customerId: number
): Promise<OrderResponse[]> {
  const response = await api.get<OrderResponse[]>(
    `/orders/by-customer/${customerId}`
  );
  return response.data;
}

export async function createOrder(
  data: OrderRequest
): Promise<OrderResponse> {
  const response = await api.post<OrderResponse>("/orders", data);
  return response.data;
}

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus
): Promise<OrderResponse> {
  const response = await api.put<OrderResponse>(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
}