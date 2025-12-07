/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api/api';
import type { CustomerRequest, CustomerResponse } from '../types/customer.ts';
import type { ApiError } from '../types/error';

export async function fetchCustomers(): Promise<CustomerResponse[]> {
    const response = await api.get<CustomerResponse[]>('/customers');
    return response.data;
}

export async function createCustomer(customer: CustomerRequest): Promise<CustomerResponse> {
    try {
        const response = await api.post<CustomerResponse>('/customers', customer);
        return response.data;
    } catch (error: any) {
        if (error.response?.data) {
        throw error.response.data as ApiError;
    }
    throw{
        status: 500,
        message: 'Erro desconhecido ao criar cliente.',
        path: '/customers', 
    } as ApiError;
}
}
