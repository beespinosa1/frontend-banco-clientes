import React, { useState } from 'react';

import '../styles/PasswordForm.css';
import sideBanner from '../assets/images/antelope.jpg';
import LogoImage from "../assets/images/Logo.jpg";

const Password = () => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    

    

    

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
