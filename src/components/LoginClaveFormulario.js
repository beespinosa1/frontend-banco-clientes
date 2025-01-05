import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const LoginClaveFormulario = (( {handlePasswordValidation, password, handlePasswordChange} ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    
    return (
        <>
            <p className="security-text">¿Reconoces tu imagen de seguridad?</p>
            <img
                src="/path/to/security-image.jpg"
                alt="Imagen de seguridad"
                className="security-image"
            />
            <p className="contact-text">Si no la reconoces por favor comunícate al: 02 600 9 600</p>
            <h1>Ingresa a tu Banca en línea</h1>
            <div>
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
                        onClick={handlePasswordValidation}
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
            </div>
        </>
    )
});
