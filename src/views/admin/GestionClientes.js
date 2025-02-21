import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar";

const GestionClientes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tipoCliente, setTipoCliente] = useState('');
    const [cedula, setCedula] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [listaClientes, setListaClientes] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(false);
    const [mostrarLista, setMostrarLista] = useState(true);

    useEffect(() => {
        cargarTodosLosClientes();
    }, []);

    useEffect(() => {
        // Si hay estado en la navegación, procesar la información
        if (location.state) {
            const { message, tipoCliente: tipo, identificacion } = location.state;
            if (message) setSuccessMessage(message);
            if (tipo) {
                setTipoCliente(tipo);
                if (identificacion) {
                    setCedula(identificacion);
                    // Buscar el cliente automáticamente
                    buscarCliente(tipo, identificacion);
                }
            }
            // Limpiar el estado de la navegación
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const buscarCliente = async (tipo = tipoCliente, id = cedula) => {
        if (!id.trim()) {
            setError("Por favor, ingrese una identificación");
            return;
        }

        try {
            let endpoint;
            if (tipo === "natural") {
                endpoint = `http://3.144.89.85:80/v1/personas-naturales/identificacion/${id}`;
            } else {
                // Para personas jurídicas, intentamos buscar por RUC
                endpoint = `http://3.144.89.85:80/v1/personas-juridicas/identificacion/${id}`;
            }

            const response = await fetch(endpoint);
            
            if (response.ok) {
                const data = await response.json();
                // Si es persona jurídica, aseguramos que tenga el campo identificacion
                if (tipo === 'juridica') {
                    data.identificacion = data.ruc || data.identificacion;
                }
                setClienteEncontrado(data);
                setError('');
                setSuccessMessage('');
                setMostrarLista(false);
            } else {
                setError('Cliente no encontrado');
                setClienteEncontrado(null);
                setMostrarLista(true);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            setError('Error de conexión');
            setClienteEncontrado(null);
            setMostrarLista(true);
        }
    };

    const cargarTodosLosClientes = async () => {
        setLoadingClientes(true);
        try {
            const [naturalesResponse, juridicasResponse] = await Promise.all([
                fetch('http://3.144.89.85:80/v1/personas-naturales'),
                fetch('http://3.144.89.85:80/v1/personas-juridicas')
            ]);

            const naturales = await naturalesResponse.json();
            const juridicas = await juridicasResponse.json();

            const clientesFormateados = [
                ...naturales.map(cliente => ({
                    ...cliente,
                    tipo: 'natural',
                    identificacion: cliente.identificacion,
                    nombreCompleto: `${cliente.primerNombre} ${cliente.segundoNombre || ''} ${cliente.primerApellido} ${cliente.segundoApellido || ''}`
                })),
                ...juridicas.map(cliente => ({
                    ...cliente,
                    tipo: 'juridica',
                    identificacion: cliente.ruc || cliente.identificacion, // Aseguramos que se use el RUC si está disponible
                    nombreCompleto: cliente.razonSocial
                }))
            ];

            setListaClientes(clientesFormateados);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            setError('Error al cargar la lista de clientes');
        } finally {
            setLoadingClientes(false);
        }
    };

    const seleccionarCliente = (cliente) => {
        setTipoCliente(cliente.tipo);
        setCedula(cliente.identificacion);
        buscarCliente(cliente.tipo, cliente.identificacion);
        setMostrarLista(false);
    };

    return (
        <div className="dashboard-container">
            <AdminSidebar />

            <div className="main-content">
                <div className="header">
                    <h1>Gestión de Clientes</h1>
                </div>

                <div style={{ padding: "2rem" }}>
                    {successMessage && (
                        <div style={{
                            backgroundColor: "#d4edda",
                            color: "#155724",
                            padding: "1rem",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                        }}>
                            {successMessage}
                        </div>
                    )}

                    {/* Selección de tipo de cliente */}
                    {!tipoCliente ? (
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Seleccione el tipo de cliente a buscar</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem'
                            }}>
                                <button
                                    onClick={() => setTipoCliente('natural')}
                                    style={{
                                        padding: '2rem',
                                        border: '2px solid #ff6b35',
                                        borderRadius: '8px',
                                        background: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    <i className="fas fa-user" style={{ fontSize: '2rem', color: '#ff6b35' }}></i>
                                    <span style={{ fontWeight: 'bold', color: '#333' }}>Persona Natural</span>
                                </button>
                                <button
                                    onClick={() => setTipoCliente('juridica')}
                                    style={{
                                        padding: '2rem',
                                        border: '2px solid #ff6b35',
                                        borderRadius: '8px',
                                        background: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    <i className="fas fa-building" style={{ fontSize: '2rem', color: '#ff6b35' }}></i>
                                    <span style={{ fontWeight: 'bold', color: '#333' }}>Persona Jurídica</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Panel de búsqueda */}
                            <div style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <button
                                            onClick={() => {
                                                setTipoCliente('');
                                                setCedula('');
                                                setClienteEncontrado(null);
                                                setError('');
                                                setMostrarLista(true);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#666',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem'
                                            }}
                                        >
                                            <i className="fas fa-arrow-left"></i>
                                            Volver
                                        </button>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        gap: "1rem",
                                        alignItems: "flex-end",
                                        flexWrap: "wrap",
                                    }}>
                                        <div style={{
                                            flex: "1",
                                            minWidth: "200px",
                                            maxWidth: "300px",
                                        }}>
                                            <label style={{
                                                display: "block",
                                                marginBottom: "0.5rem",
                                                color: "#666",
                                                fontWeight: "bold",
                                            }}>
                                                {tipoCliente === "natural" ? "Cédula de la Persona" : "RUC de la Empresa"}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={tipoCliente === "natural" ? "Ingrese la cédula..." : "Ingrese el RUC..."}
                                                value={cedula}
                                                onChange={(e) => setCedula(e.target.value)}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.75rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid #ddd",
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            gap: "1rem",
                                            flexWrap: "wrap",
                                        }}>
                                            <button
                                                onClick={() => buscarCliente()}
                                                style={{
                                                    background: "#ff6b35",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "0.75rem 1.5rem",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                <i className="fas fa-search"></i>
                                                Buscar
                                            </button>
                                            <button
                                                onClick={() => navigate("/admin/clientes/nuevo", { state: { tipoCliente } })}
                                                style={{
                                                    background: "#28a745",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "0.75rem 1.5rem",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                <i className="fas fa-plus"></i>
                                                Nuevo Cliente
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <p style={{
                                        color: "red",
                                        marginTop: "1rem",
                                        fontSize: "0.9rem",
                                    }}>
                                        {error}
                                    </p>
                                )}
                            </div>

                            {/* Lista de Clientes */}
                            {mostrarLista && !clienteEncontrado && (
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '2rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    marginTop: '1rem'
                                }}>
                                    <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Lista de Clientes</h2>
                                    
                                    {loadingClientes ? (
                                        <p>Cargando clientes...</p>
                                    ) : (
                                        <div style={{
                                            display: 'grid',
                                            gap: '1rem',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                                        }}>
                                            {listaClientes.map((cliente) => (
                                                <div
                                                    key={cliente.identificacion}
                                                    onClick={() => seleccionarCliente(cliente)}
                                                    style={{
                                                        padding: '1rem',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        backgroundColor: '#f8f9fa',
                                                        ':hover': {
                                                            backgroundColor: '#e9ecef',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <i className={`fas ${cliente.tipo === 'natural' ? 'fa-user' : 'fa-building'}`} 
                                                           style={{ color: '#ff6b35', fontSize: '1.2rem' }}></i>
                                                        <div>
                                                            <h3 style={{ margin: '0', fontSize: '1rem', color: '#333' }}>
                                                                {cliente.nombreCompleto}
                                                            </h3>
                                                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                                                                {cliente.identificacion}
                                                            </p>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                backgroundColor: cliente.estado === 'Activo' ? '#28a745' : '#dc3545',
                                                                color: 'white',
                                                                fontSize: '0.8rem',
                                                                marginTop: '0.5rem'
                                                            }}>
                                                                {cliente.estado}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Resultados de la búsqueda */}
                            {clienteEncontrado && (
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        padding: "2rem",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>
                                        Información del Cliente{" "}
                                        {tipoCliente === "natural" ? "Natural" : "Jurídico"}
                                    </h2>
                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "1.5rem",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(250px, 1fr))",
                                        }}
                                    >
                                        <div
                                            className="info-card"
                                            style={{
                                                padding: "1.5rem",
                                                backgroundColor: "#f8f9fa",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <h3 style={{ color: "#666", marginBottom: "1rem" }}>
                                                Datos{" "}
                                                {tipoCliente === "natural"
                                                    ? "Personales"
                                                    : "de la Empresa"}
                                            </h3>
                                            <div style={{ display: "grid", gap: "0.5rem" }}>
                                                <p>
                                                    <strong>Identificación:</strong>{" "}
                                                    {clienteEncontrado.identificacion}
                                                </p>
                                                {tipoCliente === "natural" ? (
                                                    <>
                                                        <p>
                                                            <strong>Nombres:</strong>{" "}
                                                            {`${clienteEncontrado.primerNombre} ${
                                                                clienteEncontrado.segundoNombre || ""
                                                            }`}
                                                        </p>
                                                        <p>
                                                            <strong>Apellidos:</strong>{" "}
                                                            {`${clienteEncontrado.primerApellido} ${clienteEncontrado.segundoApellido}`}
                                                        </p>
                                                        
                                                    </>
                                                ) : (
                                                    <p>
                                                        <strong>Razón Social y Nombre Comercial:</strong>{" "}
                                                        {`${clienteEncontrado.razonSocial} 
                                                        ${clienteEncontrado.nombreComercial}`}
                                                    </p>
                                                )}
                                                <p>
                                                    <strong>Email:</strong> {clienteEncontrado.email}
                                                </p>
                                                <p>
                                                    <strong>Estado:</strong>
                                                    <span
                                                        style={{
                                                            padding: "0.25rem 0.5rem",
                                                            borderRadius: "4px",
                                                            backgroundColor:
                                                                clienteEncontrado.estado === "Activo"
                                                                    ? "#28a745"
                                                                    : "#dc3545",
                                                            color: "white",
                                                            fontSize: "0.8rem",
                                                            marginLeft: "0.5rem",
                                                        }}
                                                    >
                                                        {clienteEncontrado.estado}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="actions-card" style={{
                                            padding: '1.5rem',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px'
                                        }}>
                                            <h3 style={{ color: '#666', marginBottom: '1rem' }}>Acciones</h3>
                                            <div style={{ display: 'grid', gap: '1rem' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/clientes/${clienteEncontrado.id}/cuentas`)}
                                                    style={{
                                                        background: '#007bff',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fas fa-wallet"></i>
                                                    Ver Cuentas
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/clientes/${clienteEncontrado.id}/tarjetas`)}
                                                    style={{
                                                        background: '#6c757d',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fas fa-credit-card"></i>
                                                    Ver Tarjetas
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/clientes/${clienteEncontrado.id}/editar`)}
                                                    style={{
                                                        background: '#ffc107',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    Editar Información
                                                </button>
                                                <button
                                                    onClick={() => setShowModal(true)}
                                                    style={{
                                                        background: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fas fa-ban"></i>
                                                    Desactivar Cliente
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal de confirmación para desactivar */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Estás seguro?</h2>
                        <p>¿Deseas desactivar al cliente {clienteEncontrado?.nombre}?</p>
                        <div className="modal-buttons">
                            <button 
                                className="copy-button"
                                onClick={() => {
                                    // Aquí iría la lógica para desactivar
                                    setShowModal(false);
                                }}
                            >
                                Confirmar
                            </button>
                            <button 
                                className="close-button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionClientes;
