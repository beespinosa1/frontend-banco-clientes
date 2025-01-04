import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/TarjetaCredito.css";

const TarjetasCreditoHistoriales = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos estáticos de los pagos por número de tarjeta
  // Datos estáticos de los pagos por número de tarjeta
  const pagos = {
    "2033300****": [
      {
        tienda: "Tienda XYZ",
        fecha: "10-20-2024",
        montoTotal: "$500.00",
        estado: "Realizado", // Pago realizado, no diferido
        cuentaDebitada: "1234567890",
        codigoTransaccion: "TXN123456",
        descripcion: "Compra de electrónicos",
        beneficiario: "Tienda XYZ",
      },
      {
        tienda: "Supermercado ABC",
        fecha: "09-15-2024",
        montoTotal: "$300.00",
        estado: "Diferido", // Pago diferido
        cuentaDebitada: "1234567890",
        codigoTransaccion: "TXN654321",
        descripcion: "Compra de alimentos",
        beneficiario: "Supermercado ABC",
      },
    ],
    "4123000****": [
      {
        tienda: "Electrodomésticos 123",
        fecha: "08-10-2024",
        montoTotal: "$600.00",
        estado: "Realizado", // Pago realizado, no diferido
        cuentaDebitada: "0987654321",
        codigoTransaccion: "TXN789012",
        descripcion: "Compra de electrodomésticos",
        beneficiario: "Electrodomésticos 123",
      },
      {
        tienda: "Librería El Saber",
        fecha: "07-05-2024",
        montoTotal: "$200.00",
        estado: "Diferido", // Pago diferido
        cuentaDebitada: "0987654321",
        codigoTransaccion: "TXN210987",
        descripcion: "Compra de libros",
        beneficiario: "Librería El Saber",
      },
      {
        tienda: "Zapatería XYZ",
        fecha: "06-20-2024",
        montoTotal: "$150.00",
        estado: "Realizado", // Pago realizado, no diferido
        cuentaDebitada: "0987654321",
        codigoTransaccion: "TXN345678",
        descripcion: "Compra de zapatos",
        beneficiario: "Zapatería XYZ",
      },
    ],
    "1234567****": [
      {
        tienda: "Restaurante Delicias",
        fecha: "11-10-2024",
        montoTotal: "$450.00",
        estado: "Diferido", // Pago diferido
        cuentaDebitada: "1122334455",
        codigoTransaccion: "TXN567890",
        descripcion: "Cena en restaurante",
        beneficiario: "Restaurante Delicias",
      },
    ],
  };

  // Obtener el número de tarjeta desde la URL o estado
  const numeroTarjetaSeleccionada =
    location.state?.numeroTarjeta || "2033300****"; // Por defecto, Mastercard

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
    </div>
  );
};

export default TarjetasCreditoHistoriales;
