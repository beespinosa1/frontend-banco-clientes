import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import sideBanner from "../assets/images/antelope.jpg";
import LogoImage from "../assets/images/Logo.jpg";
import autenticacionService from "../services/autenticacionService";
import { LoginUsuarioFormulario } from "../components/LoginUsuarioFormulario";
import { LoginClaveFormulario } from "../components/LoginClaveFormulario";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');

  const [mgsError, setMgsError] = useState("");
  const [paso, setPaso] = useState("USR");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isButtonDisabled = username.trim() === "";

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmitUser = async (e) => {
    try {
      const credenciales = {
        usuario: username
      };

      const { datos } = await autenticacionService.verificarUsuario(credenciales);

      if (!datos.esValido)
        return;

      setPaso("CON");
    } catch (er) {
      const { data } = er;
      const error = data.error;

      setMgsError(error.mensaje);
      setShowModal(true);
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const handlePasswordValidation = async () => {
    try {
      const credenciales = {
        usuario: username,
        contrasenia: password
      }

      const { datos } = await autenticacionService.ingresar(credenciales);
      localStorage.setItem("clienteId", datos.clienteId);
      localStorage.setItem("cliente", JSON.stringify(datos));
      
      navigate('/PaginaPrincipal');
    } catch (er) {
      const { data } = er;
      const error = data.error;

      setMgsError(error.mensaje);
      setShowModal(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
        {paso === "USR" && (
          <LoginUsuarioFormulario handleSubmitUser={handleSubmitUser} username={username} handleChangeUser={handleChangeUser} isButtonDisabled={isButtonDisabled} />
        )}

        {paso === "CON" && (
          <LoginClaveFormulario handlePasswordValidation={handlePasswordValidation} password={password} handlePasswordChange={handlePasswordChange} />
        )}

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
            <p>{mgsError}</p>
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
