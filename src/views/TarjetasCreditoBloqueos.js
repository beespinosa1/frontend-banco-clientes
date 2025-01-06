import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ItemTarjeta } from "../components/ItemTarjetaBloqueos";
import tarjetaService from "../services/tarjetaService";
import "../styles/TarjetaCredito.css";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const TarjetasCreditoBloqueos = () => {
  const navigate = useNavigate();
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
            {tarjetas.map((tarjeta, index) => <ItemTarjeta numero={tarjeta.numero} cupoAprobado={tarjeta.cupoAprobado} cupoDisponible={tarjeta.cupoDisponible} estado={tarjeta.estado} handleBlockCard={() => handleBlockCard(index)} key={index} />)}
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
