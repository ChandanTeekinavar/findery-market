import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { productService } from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        setFeaturedProducts(products.slice(0, 6)); // Show first 6 products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth={false}>
      <Box sx={{ my: 4, textAlign: 'center', maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to FinderyMart
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your one-stop shop for all your needs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/products"
          sx={{ mt: 2, mb: 6 }}
        >
          Shop Now
        </Button>

        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Featured Products
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card
                  sx={{
                    height: '100%',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url || 'https://via.placeholder.com/200'}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {['Electronics', 'Fashion', 'Home & Living', 'Books'].map((category) => (
            <Grid item key={category} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                component={RouterLink}
                to={`/products?category=${category.toLowerCase()}`}
              >
                <Typography variant="h6" align="center">
                  {category}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 