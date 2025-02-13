import axios from 'axios';

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
    const response = await productAPI.get('/products');
    return response.data;
  },
  getProduct: async (id: number) => {
    const response = await productAPI.get(`/products/${id}`);
    return response.data;
  },
  createProduct: async (productData: any) => {
    const response = await productAPI.post('/products', productData);
    return response.data;
  },
};

// Order Service
export const orderService = {
  createOrder: async (orderData: any) => {
    const response = await orderAPI.post('/orders', orderData);
    return response.data;
  },
  getOrder: async (id: number) => {
    const response = await orderAPI.get(`/orders/${id}`);
    return response.data;
  },
  getUserOrders: async (userId: string) => {
    const response = await orderAPI.get(`/orders/user/${userId}`);
    return response.data;
  },
};

// Payment Service
export const paymentService = {
  processPayment: async (paymentData: any) => {
    const response = await paymentAPI.post('/payments', paymentData);
    return response.data;
  },
}; 