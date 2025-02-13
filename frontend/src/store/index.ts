import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import type { AuthState } from './slices/authSlice';
import type { CartState } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export interface RootState {
  auth: AuthState;
  cart: CartState;
}

export type AppDispatch = typeof store.dispatch; 