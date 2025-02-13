import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import { productService } from '../../services/api';
import { addItem } from '../../store/slices/cartSlice';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image_url: product.image_url,
      }));
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error || 'Product not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image_url || 'https://via.placeholder.com/400'}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ mb: 2 }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3 }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2 }}
            >
              Category: {product.category}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 3 }}
              color={product.stock > 0 ? 'success.main' : 'error.main'}
            >
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail; 