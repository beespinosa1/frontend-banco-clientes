import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";

export const AdminSidebar = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("clienteId");
        localStorage.removeItem("cliente");
        setShowLogoutModal(false);
        navigate("/admin");
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
                }}>Administrador</h2>
                

                {/* Botones administrativos */}
                <button 
                    onClick={() => navigate("/admin/clientes")}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'flex-start',
                        padding: '0.8rem 1rem'
                    }}
                >
                    <i className="fas fa-users"></i>
                    Gestión de Clientes
                </button>

                <button 
                    onClick={() => navigate("/admin/solicitar-tarjeta")}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'flex-start',
                        padding: '0.8rem 1rem'
                    }}
                >
                    <i className="fas fa-credit-card"></i>
                    Solicitar Tarjetas
                </button>

                <hr className="sidebar-divider" />

                <button 
                    className="logout-button" 
                    onClick={handleLogoutClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'center'
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    Cerrar sesión
                </button>
            </div>

            {/* Modal de Cierre de Sesión */}
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
    );
};

export default AdminSidebar; 