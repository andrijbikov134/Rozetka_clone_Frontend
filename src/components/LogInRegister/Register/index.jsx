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
  
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if(e.target.id == 'input_register_name')
    {
      setNameValid(true);
    }
    else if(e.target.id == 'input_register_password')
    {
      setPasswordValid(true);
    }
    else
    {
      setEmailValid(true);
    }

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let input_name = document.getElementById('input_register_name');
    if(input_name.value == '')
    {
      setNameValid(false);
    }

    let input_password = document.getElementById('input_register_password');
    if(input_password.value == '')
    {
      setPasswordValid(false);
    }


    try {
      const response = await fetch(`${props.localhost}/index.php?action=registerUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        if(data.type == 'password')
        {
          setPasswordValid(false);
        }
        else if(data.type == 'email')
        {
          setEmailValid(false);
        }
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

        <form onSubmit={handleSubmit} noValidate className={styles.register_form}>
          <TextField
            id='input_register_name'
            label="Ім'я"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            required
            error={!nameValid}
            helperText= {nameValid ? "" : "Заповніть поле"}
            margin="normal"
          />
          <TextField
            label="e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            error={!emailValid}
            helperText= {emailValid ? "" : "Заповніть поле"}
            margin="normal"
          />
          <TextField
            id='input_register_password'
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!passwordValid}
            margin="normal"
            helperText= {passwordValid ? "" : "Заповніть поле"}
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
