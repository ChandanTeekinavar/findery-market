import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
  IconButton,
  Box,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            ShopSmart
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/products">
              Products
            </Button>

            {isAuthenticated ? (
              <>
                <IconButton
                  color="inherit"
                  component={RouterLink}
                  to="/cart"
                  size="large"
                >
                  <Badge badgeContent={items.length} color="error">
                    <CartIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  color="inherit"
                  component={RouterLink}
                  to="/profile"
                  size="large"
                >
                  <PersonIcon />
                </IconButton>

                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout; 