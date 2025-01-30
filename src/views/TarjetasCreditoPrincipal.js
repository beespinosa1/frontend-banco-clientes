import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ItemTarjeta } from "../components/ItemTarjetaFull";
import tarjetaService from "../services/tarjetaService";
import "../styles/TarjetaCredito.css";

import { Navbar } from "../components/Navbar.js";
import { Sidebar } from "../components/Sidebar.js";

const TarjetasCreditoPrincipal = () => {
  const navigate = useNavigate();
  const [tarjetas, setTarjetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    obtenerTarjetas();
  }, []);

  const obtenerTarjetas = (async () => {
    try {
      const  datos  = await tarjetaService.listarTarjetasCliente();
      setTarjetas(datos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  })


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />
  
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
          {isLoading ? (
            <p>Cargando tarjetas...</p>
          ) : (tarjetas && tarjetas.length > 0) ? (
            <div className="card-container">
              {/* Itera sobre las tarjetas obtenidas */}
              {tarjetas.map((tarjeta, index) => <ItemTarjeta numero={tarjeta.numero} cupoAprobado={tarjeta.cupoAprobado} cupoDisponible={tarjeta.cupoDisponible} fechaCorte={tarjeta.diaCorte} id={tarjeta.id} key={index} franquicia={tarjeta.franquicia}/>)}
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
