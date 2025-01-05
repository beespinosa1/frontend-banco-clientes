import React, { useState } from "react";

export const LoginUsuarioFormulario = (({handleSubmitUser, username, handleChangeUser, isButtonDisabled}) => {
    return (
        <>
            <h1>Hola, te damos la bienvenida a Banca Personas</h1>
            <p>Ingresa a tu Banca en línea</p>
            <div className="login-form">
                <label htmlFor="username">Usuario</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={username}
                    onChange={handleChangeUser}
                />
                <button type="submit" onClick={handleSubmitUser} disabled={isButtonDisabled}>
                    Continuar
                </button>
            </div>
        </>
    )
});
