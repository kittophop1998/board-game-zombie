import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosProgressEvent
} from 'axios';

// Types for API responses
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
    status: number;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
}

export interface ErrorResponseData {
    message?: string;
    code?: string;
}

// Base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp
        config.metadata = { startTime: new Date() };

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const duration = response.config.metadata
            ? new Date().getTime() - response.config.metadata.startTime.getTime()
            : 0;

        console.log(
            `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`
        );

        return response;
    },
    (error: AxiosError) => {
        const duration = error.config?.metadata
            ? new Date().getTime() - error.config.metadata.startTime.getTime()
            : 0;

        console.error(
            `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`,
            error.response?.status,
            error.message
        );

        // Handle different error scenarios
        if (error.response?.status === 401) {
            // Handle unauthorized - redirect to login or refresh token
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                // You can add redirect logic here
                // window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

// Generic API methods
class ApiService {
    // GET request
    static async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.get<T>(url, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'Success',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // POST request
    static async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.post<T>(url, data, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'Success',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // PUT request
    static async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.put<T>(url, data, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'Success',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // PATCH request
    static async patch<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.patch<T>(url, data, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'Success',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // DELETE request
    static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.delete<T>(url, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'Success',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // Upload file
    static async uploadFile<T>(
        url: string,
        file: File,
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
        additionalData?: Record<string, string | number | boolean>
    ): Promise<ApiResponse<T>> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            if (additionalData) {
                Object.keys(additionalData).forEach(key => {
                    formData.append(key, String(additionalData[key]));
                });
            }

            const config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            };

            const response = await apiClient.post<T>(url, formData, config);
            return {
                data: response.data,
                success: true,
                status: response.status,
                message: 'File uploaded successfully',
            };
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    // Error handler
    private static handleError(error: AxiosError): ApiError {
        if (error.response) {
            // Server responded with error status
            const errorData = error.response.data as ErrorResponseData;
            return {
                message: errorData?.message || error.message || 'An error occurred',
                status: error.response.status,
                code: errorData?.code,
            };
        } else if (error.request) {
            // Network error
            return {
                message: 'Network error - please check your connection',
                status: 0,
                code: 'NETWORK_ERROR',
            };
        } else {
            // Other error
            return {
                message: error.message || 'An unexpected error occurred',
                status: 0,
                code: 'UNKNOWN_ERROR',
            };
        }
    }

    // Set auth token
    static setAuthToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', token);
        }
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Remove auth token
    static removeAuthToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
        }
        delete apiClient.defaults.headers.common['Authorization'];
    }

    // Get current auth token
    static getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('authToken');
        }
        return null;
    }
}

// Export both the instance and the service class
export { apiClient };
export default ApiService;

// Extend the AxiosRequestConfig interface for metadata
declare module 'axios' {
    interface AxiosRequestConfig {
        metadata?: {
            startTime: Date;
        };
    }
}