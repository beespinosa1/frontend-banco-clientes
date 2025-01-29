import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ItemTarjeta } from "../components/ItemTarjetaHistorial";

import transTarjetaService from "../services/transTarjetaService";

import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const TarjetasCreditoHistoriales = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const [tarjetaHistorial, setTarjetaHistorial] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [numeroTarjetaSeleccionada, setNumeroTarjetaSeleccionada] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.numeroTarjeta) {
      setNumeroTarjetaSeleccionada(location.state.numeroTarjeta);
    }
    obtenerTarjetaHistorial();
  }, [id, location.state]);

  const obtenerTarjetaHistorial = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const datos = await transTarjetaService.listarTransTarjetasCliente(id);
      
      if (Array.isArray(datos)) {
        // Ordenar las transacciones por fecha de forma descendente
        const transaccionesOrdenadas = datos.sort((a, b) => {
          return new Date(b.fechaHora) - new Date(a.fechaHora);
        });
        setTarjetaHistorial(transaccionesOrdenadas);
      } else {
        console.error('Los datos recibidos no son un array:', datos);
        setTarjetaHistorial([]);
      }
    } catch (error) {
      console.error('Error al obtener el historial:', error);
      setError('Error al cargar el historial de movimientos');
      setTarjetaHistorial([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLogoutModal = () => {
    setShowModal(!showModal);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar titulo={`Historial de Pagos de la tarjeta ${numeroTarjetaSeleccionada}`} />

        <div className="diferidos-section">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando historial de movimientos...</p>
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#dc3545',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <p>{error}</p>
            </div>
          ) : tarjetaHistorial.length > 0 ? (
            <div className="card-container">
              {tarjetaHistorial.map((historial, index) => (
                <ItemTarjeta
                  historial={historial}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <p>No hay movimientos para mostrar</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro?</h3>
            <p>¿Quieres cerrar sesión?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="close-button">
                Cerrar
              </button>
              <button onClick={cancelLogout} className="close-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TarjetasCreditoHistoriales;
