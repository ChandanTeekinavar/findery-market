import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { RootState } from '../../store';
import { orderService, paymentService } from '../../services/api';
import { clearCart, CartItem } from '../../store/slices/cartSlice';

interface ShippingForm {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const steps = ['Shipping Information', 'Review Order', 'Payment'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingData, setShippingData] = useState<ShippingForm>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const paymentResponse = await paymentService.processPayment({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
      });

      // Create order
      const orderResponse = await orderService.createOrder({
        items: items.map((item: CartItem) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        shippingAddress: shippingData,
        paymentIntentId: paymentResponse.clientSecret,
      });

      // Clear cart and redirect to success page
      dispatch(clearCart());
      navigate('/order-success', { state: { orderId: orderResponse.id } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during checkout');
      setActiveStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={shippingData.firstName}
            onChange={(e) =>
              setShippingData({ ...shippingData, firstName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={shippingData.lastName}
            onChange={(e) =>
              setShippingData({ ...shippingData, lastName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            value={shippingData.address}
            onChange={(e) =>
              setShippingData({ ...shippingData, address: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            value={shippingData.city}
            onChange={(e) =>
              setShippingData({ ...shippingData, city: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="State"
            value={shippingData.state}
            onChange={(e) =>
              setShippingData({ ...shippingData, state: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            value={shippingData.zipCode}
            onChange={(e) =>
              setShippingData({ ...shippingData, zipCode: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Country"
            value={shippingData.country}
            onChange={(e) =>
              setShippingData({ ...shippingData, country: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={shippingData.phone}
            onChange={(e) =>
              setShippingData({ ...shippingData, phone: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Next
        </Button>
      </Box>
    </form>
  );

  const renderOrderReview = () => (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          {items.map((item: CartItem) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>x{item.quantity}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={handleBack}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </Button>
      </Box>
    </>
  );

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {activeStep === 0 && renderShippingForm()}
        {activeStep === 1 && renderOrderReview()}
      </Paper>
    </Container>
  );
};

export default Checkout; 