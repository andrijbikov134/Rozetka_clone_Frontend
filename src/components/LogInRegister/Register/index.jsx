import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import styles from './Register.module.css';

const Register = (props) => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${props.localhost}/index.php?action=registerUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        navigate('/'); // ✅ Переадресація на сторінку авторизації
      }
    } catch (error) {
      setError('Помилка сервера. Спробуйте пізніше.');
    }
  };

  return (
    <>
      <Box className={styles.register_container}>
        <Typography variant="h5" className={styles.register_title}>
          Реєстрація
        </Typography>

        {error && <Typography className={styles.error_message}>{error}</Typography>}

        <form onSubmit={handleSubmit} className={styles.register_form}>
          <TextField
            label="Ім'я"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" className={styles.register_button}>
            Зареєструватися
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;
