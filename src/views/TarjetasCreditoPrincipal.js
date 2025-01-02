import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";

const TarjetasCreditoPrincipal = () => {
  const navigate = useNavigate();

  // Objeto que contiene los datos de las tarjetas
  const [tarjetas] = useState([
    {
      tipo: "Mastercard",
      numero: "2033300****",
      porPagar: 250.0,
      disponible: 2500.0,
    },
    {
      tipo: "Visa",
      numero: "4123000****",
      porPagar: 500.0,
      disponible: 1500.0,
    },
    {
      tipo: "American Express",
      numero: "1234567****",
      porPagar: 700.0,
      disponible: 1200.0,
    },
  ]);

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
          <h1>Administración de Tarjetas</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñan</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Tarjetas Section */}
        <div className="diferidos-section">
          <button
            className="tajertabloqueos-button"
            style={{ marginBottom: "1rem" }}
            onClick={() => navigate("/tarjetas-credito/bloqueos")}
          >
            Gestionar Bloqueos
          </button>
          <div className="card-container">
            {tarjetas.map((tarjeta, index) => (
              <div key={index} className="diferidos-card">
                <div className="diferidos-details">
                  <h4 className="card-title">{tarjeta.tipo}</h4>
                  <p className="card-number">{tarjeta.numero}</p>
                </div>
                <div className="diferidos-actions">
                  <p>
                    <strong>Por Pagar: </strong>${tarjeta.porPagar.toFixed(2)}
                  </p>
                  <p>
                    <strong>Disponible: </strong>$
                    {tarjeta.disponible.toFixed(2)}
                  </p>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() =>
                        navigate("/tarjetas-credito/diferidos", {
                          state: { numeroTarjeta: tarjeta.numero },
                        })
                      }
                    >
                      Ver Diferidos
                    </button>
                    <button
                      className="action-button"
                      onClick={() =>
                        navigate("/tarjetas-credito/historial", {
                          state: { numeroTarjeta: tarjeta.numero },
                        })
                      }
                    >
                      Ver Historial
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

export default TarjetasCreditoPrincipal;
