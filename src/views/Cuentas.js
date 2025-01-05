import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listarCuentasPorCliente } from "../services/cuentaService"; // Importa tu función del servicio

const Cuentas = () => {
  const navigate = useNavigate();

  const [cuentas, setCuentas] = useState([]); // Estado para las cuentas
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalContent, setModalContent] = useState(""); // Contenido del modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para el modal de logout

  const clienteId = 1; 

  useEffect(() => {
    // Llama a la API para obtener las cuentas
    const fetchCuentas = async () => {
      try {
        const clienteId = 1; // Aquí debes reemplazar con el id del cliente real o capturarlo de alguna manera
        const data = await listarCuentasPorCliente(clienteId);
        setCuentas(data);
      } catch (error) {
        //setError("Error al cargar las cuentas. Intenta nuevamente.");
        console.error("Error al obtener las cuentas:", error);
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchCuentas();
  }, [clienteId]);

  const openModal = (cuenta) => {
    const content = `Banco BanQuito\n${cuenta.tipo}\n${cuenta.numero}`;
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalContent);
    alert("Contenido copiado al portapapeles");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (isLoading) {
    return <p>Cargando cuentas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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

      <div className="main-content">
        <div className="header">
          <h1>Cuentas</h1>
        </div>

        <div className="diferidos-section">
          <div className="card-container">
            {cuentas.length > 0 ? (
              cuentas.map((cuenta, index) => (
                <div key={index} className="diferidos-card">
                  <div className="diferidos-details">
                    <h4 className="card-title">{cuenta.tipo}</h4>
                    <p className="card-number">{cuenta.numero}</p>
                  </div>
                  <div className="diferidos-actions">
                    <p>
                      <strong>Disponible: </strong>${cuenta.saldoDisponible.toFixed(2)}
                    </p>
                    <p>
                      <strong>Por Efectivizar: </strong>${cuenta.saldoAcreditar.toFixed(2)}
                    </p>
                    <div className="action-buttons">
                      <button
                        className="action-button"
                        onClick={() =>
                          navigate("/cuentas/detalle-movimientos", {
                            state: { numeroCuenta: cuenta.numero },
                          })
                        }
                      >
                        Ver Detalles
                      </button>
                      <button
                        className="action-button"
                        onClick={() => openModal(cuenta)}
                      >
                        Compartir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay cuentas disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información de la Cuenta</h2>
            <p>{modalContent}</p>
            <div className="modal-buttons">
              <button className="copy-button" onClick={copyToClipboard}>
                Copiar
              </button>
              <button className="close-button" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
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

export default Cuentas;
