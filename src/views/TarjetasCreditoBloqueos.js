import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";

const TarjetasCreditoBloqueos = () => {
  const navigate = useNavigate();

  // Objeto que contiene los datos de las tarjetas
  const [tarjetas, setTarjetas] = useState([
    {
      tipo: "Mastercard",
      numero: "2033300****",
      porPagar: 250.00,
      disponible: 2500.00,
      bloqueada: false,
    },
    {
      tipo: "Visa",
      numero: "4123000****",
      porPagar: 500.00,
      disponible: 1500.00,
      bloqueada: false,
    },
    {
      tipo: "American Express",
      numero: "1234567****",
      porPagar: 700.00,
      disponible: 1200.00,
      bloqueada: false,
    },
  ]);

  // Función para bloquear la tarjeta
  const handleBlockCard = (index) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas bloquear esta tarjeta?"
    );
    if (confirmation) {
      const updatedTarjetas = [...tarjetas];
      updatedTarjetas[index].bloqueada = true;
      setTarjetas(updatedTarjetas); // Cambiar el estado de la tarjeta a bloqueada
      alert("La tarjeta ha sido bloqueada exitosamente.");
    }
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
          <h1>Gestión de Bloqueos de Tarjeta</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñan</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

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
    </div>
  );
};

export default TarjetasCreditoBloqueos;
