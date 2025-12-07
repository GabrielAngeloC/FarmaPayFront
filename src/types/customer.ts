export interface CustomerResponse {
    id: string;
    name: string;
    email: string;
    document?: string;
}

export interface CustomerRequest {
    name: string;
    email: string;
    document?: string;
}