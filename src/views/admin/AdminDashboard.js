import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            <AdminSidebar />
            
            <div className="main-content">
                <div className="header">
                    <h1>Panel de Administración</h1>
                </div>

                <div style={{ padding: '2rem' }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h2>Bienvenido al Panel de Administración</h2>
                        <p style={{ marginTop: '1rem' }}>
                            Seleccione una opción del menú lateral para comenzar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 