export interface fieldError {
    field: string;
    message: string;
}

export interface ApiError {
    status: number;
    message?: string;
    path?: string;
    timestamp?: string;
    errors?: fieldError[];
}