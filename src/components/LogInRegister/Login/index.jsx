import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Очищення помилки перед новою спробою

    try {
      const response = await fetch(`${props.localhost}/index.php?action=loginUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem('user_petrushka_style', JSON.stringify(data.user)); // Зберігаємо користувача
        props.loadCurrentUser();
        navigate('/'); // Перенаправлення на сторінку після входу
      }
    } catch (error) {
      setError('Помилка сервера. Спробуйте пізніше.');
    }
  };

  return (
    <>
      <Box className={styles.login_container}>
        <Typography variant="h5" className={styles.login_title}>
          Увійти в існуючий акаунт
        </Typography>

        {error && <Typography className={styles.error_message}>{error}</Typography>} {/* Відображення помилки */}

        <form onSubmit={handleSubmit} className={styles.login_form}>
          <TextField
            label="Пошта"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={styles.login_input}
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
            className={styles.login_input}
          />
          <Box className={styles.login_options}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Запам'ятати мене"
              className={styles.remember_text}
            />
            {/* <Link href="#" className={styles.forgot_password}>
              Забули пароль?
            </Link> */}
          </Box>
          <Button type="submit" variant="contained" className={styles.login_button}>
            Увійти
          </Button>
          <Button variant="outlined" className={styles.register_button} href="/register">
            Реєстрація
          </Button>
        </form>
        
        {/* Блок соціального входу
        <Box className="social-login">
          <a href="#" className={styles.social_icon}>G</a>
          <a href="#" className="social-icon"></a>
          <a href="#" className="social-icon">f</a>
        </Box> */}
      </Box>
    </>
  );
};

export default Login;