import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tarjetaService from "../services/tarjetaService.js"; // Importar el servicio
import "../styles/TarjetaCredito.css";

import { Navbar } from "../components/Navbar.js";
import { Sidebar } from "../components/Sidebar.js";

const TarjetasCreditoPrincipal = () => {
  const navigate = useNavigate();
  const [tarjetas, setTarjetas] = useState([]); // Estado inicial vacío
  const [isLoading, setIsLoading] = useState(true); // Para manejar el estado de carga
  const clienteId = 1; // Reemplaza con el ID dinámico del cliente

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const data = await tarjetaService.get(clienteId);
  
        // Si 'data' no es un arreglo, conviértelo en uno para iterar
        const tarjetas = Array.isArray(data) ? data : [data];
        setTarjetas(tarjetas);
      } catch (error) {
        console.error("Error al cargar las tarjetas:", error);
        alert("Error al cargar las tarjetas, por favor intenta de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTarjetas();
  }, [clienteId]);
   

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />
  
      {/* Main Content */}
      <div className="main-content">
        <Navbar titulo="Administración de Tarjetas" />
  
        {/* Tarjetas Section */}
        <div className="diferidos-section">
          <button
            className="tajertabloqueos-button"
            style={{ marginBottom: "1rem" }}
            onClick={() => navigate("/tarjetas-credito/bloqueos")}
          >
            Gestionar Bloqueos
          </button>
          {isLoading ? (
            <p>Cargando tarjetas...</p>
          ) : tarjetas.length > 0 ? (
            <div className="card-container">
              {/* Itera sobre las tarjetas obtenidas */}
              {tarjetas.map((tarjeta, index) => (
                <div key={index} className="diferidos-card">
                  <div className="diferidos-details">
                    <h4 className="card-title">{tarjeta.tipo}</h4>
                    <p className="card-number">{tarjeta.numero}</p>
                  </div>
                  <div className="diferidos-actions">
                    <p>
                      <strong>Por Pagar: </strong>$
                      {tarjeta.porPagar ? tarjeta.porPagar.toFixed(2) : "0.00"}
                    </p>
                    <p>
                      <strong>Disponible: </strong>$
                      {tarjeta.cupoDisponible
                        ? tarjeta.cupoDisponible.toFixed(2)
                        : "0.00"}
                    </p>
                    <p>
                      <strong>Cupo Total: </strong>$
                      {tarjeta.cupoAprobado
                        ? tarjeta.cupoAprobado.toFixed(2)
                        : "0.00"}
                    </p>
                    <p>
                      <strong>Fecha de Corte: </strong>
                      {tarjeta.fechaCorte || "N/A"}
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
                        Ver Movimientos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay tarjetas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default TarjetasCreditoPrincipal;
