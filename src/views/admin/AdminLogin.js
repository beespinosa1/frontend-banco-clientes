import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/TarjetaCredito.css';
import LogoImage from "../../assets/images/Logo.jpg";
import autenticacionService from "../../services/autenticacionService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [paso, setPaso] = useState("USR"); // USR = usuario, CON = contraseña

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (paso === "USR") {
        // Primero verificamos el usuario
        const { datos } = await autenticacionService.verificarUsuario({
          usuario: credentials.username
        });

        if (!datos.esValido) {
          setError('Usuario no válido');
          return;
        }

        setPaso("CON");
      } else {
        // Luego verificamos la contraseña
        const { datos } = await autenticacionService.ingresar({
          usuario: credentials.username,
          contrasenia: credentials.password
        });

        // Aquí deberíamos verificar si el usuario es admin
        // Por ahora solo navegamos al dashboard
        localStorage.setItem("clienteId", datos.clienteId);
        localStorage.setItem("cliente", JSON.stringify(datos));
        
        navigate('/admin/dashboard');
      }
    } catch (error) {
      const mensaje = error.data?.error?.mensaje || 'Error al intentar ingresar';
      setError(mensaje);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b35 0%, #ff9a7b 100%)',
      position: 'relative'
    }}>
      {/* Botón Regresar */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <i className="fas fa-arrow-left"></i>
        <span style={{ fontSize: '1rem' }}>Regresar</span>
      </button>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#ff6b35',
          marginBottom: '1rem'
        }}>
          Banco Banquito
        </h1>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src={LogoImage} 
            alt="Banco Banquito" 
            style={{ 
              width: '80px',
              marginBottom: '1rem'
            }}
          />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {paso === "USR" ? (
            <div>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Usuario Empleado
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          )}

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
            style={{
              background: '#ff6b35',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            {paso === "USR" ? "Continuar" : "Ingresar al Sistema"}
          </button>

          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            fontSize: '0.9rem',
            marginTop: '1rem'
          }}>
            Acceso exclusivo para personal autorizado del Banco Banquito
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 