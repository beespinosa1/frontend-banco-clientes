import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/TarjetaCredito.css';
import { AdminSidebar } from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      
      <div className="main-content">
        <div className="header">
          <h1>Panel Administrativo</h1>
        </div>

        <div className="diferidos-section">
          <div className="card-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            padding: '1rem'
          }}>
            {/* Tarjetas de opciones administrativas */}
            <div className="tarjeta-item" onClick={() => navigate('/admin/clientes')} style={{cursor: 'pointer'}}>
              <div className="tarjeta-header">
                <h3>Gestión de Clientes</h3>
              </div>
              <div className="tarjeta-body">
                <p>Crear y administrar clientes del banco</p>
                <i className="fas fa-users" style={{ fontSize: '2rem', marginTop: '1rem' }}></i>
              </div>
            </div>

            <div className="tarjeta-item" onClick={() => navigate('/admin/solicitar-tarjeta')} style={{cursor: 'pointer'}}>
              <div className="tarjeta-header">
                <h3>Solicitudes de Tarjetas</h3>
              </div>
              <div className="tarjeta-body">
                <p>Gestionar solicitudes de tarjetas de crédito</p>
                <i className="fas fa-credit-card" style={{ fontSize: '2rem', marginTop: '1rem' }}></i>
              </div>
            </div>

            <div className="tarjeta-item" onClick={() => navigate('/admin/reportes')} style={{cursor: 'pointer'}}>
              <div className="tarjeta-header">
                <h3>Reportes</h3>
              </div>
              <div className="tarjeta-body">
                <p>Ver reportes y estadísticas</p>
                <i className="fas fa-chart-bar" style={{ fontSize: '2rem', marginTop: '1rem' }}></i>
              </div>
            </div>

            <div className="tarjeta-item" onClick={() => navigate('/admin/configuracion')} style={{cursor: 'pointer'}}>
              <div className="tarjeta-header">
                <h3>Configuración</h3>
              </div>
              <div className="tarjeta-body">
                <p>Configuración del sistema</p>
                <i className="fas fa-cogs" style={{ fontSize: '2rem', marginTop: '1rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 