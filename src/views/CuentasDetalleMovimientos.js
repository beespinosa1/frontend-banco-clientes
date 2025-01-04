import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";

const CuentasDetalleMovimientos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const pagos = {
    "2033300****": [
      {
        tienda: "Tienda XYZ",
        fecha: "10-20-2024",
        montoTotal: "$500.00",
        estado: "Realizado",
        cuentaDebitada: "1234567890",
        codigoTransaccion: "TXN123456",
        descripcion: "Compra de electrónicos",
        beneficiario: "Tienda XYZ",
      },
      // Otros datos...
    ],
    "4123000****": [
      // Otros datos...
    ],
    "1234567****": [
      // Otros datos...
    ],
  };

  const numeroTarjetaSeleccionada =
    location.state?.numeroTarjeta || "2033300****";

  const handleLogoutClick = () => {
    setShowModal(true); // Mostrar el modal
  };

  const confirmLogout = () => {
    setShowModal(false); // Cerrar el modal
    navigate("/login"); // Redirigir al inicio
  };

  const cancelLogout = () => {
    setShowModal(false); // Cerrar el modal sin acción
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
          <h1>Historial de Pagos de la tarjeta {numeroTarjetaSeleccionada}</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñan</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Historial de Pagos Section */}
        <div className="diferidos-section">
          <div className="card-container">
            {pagos[numeroTarjetaSeleccionada]?.map((pago, index) => (
              <div key={index} className="diferidos-card">
                <div className="diferidos-details">
                  <h4>{pago.tienda}</h4>
                  <p>Fecha: {pago.fecha}</p>
                  <p>
                    Monto Total: <strong>{pago.montoTotal}</strong>
                  </p>
                  <p>
                    Estado: <strong>{pago.estado}</strong>
                  </p>
                  <p>
                    Cuenta Debitada: <strong>{pago.cuentaDebitada}</strong>
                  </p>
                  <p>
                    Código de Transacción:{" "}
                    <strong>{pago.codigoTransaccion}</strong>
                  </p>
                  <p>
                    Descripción: <strong>{pago.descripcion}</strong>
                  </p>
                  <p>
                    Beneficiario: <strong>{pago.beneficiario}</strong>
                  </p>
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

export default CuentasDetalleMovimientos;
