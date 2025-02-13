import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { store } from './store';
import Layout from './components/Layout';
import theme from './theme';
import React from 'react';

// Create emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
});

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Products = React.lazy(() => import('./pages/products/Products'));
const ProductDetail = React.lazy(() => import('./pages/products/ProductDetail'));
const Cart = React.lazy(() => import('./pages/cart/Cart'));
const Checkout = React.lazy(() => import('./pages/cart/Checkout'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const Orders = React.lazy(() => import('./pages/orders/Orders'));

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </Layout>
          </Router>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
