export type OrderStatus = 'APROVED' | 'PENDING' | 'CANCELED';

export interface OrderRequest {
    customerId: number;
    total: number;
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