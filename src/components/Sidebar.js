import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = (() => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem('cliente'))
    const tipoPersona = usuario.cliente.tipo;
    const persona = tipoPersona == 'PER'
        ? usuario.cliente.personaNatural
        : usuario.cliente.personaJuridica
        ;

    const nombreMostrar = tipoPersona == 'PER'
        ? persona.primerNombre + " " + persona.segundoApellido + " " + persona.primerApellido + " " + persona.segundoApellido
        : persona.razonSocial
        ;

    const fechaISO = usuario.fechaUltimoIngreso;
    const fecha = new Date(fechaISO);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`;

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("clienteId");
        localStorage.removeItem("cliente");
        setShowLogoutModal(false);
        navigate("/login");
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className="sidebar">
                <h1 style={{
                    textAlign: 'center',
                    color: 'white',
                    margin: '1rem 0',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    Banco Banquito
                </h1>
                <img
                    src="https://via.placeholder.com/46"
                    alt="Profile"
                    className="profile-image"
                    style={{
                        width: '46px',
                        height: '46px'
                    }}
                />
                <h2 style={{
                    fontSize: '0.9rem',
                    margin: '0.5rem 0',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>{nombreMostrar}</h2>
                <p style={{
                    fontSize: '0.8rem',
                    color: '#e6e6e6',
                    margin: '0.3rem 0'
                }}>Último ingreso: {fechaFormateada}</p>
                <button onClick={() => navigate("/cuentas")}>Cuentas</button>
                <button onClick={() => navigate("/tarjetas-credito/principal")}>
                    Tarjetas de Crédito
                </button>
                <hr className="sidebar-divider" />
                <button className="logout-button" onClick={handleLogoutClick}>
                    Cerrar sesión
                </button>
            </div>

            {showLogoutModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Estás seguro?</h2>
                        <p>¿Quieres cerrar sesión?</p>
                        <div className="modal-buttons">
                            <button className="copy-button" onClick={confirmLogout}>
                                Cerrar
                            </button>
                            <button className="close-button" onClick={cancelLogout}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
})