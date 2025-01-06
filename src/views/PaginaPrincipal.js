import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaginaPrincipal.css";

import { ItemTarjeta } from "../components/ItemTarjeta";
import tarjetaService from "../services/tarjetaService";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

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
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Navbar titulo="Resumen" />

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
