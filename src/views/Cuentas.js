import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";

const Cuentas = () => {
  const navigate = useNavigate();

  const [cuentas] = useState([
    {
      tipo: "Cuenta de Ahorro",
      numero: "2033300**",
      disponible: 250.0,
      porEfectivizar: 2500.0,
    },
    {
      tipo: "Cuenta Corriente",
      numero: "4123000**",
      disponible: 500.0,
      porEfectivizar: 1500.0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
        <button className="logout-button" onClick={() => navigate("/")}>
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Cuentas</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñan</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Tarjetas Section */}
        <div className="diferidos-section">
          <div className="card-container">
            {cuentas.map((cuenta, index) => (
              <div key={index} className="diferidos-card">
                <div className="diferidos-details">
                  <h4 className="card-title">{cuenta.tipo}</h4>
                  <p className="card-number">{cuenta.numero}</p>
                </div>
                <div className="diferidos-actions">
                  <p>
                    <strong>Disponible: </strong>${cuenta.disponible.toFixed(2)}
                  </p>
                  <p>
                    <strong>Por Efectivizar: </strong>$
                    {cuenta.porEfectivizar.toFixed(2)}
                  </p>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() =>
                        navigate("/cuentas/detalle-movimientos", {
                          state: { numeroCuenta: cuenta.numero },
                        })
                      }
                    >
                      Ver Detalles
                    </button>
                    <button
                      className="action-button"
                      onClick={() => openModal(cuenta)}
                    >
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
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

    </div>
  );
};

export default Cuentas;
