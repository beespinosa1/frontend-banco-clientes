import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCuenta } from "../components/ItemCuenta";

import cuentaService from "../services/cuentaService"; // Importa tu función del servicio

const Cuentas = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalContent, setModalContent] = useState(""); // Contenido del modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para el modal de logout


  const [cuentas, setCuentas] = useState([]); // Estado para las cuentas
  
  useEffect(() => {
    obtenerCuentas();
  }, []);

  const obtenerCuentas = async () => {
    try {
      const { datos } = await cuentaService.listarCuentasCliente();
      console.log(datos);
      setCuentas(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (cuenta) => {
    const content = `Banco BanQuito\n${cuenta.tipo}\n${cuenta.numero}`;
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalContent);
    alert("Contenido copiado al portapapeles");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
        <hr className="sidebar-divider" />
        <button className="logout-button" onClick={handleLogoutClick}>
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Cuentas</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñán</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Cuentas Section */}
       
        <div className="diferidos-section">
          <div className="card-container">
            {cuentas.length > 0 ? ((
                cuentas.map((cuenta, index) => <ItemCuenta tipo={cuenta.tipo} numero={cuenta.numero} saldoDisponible={cuenta.saldoDisponible} saldoAcreditar={cuenta.saldoAcreditar} openModal={openModal} cuenta={cuenta} key={index} />)
              ))
             : (
              <p>No hay cuentas disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información de la Cuenta</h2>
            <p>{modalContent}</p>
            <div className="modal-buttons">
              <button className="copy-button" onClick={copyToClipboard}>
                Copiar
              </button>
              <button className="close-button" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Cuentas;
