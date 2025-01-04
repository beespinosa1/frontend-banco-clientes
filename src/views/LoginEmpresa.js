import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import sideBanner from "../assets/images/antelope.jpg";
import LogoImage from "../assets/images/Logo.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isButtonDisabled = username.trim() === "";

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin") {
      navigate("/Password");
    } else {
      setShowModal(true);
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-image">
          <img
            src={LogoImage}
            alt="Imagen descriptiva"
            className="logo-img-foot"
          />
        </div>
        <h1>Hola, te damos la bienvenida a Banca Empresas</h1>
        <p>Ingresa a tu Banca en línea</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            placeholder="Ingresa tu nombre de usuario"
            value={username}
            onChange={handleChange}
          />
          <button type="submit" disabled={isButtonDisabled}>
            Continuar
          </button>
        </form>
        <a href="/recover">¿Olvidaste tu usuario o quieres desbloquearlo?</a>
        <p>¿Eres cliente y es la primera vez que ingresas?</p>
        <button className="register-button" onClick={handleRegister}>
          Regístrate
        </button>
        <p>Si tienes problemas comunícate al 02 600 9 600</p>
      </div>
      <div className="login-right">
        <img src={sideBanner} alt="Side Banner" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Error</h2>
            <p>No se encuentra registrado</p>
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
