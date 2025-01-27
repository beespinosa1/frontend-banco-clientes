import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCuenta } from "../components/ItemCuenta";

import cuentaService from "../services/cuentaService";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const Cuentas = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalContent, setModalContent] = useState(""); // Contenido del modal
  // Estado para el modal de logout

  const [cuentas, setCuentas] = useState([]); // Estado para las cuentas

  useEffect(() => {
    obtenerCuentas();
  }, []);

  const obtenerCuentas = async () => {
    try {
      const datos  = await cuentaService.listarCuentasCliente();
      console.log(datos);
      setCuentas(datos);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Navbar titulo="Cuentas" />
        {/* Cuentas Section */}

        <div className="diferidos-section">
          <div className="card-container">
            {cuentas.length > 0 ? ((
              cuentas.map((cuenta, index) => <ItemCuenta tipo={cuenta.tipo} numero={cuenta.numero} saldoDisponible={cuenta.saldoDisponible} saldoAcreditar={cuenta.saldoAcreditar} openModal={openModal} cuenta={cuenta} key={index} />)
            )) : ( <p>No hay cuentas disponibles.</p> )
            }
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
    </div>
  );
};

export default Cuentas;
