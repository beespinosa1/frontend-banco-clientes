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
  const [tarjetaHistorial, setTarjetaHistorial] = useState([]);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [numeroTarjetaSeleccionada, setNumeroTarjetaSeleccionada] = useState("")

  const { id } = useParams();

  useEffect(() => {
    obtenerTarjetaHistorial();
  }, [id]);

  const obtenerTarjetaHistorial = (async () => {
    try {
      const { datos } = await transTarjetaService.listarTransTarjetasCliente(id);
      console.log(datos);
      
      // const { datosDetalle } = await transaccionDetalleService.listarTransaccionDetalles();
      // Relacionar las transacciones con sus detalles
      // const historialConDetalles = datos.map((transaccion) => {
      //   // Buscar los detalles de esta transacción
      //   const detalles = datosDetalle.filter(detalle => detalle.id === transaccion.id);

      //   // Devolver un objeto combinado con la transacción y sus detalles
      //   return {
      //     ...transaccion,
      //     detalles
      //   };
      // });
      // setTarjetaHistorial(historialConDetalles);
      setTarjetaHistorial(datos);
    } catch (error) {
      console.log(error);
    }
  })

  const toggleLogoutModal = () => {
    setShowModal(!showModal);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/login"); // Redirigir a la página de inicio
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar titulo={"Historial de Pagos de la tarjeta" + numeroTarjetaSeleccionada} />

        <div className="diferidos-section">
          <div className="card-container">
            {tarjetaHistorial.map((tarjetaHistorial, index) =>
              <ItemTarjeta
                historial={tarjetaHistorial}
                key={index}
              />
            )}

          </div>
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
