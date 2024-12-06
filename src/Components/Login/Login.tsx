import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { fetchUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
let classes = require('./Login.module.scss');

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    dispatch(fetchUser())
      .unwrap()
      .then((user) => {
        console.log('User fetched successfully:', user);
        document.cookie = "authorized=true; path=/; max-age=86400";
        navigate('/');
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  return (
    <div className={classes.container}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '400px',
          margin: '0 auto',
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
