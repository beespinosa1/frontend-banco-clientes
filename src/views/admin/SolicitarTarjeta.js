import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/AdminSidebar';

const SolicitarTarjeta = () => {
    const navigate = useNavigate();
    const [tipoCliente, setTipoCliente] = useState('');
    const [cedula, setCedula] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [tipoTarjeta, setTipoTarjeta] = useState('');
    const [error, setError] = useState('');

    const buscarCliente = async () => {
        if (!cedula.trim()) {
            setError('Por favor, ingrese una identificación');
            return;
        }

        try {
            let endpoint = tipoCliente === 'natural' 
                ? `http://localhost:8080/v1/personas-naturales/identificacion/${cedula}`
                : `http://localhost:8080/v1/personas-juridicas/identificacion/${cedula}`;

            const response = await fetch(endpoint);
            
            if (response.ok) {
                const data = await response.json();
                setClienteEncontrado(data);
                setError('');
            } else {
                setError('Cliente no encontrado');
                setClienteEncontrado(null);
            }
        } catch (error) {
            setError('Error de conexión');
            setClienteEncontrado(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/v1/tarjetas/solicitudes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clienteId: clienteEncontrado.id,
                    tipoCliente: tipoCliente,
                    tipoTarjeta: tipoTarjeta
                })
            });

            if (response.ok) {
                navigate('/admin/clientes');
            } else {
                const data = await response.json();
                setError(data.message || 'Error al solicitar la tarjeta');
            }
        } catch (error) {
            setError('Error de conexión');
        }
    };

    return (
        <div className="dashboard-container">
            <AdminSidebar />
            
            <div className="main-content">
                <div className="header">
                    <h1>Solicitar Tarjeta de Crédito</h1>
                </div>

                <div style={{ padding: '2rem' }}>
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
                            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Seleccione el tipo de cliente</h2>
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
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'flex-end',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{ flex: '1', minWidth: '200px', maxWidth: '300px' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                color: '#666',
                                                fontWeight: 'bold'
                                            }}>
                                                {tipoCliente === 'natural' ? 'Cédula de la Persona' : 'RUC de la Empresa'}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={tipoCliente === 'natural' ? "Ingrese la cédula..." : "Ingrese el RUC..."}
                                                value={cedula}
                                                onChange={(e) => setCedula(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '4px',
                                                    border: '1px solid #ddd'
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            <button
                                                onClick={buscarCliente}
                                                style={{
                                                    background: '#ff6b35',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <i className="fas fa-search"></i>
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>
                                        {error}
                                    </p>
                                )}
                            </div>

                            {/* Información del cliente y formulario de tarjeta */}
                            {clienteEncontrado && (
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '2rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                                        Solicitud de Tarjeta de Crédito
                                    </h2>
                                    
                                    {/* Información del cliente */}
                                    <div style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                        marginBottom: '2rem'
                                    }}>
                                        <h3 style={{ color: '#666', marginBottom: '1rem' }}>
                                            Datos del Cliente {tipoCliente === 'natural' ? 'Natural' : 'Jurídico'}
                                        </h3>
                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                            <p><strong>Identificación:</strong> {clienteEncontrado.identificacion}</p>
                                            {tipoCliente === 'natural' ? (
                                                <p><strong>Nombre:</strong> {`${clienteEncontrado.primerNombre} ${clienteEncontrado.segundoNombre || ''} ${clienteEncontrado.primerApellido} ${clienteEncontrado.segundoApellido}`}</p>
                                            ) : (
                                                <p><strong>Razón Social:</strong> {clienteEncontrado.razonSocial}</p>
                                            )}
                                            <p><strong>Email:</strong> {clienteEncontrado.email}</p>
                                        </div>
                                    </div>

                                    {/* Formulario de solicitud */}
                                    <form onSubmit={handleSubmit}>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                color: '#666',
                                                fontWeight: 'bold'
                                            }}>
                                                Tipo de Tarjeta *
                                            </label>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: '1rem'
                                            }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setTipoTarjeta('VISA')}
                                                    style={{
                                                        padding: '1.5rem',
                                                        border: tipoTarjeta === 'VISA' ? '2px solid #007bff' : '2px solid #ddd',
                                                        borderRadius: '8px',
                                                        background: tipoTarjeta === 'VISA' ? '#f8f9fa' : 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fab fa-cc-visa" style={{ fontSize: '2rem', color: '#1a1f71' }}></i>
                                                    <span style={{ fontWeight: 'bold', color: '#333' }}>Visa</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setTipoTarjeta('MASTERCARD')}
                                                    style={{
                                                        padding: '1.5rem',
                                                        border: tipoTarjeta === 'MASTERCARD' ? '2px solid #007bff' : '2px solid #ddd',
                                                        borderRadius: '8px',
                                                        background: tipoTarjeta === 'MASTERCARD' ? '#f8f9fa' : 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <i className="fab fa-cc-mastercard" style={{ fontSize: '2rem', color: '#eb001b' }}></i>
                                                    <span style={{ fontWeight: 'bold', color: '#333' }}>Mastercard</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <button
                                                type="button"
                                                onClick={() => navigate('/admin/clientes')}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    background: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!tipoTarjeta}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    background: tipoTarjeta ? '#ff6b35' : '#ccc',
                                                    color: 'white',
                                                    cursor: tipoTarjeta ? 'pointer' : 'not-allowed'
                                                }}
                                            >
                                                Solicitar Tarjeta
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SolicitarTarjeta; 