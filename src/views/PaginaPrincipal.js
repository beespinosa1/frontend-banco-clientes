import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaginaPrincipal.css";

import { ItemTarjeta } from "../components/ItemTarjeta";
import tarjetaService from "../services/tarjetaService";

const PaginaPrincipal = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    obtenerTarjetas();
  }, []);

  const obtenerTarjetas = (async () => {
    try {
      const { datos } = await tarjetaService.listarTarjetasCliente();
      setTarjetas(datos);
      
    } catch (error) {
      console.log(error);
    }
  })

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Mostrar modal de confirmación
  };

  const confirmLogout = () => {
    setShowLogoutModal(false); // Ocultar modal
    navigate("/login"); // Redirigir al inicio
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Ocultar modal sin acción
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="profile-image"
        />
        <h2>Juanito Estupiñan</h2>
        <p>Último ingreso: 11-15-2024 10:03:44</p>
        <button onClick={() => navigate("/cuentas")}>Cuentas</button>
        <button onClick={() => navigate("/tarjetas-credito/principal")}>
          Tarjetas de Crédito
        </button>

        {/* Línea separadora */}
        <hr className="sidebar-divider" />

        {/* Botón de cerrar sesión */}
        <button className="logout-button" onClick={handleLogoutClick}>
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Resumen</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñán</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Cuentas Section */}
        <h2>Cuentas</h2>
        <div className="card">
          <img
            src="https://via.placeholder.com/50"
            alt="Cuenta"
            className="card-image"
          />
          <div className="details">
            <h4>Cuenta de Ahorro</h4>
            <p>20333000011190</p>
          </div>
          <div className="balance">
            <p>
              Saldo Disponible: <strong>$50.00</strong>
            </p>
            <p>
              Saldo por Efectivizar: <strong>$220.00</strong>
            </p>
          </div>
        </div>

        {/* Tarjetas Section */}
        <h2>Tarjetas de Crédito</h2>
        {tarjetas.map((tarjeta, index) => <ItemTarjeta numero={tarjeta.numero} cupoAprobado={tarjeta.cupoAprobado} cupoDisponible={tarjeta.cupoDisponible} key={index} />)}
      </div>

      {/* Modal de Cerrar Sesión */}
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
    </div>
  );
};

export default PaginaPrincipal;
