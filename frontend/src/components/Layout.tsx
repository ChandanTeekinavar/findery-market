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
  Link,
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            FinderyMart
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

      <Box component="main" sx={{ flexGrow: 1, width: '100%', mt: 8 }}>
        <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
          {children}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth={false}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="right"
            sx={{ fontStyle: 'italic' }}
          >
            Developed by{' '}
            <Link
              href="https://github.com/chandanteekinavar"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 'bold' }}
            >
              Chandan Teekinavar
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 