import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ItemTarjeta } from "../components/ItemTarjetaHistorial";
import transaccionService from "../services/transaccionService";
import transaccionDetalleService from "../services/transaccionDetalleService";
import diferidosService from "../services/diferidosService";
import "../styles/TarjetaCredito.css";

const TarjetasCreditoDiferidos = () => {
  const navigate = useNavigate();
  const [tarjetaHistorial, setTarjetaHistorial] = useState([]);
  const location = useLocation();

  useEffect(() => {
    obtenerTarjetaHistorial();
  }, []);

  const obtenerTarjetaHistorial = (async () => {
    try {
      const { datos } = await transaccionService.listarTransaccionCliente();
      // const { datosDetalle } = await transaccionDetalleService.listarTransaccionDetalles();
      // const { datosDiferidos } = await diferidosService.listarDiferidosTransacciones();
      // Relacionar las transacciones con sus detalles y diferidos
      // const historialConDetallesYDiferidos = datos.map((transaccion) => {
      //   // Buscar los detalles de esta transacción
      //   const detalles = datosDetalle.filter(detalle => detalle.id === transaccion.id);

      //   // Buscar los diferidos de esta transacción
      //   const diferidos = datosDiferidos.filter(diferido => diferido.idTransaccion === transaccion.id);

      //   // Devolver un objeto combinado con la transacción, sus detalles y diferidos
      //   return {
      //     ...transaccion,
      //     detalles,
      //     diferidos
      //   };
      // });
      // setTarjetaHistorial(historialConDetallesYDiferidos);
      setTarjetaHistorial(datos);
    } catch (error) {
      console.log(error);
    }
  })

  const [showModal, setShowModal] = useState({ type: null });

  // Función para cerrar sesión
  const handleLogoutClick = () => {
    setShowModal({ type: "logout" });
  };

  const confirmLogout = () => {
    setShowModal({ type: null });
    navigate("/login"); // Redirigir a la página de inicio
  };

  const cancelLogout = () => {
    setShowModal({ type: null });
  };

  // Función para mostrar el modal de solicitar nuevo diferido
  const handleSolicitarDiferidoClick = () => {
    setShowModal({ type: "solicitarDiferido" });
  };

  const confirmSolicitarDiferido = () => {
    setShowModal({ type: null });
    alert("Nuevo diferido solicitado");
    // Aquí puedes agregar lógica para manejar la solicitud real
  };

  const cancelSolicitarDiferido = () => {
    setShowModal({ type: null });
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
        <button className="logout-button" onClick={handleLogoutClick}>
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Diferidos de la tarjeta Mastercard</h1>
          <div className="user-info">
            <p>
              <strong>Juanito Estupiñán</strong> Último ingreso: 11-15-2024
              10:03:44
            </p>
          </div>
        </div>

        {/* Diferidos Section */}
        <div className="diferidos-section">
          <div className="card-container">
            {tarjetaHistorial.map((tarjetaHistorial, index) =>
              <ItemTarjeta
                beneficiario={tarjetaHistorial.beneficiario}
                fechaContable={tarjetaHistorial.fechaContable}
                valor={tarjetaHistorial.valor}
                cuotas={tarjetaHistorial.cuotas}
                cuotasCanceladas={tarjetaHistorial.cuotasCanceladas}
                valorCuota={tarjetaHistorial.valorCuota}
                porcentajeInteres={tarjetaHistorial.porcentajeInteres}
                cuentaDebitada={tarjetaHistorial.cuentaId}
                id={tarjetaHistorial.id}
                descripcion={tarjetaHistorial.descripcion}
                handleSolicitarDiferidoClick={() => handleSolicitarDiferidoClick(index)}
                key={index}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de Cierre de Sesión */}
      {showModal.type === "logout" && (
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

      {/* Modal de Solicitar Nuevo Diferido */}
      {showModal.type === "solicitarDiferido" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Solicitar Nuevo Diferido</h2>
            <p>¿Estás seguro que deseas solicitar un nuevo diferido?</p>
            <div className="modal-buttons">
              <button className="copy-button" onClick={confirmSolicitarDiferido}>
                Solicitar
              </button>
              <button className="close-button" onClick={cancelSolicitarDiferido}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarjetasCreditoDiferidos;
