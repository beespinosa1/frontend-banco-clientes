import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ItemTarjeta } from "../components/ItemTarjetaHistorial";
import transaccionService from "../services/transaccionService";
import transaccionDetalleService from "../services/transaccionDetalleService";
import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const TarjetasCreditoHistoriales = () => {
  const navigate = useNavigate();
  const [tarjetaHistorial, setTarjetaHistorial] = useState([]);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    obtenerTarjetaHistorial();
  }, []);

  const obtenerTarjetaHistorial = (async () => {
    try {
      const { datos } = await transaccionService.listarTransaccionCliente();
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
                beneficiario={tarjetaHistorial.beneficiario}
                fechaContable={tarjetaHistorial.fechaContable}
                valor={tarjetaHistorial.valor}
                estado={tarjetaHistorial.estado}
                cuentaDebitada={tarjetaHistorial.cuentaId}
                id={tarjetaHistorial.id}
                descripcion={tarjetaHistorial.descripcion}
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
