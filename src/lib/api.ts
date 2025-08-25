const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
  errors?: string[];
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'buyer' | 'supplier';
  companyName?: string;
  businessType?: string;
  phone?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'supplier' | 'admin';
  companyName?: string;
  businessType?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  isVerified: boolean;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private isBackendAvailable: boolean | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');

    // Clear any old localStorage demo data on initialization
    this.clearLocalStorageData();
  }

  private async checkBackendAvailability(): Promise<boolean> {
    if (this.isBackendAvailable !== null) {
      return this.isBackendAvailable;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.isBackendAvailable = response.ok;
      console.log('✅ MongoDB Backend connected successfully!');
    } catch (error) {
      this.isBackendAvailable = false;
      console.warn('⚠️ MongoDB Backend not available. Is the server running on localhost:5000?');
    }

    return this.isBackendAvailable;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    const response = await this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    const response = await this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      // Still allow logout even if backend is down
      this.setToken(null);
      return {
        success: true,
        message: 'Logged out locally'
      };
    }

    try {
      const response = await this.request('/auth/logout', {
        method: 'POST',
      });
      
      this.setToken(null);
      return response;
    } catch (error) {
      // Even if the request fails, clear local token
      this.setToken(null);
      throw error;
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request<User>('/auth/me');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Product management endpoints
  async getProducts(filters?: any): Promise<ApiResponse<any[]>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    const params = new URLSearchParams(filters);
    return this.request(`/products?${params.toString()}`);
  }

  async getProduct(id: string): Promise<ApiResponse<any>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any): Promise<ApiResponse<any>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any): Promise<ApiResponse<any>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string): Promise<ApiResponse> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyProducts(filters?: any): Promise<ApiResponse<any[]>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    const params = new URLSearchParams(filters);
    return this.request(`/products/my/products?${params.toString()}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request('/products/categories');
  }

  // Health check
  async checkHealth(): Promise<ApiResponse> {
    const isBackendAvailable = await this.checkBackendAvailability();

    if (!isBackendAvailable) {
      throw new Error('Backend server not available. Please start the MongoDB backend server first.\n\nRun: cd backend && npm run dev');
    }

    return this.request('/health');
  }

  // Method to clear any localStorage demo data
  clearLocalStorageData(): void {
    const hadDemoData = localStorage.getItem('demo_users') || localStorage.getItem('demo_current_user');
    localStorage.removeItem('demo_users');
    localStorage.removeItem('demo_current_user');
    if (hadDemoData) {
      console.log('🗑️ Cleared localStorage demo data - now using MongoDB backend');
    }
  }
}

export const apiClient = new ApiClient();
export type { User, LoginCredentials, RegisterData, ApiResponse };
