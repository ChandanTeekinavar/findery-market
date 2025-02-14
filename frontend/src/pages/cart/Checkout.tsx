import React, { useState, useEffect } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { RootState } from '../../store';
import { orderService } from '../../services/api';
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

const steps = ['Shipping Information', 'Review Order', 'Order Confirmation'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
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

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [items, navigate, orderPlaced]);

  if (items.length === 0 && !orderPlaced) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = Object.values(shippingData);
    if (requiredFields.some(field => !field)) {
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    setActiveStep(1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const mockOrder = {
        orderId: Math.random().toString(36).substr(2, 9),
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        shippingAddress: shippingData,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      await orderService.createOrder(mockOrder);
      setOrderPlaced(true);
      setActiveStep(2);
      dispatch(clearCart());
    } catch (err: any) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', err);
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

        <Grid item xs={12}>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={handleBack}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </Box>
    </>
  );

  const renderOrderConfirmation = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for shopping with FinderyMart. Your order has been confirmed.
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        You will receive an order confirmation email shortly.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/products')}
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Box>
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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && renderShippingForm()}
        {activeStep === 1 && renderOrderReview()}
        {activeStep === 2 && renderOrderConfirmation()}
      </Paper>
    </Container>
  );
};

export default Checkout; 