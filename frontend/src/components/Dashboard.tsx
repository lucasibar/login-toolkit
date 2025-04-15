import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
} from '@mui/material';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';

const Dashboard: React.FC = () => {
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h6" gutterBottom>
            {isAdmin ? 'Panel de Administración' : 'Panel de Usuario'}
          </Typography>
          {isAdmin && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Bienvenido al panel de administración. Aquí puedes gestionar los usuarios y configuraciones del sistema.
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Cerrar Sesión
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 