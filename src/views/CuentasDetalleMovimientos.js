import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCredito.css";
import "../styles/Modal.css";
import { ItemCuentaDetalle } from "../components/ItemCuentaDetalle";
import transCuentaService from "../services/transCuentaService";
import { useLocation, useParams } from "react-router-dom";

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
      const {datos} = await transCuentaService.listarTransCuentasCliente(id);
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
          <h1>Detalle Movimientos Cuenta {numeroTarjetaSeleccionada}</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñán</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Cuenta Detalles Section */}
        <div className="diferidos-section">
          <div className="card-container">

            {cuentaDetalles.map((cuenta, index) => 
              <ItemCuentaDetalle tipo={cuenta.tipo} fecha={cuenta.fecha} montoTotal={cuenta.monto} estado={cuenta.estado} codigoTransaccion={cuenta.id}  key={index} />)
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
