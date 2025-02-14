import axios from 'axios';
import { mockProducts } from './mockData';

const createAPI = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

// Create API instances for each service
export const userAPI = createAPI('http://localhost:3001/api');
export const productAPI = createAPI('http://localhost:3002/api');
export const orderAPI = createAPI('http://localhost:3003/api');
export const paymentAPI = createAPI('http://localhost:3004/api');

// Auth Service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await userAPI.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await userAPI.post('/users', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await userAPI.get('/users/profile');
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await userAPI.put('/users/profile', profileData);
    return response.data;
  },
};

// Product Service
export const productService = {
  getProducts: async () => {
    // For now, return mock data instead of making API call
    return Promise.resolve(mockProducts);
  },
  getProduct: async (id: number) => {
    // Find product in mock data
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return Promise.resolve(product);
  },
  createProduct: async (productData: any) => {
    // Mock create product
    return Promise.resolve({ ...productData, id: Math.random() });
  },
};

// Order Service
export const orderService = {
  createOrder: async (orderData: any) => {
    // Mock successful order creation
    return Promise.resolve({
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user123',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      paymentStatus: 'paid',
    });
  },
  getOrder: async (id: number) => {
    // Mock order data
    return Promise.resolve({
      id,
      userId: 'user123',
      items: [],
      totalAmount: 0,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });
  },
  getUserOrders: async (_userId: string) => {
    // Mock user orders - using _userId to indicate intentionally unused parameter
    return Promise.resolve([]);
  },
};

// Payment Service
export const paymentService = {
  processPayment: async (paymentData: any) => {
    // Mock successful payment response
    return Promise.resolve({
      success: true,
      transactionId: `TRANS_${Math.random().toString(36).substr(2, 9)}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: 'completed',
      timestamp: new Date().toISOString(),
      clientSecret: `secret_${Math.random().toString(36).substr(2, 9)}`,
    });
  },
}; 