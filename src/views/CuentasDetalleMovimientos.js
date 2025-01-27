import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";
import { ItemCuentaDetalle } from "../components/ItemCuentaDetalle";
import transCuentaService from "../services/transCuentaService";
import { useLocation, useParams } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const CuentasDetalleMovimientos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);

  const [cuentaDetalles, setCuentaDetalles] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    obtenerDetalleMovimientos();
  }, [id]);

  const obtenerDetalleMovimientos = async () => {
    try {
      const datos = await transCuentaService.listarTransCuentasCliente(id);
      console.log("Cuanta detalle movimientos");
      console.log(datos);
      setCuentaDetalles(datos);
    } catch (error) {
      console.error(error);
    }
  }

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

  //Obtener el número de cuenta seleccionada
  const numeroTarjetaSeleccionada =
    location.state?.numeroTarjeta || "2033300****";

  return (
    <div className="dashboard-container">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Navbar titulo="Cuenta Detalle Movimiento" />

        {/* Cuenta Detalles Section */}
        <div className="diferidos-section">
          <div className="card-container">

            {cuentaDetalles.map((cuenta, index) => 
              <ItemCuentaDetalle tipo={cuenta.tipo} fecha={cuenta.fechaHora} montoTotal={cuenta.valor} estado={cuenta.estado} codigoTransaccion={cuenta.id} descripcion={cuenta.detalleTransaccion.descripcion} key={index} />)
            }
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
