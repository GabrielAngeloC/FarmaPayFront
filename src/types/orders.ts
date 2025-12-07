export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface OrderRequest {
    customerId: number;
    amount: number;
}

export interface OrderResponse {
    id: number;
    customerId: number;
    customerName: string;
    customerEmail: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
}