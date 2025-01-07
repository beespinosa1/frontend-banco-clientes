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
  const [tarjetaBloquearId, setTarjetaBloquearId] = useState(null);
  const [tarjetaActivarId, setTarjetaActivarId] = useState(null);

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
  const [showUnblockModal, setShowUnblockModal] = useState({ type: null, index: null });

  // Función para manejar el bloqueo de la tarjeta

  const handleUnblockCard = (tarjetaId) => {
    setTarjetaActivarId(tarjetaId);
    setShowUnblockModal({ type: "block" });
  };

  const handleBlockCard = (tarjetaId) => {
    setTarjetaBloquearId(tarjetaId);
    setShowModal({ type: "block" });
  };

  const confirmUnblock = async () => {
    try {
      const res = await tarjetaService.activarTarjeta(tarjetaActivarId);
      setShowUnblockModal({ type: null });

      alert("Tarjeta bloqueada exitosamente");

      await obtenerTarjetas();
    } catch (error) {
      //
    }
  };

  const confirmBlock = async () => {
    try {
      const res = await tarjetaService.bloquearTarjeta(tarjetaBloquearId);
      setShowModal({ type: null });

      alert("Tarjeta bloqueada exitosamente");

      await obtenerTarjetas();
    } catch (error) {
      //
    }
  };

  const cancelBlock = () => {
    setTarjetaBloquearId(null);
    setShowModal({ type: null });
  };
  
  const cancelUnblock = () => {
    setTarjetaActivarId(null);
    setShowUnblockModal({ type: null });
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
            {tarjetas.map((tarjeta, index) => <ItemTarjeta numero={tarjeta.numero} cupoAprobado={tarjeta.cupoAprobado} cupoDisponible={tarjeta.cupoDisponible} estado={tarjeta.estado} handleBlockCard={() => handleBlockCard(tarjeta.id)} handleUnblockCard={() => handleUnblockCard(tarjeta.id)} key={index} />)}
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
      
      {showUnblockModal.type === "block" && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro?</h2>
            <p>¿Quieres desbloquear esta tarjeta?</p>
            <div className="modal-buttons">
              <button className="copy-button" onClick={confirmUnblock}>
                Desbloquear
              </button>
              <button className="close-button" onClick={cancelUnblock}>
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
