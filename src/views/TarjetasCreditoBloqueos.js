import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const TarjetasCreditoBloqueos = () => {
  const navigate = useNavigate();

  // Objeto que contiene los datos de las tarjetas
  const [tarjetas, setTarjetas] = useState([
    {
      tipo: "Mastercard",
      numero: "2033300****",
      porPagar: 250.0,
      disponible: 2500.0,
      bloqueada: false,
    },
    {
      tipo: "Visa",
      numero: "4123000****",
      porPagar: 500.0,
      disponible: 1500.0,
      bloqueada: false,
    },
    {
      tipo: "American Express",
      numero: "1234567****",
      porPagar: 700.0,
      disponible: 1200.0,
      bloqueada: false,
    },
  ]);

  const [showModal, setShowModal] = useState({ type: null, index: null });

  // Función para manejar el bloqueo de la tarjeta
  const handleBlockCard = (index) => {
    setShowModal({ type: "block", index });
  };

  const confirmBlock = () => {
    const updatedTarjetas = [...tarjetas];
    updatedTarjetas[showModal.index].bloqueada = true;
    setTarjetas(updatedTarjetas);
    setShowModal({ type: null, index: null });
    alert("La tarjeta ha sido bloqueada exitosamente.");
  };

  const cancelBlock = () => {
    setShowModal({ type: null, index: null });
  };

  // Función para cerrar sesión
  const handleLogoutClick = () => {
    setShowModal({ type: "logout" });
  };

  const confirmLogout = () => {
    setShowModal({ type: null });
    navigate("/login"); // Redirigir a la página de inicio
  };

  const cancelLogout = () => {
    setShowModal({ type: null });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Navbar titulo="Gestión de Bloqueos de Tarjeta" />
        {/* Bloqueos Section */}
        <div className="bloqueos-section">
          <div className="card-container">
            {tarjetas.map((tarjeta, index) => (
              <div key={index} className="bloqueos-card">
                <div className="bloqueos-details">
                  <h4 className="card-title">{tarjeta.tipo}</h4>
                  <p className="card-number">{tarjeta.numero}</p>
                </div>
                <div className="bloqueos-actions">
                  <p>
                    <strong>Por Pagar: </strong>${tarjeta.porPagar.toFixed(2)}
                  </p>
                  <p>
                    <strong>Disponible: </strong>${tarjeta.disponible.toFixed(2)}
                  </p>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() => handleBlockCard(index)}
                      disabled={tarjeta.bloqueada}
                    >
                      {tarjeta.bloqueada ? "Tarjeta Bloqueada" : "Bloquear Tarjeta"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Bloqueo de Tarjetas */}
      {showModal.type === "block" && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro?</h2>
            <p>¿Quieres bloquear esta tarjeta?</p>
            <div className="modal-buttons">
              <button className="copy-button" onClick={confirmBlock}>
                Bloquear
              </button>
              <button className="close-button" onClick={cancelBlock}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cierre de Sesión */}
      {showModal.type === "logout" && (
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

export default TarjetasCreditoBloqueos;
