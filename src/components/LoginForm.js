import React from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
  return (
    <form className="login-form">
      <label htmlFor="username" className="login-label">Usuario</label>
      <input type="text" id="username" name="username" placeholder="Ingresa tu nombre de usuario" required />
      <button type="submit" className="login-button">Continuar</button>
    </form>
  );
};

export default LoginForm;