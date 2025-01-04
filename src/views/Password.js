import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PasswordForm.css';
import sideBanner from '../assets/images/antelope.jpg';
import LogoImage from "../assets/images/Logo.jpg";

const Password = () => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordValidation = (e) => {
        e.preventDefault();
        if (password === 'admin') {
            navigate('/PaginaPrincipal');
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login-container">
            <div className="login-left">            <div className="logo-image">
          <img
            src={LogoImage}
            alt="Imagen descriptiva"
            className="logo-img-foot"
          />
        </div>
                <p className="security-text">¿Reconoces tu imagen de seguridad?</p>
                <img
                    src="/path/to/security-image.jpg"
                    alt="Imagen de seguridad"
                    className="security-image"
                />
                <p className="contact-text">Si no la reconoces por favor comunícate al: 02 600 9 600</p>
                <h1>Ingresa a tu Banca en línea</h1>
                <form onSubmit={handlePasswordValidation}>
                    <label htmlFor="password">Contraseña</label>
                    <div className="password-input-container">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onMouseDown={() => setIsPasswordVisible(true)}
                            onMouseUp={() => setIsPasswordVisible(false)}
                            onMouseLeave={() => setIsPasswordVisible(false)}
                        >
                            Mostrar
                        </button>
                    </div>
                    <div className="button-group">
                        <button
                            type="submit"
                            className={`submit-button ${password.trim() ? 'active' : ''}`}
                            disabled={!password.trim()}
                        >
                            Ingresar
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            <div className="login-right">
                <img src={sideBanner} alt="Side Banner" />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Error</h2>
                        <p>Contraseña incorrecta</p>
                        <button className="close-button" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Password;
