import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import LoginEmpresa from './views/LoginEmpresa';
import PaginaPrincipal from './views/PaginaPrincipal';
import Cuentas from './views/Cuentas';
import CuentasDetalleMovimientos from './views/CuentasDetalleMovimientos';
import TarjetasCreditoPrincipal from './views/TarjetasCreditoPrincipal';
import TarjetasCreditoDiferidos from './views/TarjetasCreditoDiferidos';
import TarjetasCreditoHistoriales from './views/TarjetasCreditoHistoriales';
import TarjetasCreditoBloqueos from './views/TarjetasCreditoBloqueos';
import TarjetasCreditoCupos from './views/TarjetasCreditoCupos';
import Password from './views/Password';
import Register from './views/Register';
import AdminDashboard from './views/admin/AdminDashboard';
import GestionClientes from './views/admin/GestionClientes';
import NuevoCliente from './views/admin/NuevoCliente';
import SolicitarTarjeta from './views/admin/SolicitarTarjeta';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas del Cliente */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/loginEmpresa" element={<LoginEmpresa />} />
        <Route path="/password" element={<Password />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
        <Route path="/cuentas" element={<PrivateRoute component={Cuentas} />} />
        <Route
          path="/cuentas/detalle-movimientos/:id"
          element={<PrivateRoute component={CuentasDetalleMovimientos} />}
        />
        <Route
          path="/tarjetas-credito/principal"
          element={<PrivateRoute component={TarjetasCreditoPrincipal} />}
        />
        <Route
          path="/tarjetas-credito/diferidos"
          element={<PrivateRoute component={TarjetasCreditoDiferidos} />}
        />
        <Route
          path="/tarjetas-credito/historial/:id"
          element={<PrivateRoute component={TarjetasCreditoHistoriales} />}
        />
        <Route
          path="/tarjetas-credito/bloqueos"
          element={<PrivateRoute component={TarjetasCreditoBloqueos} />}
        />
        <Route
          path="/tarjetas-credito/cupos"
          element={<PrivateRoute component={TarjetasCreditoCupos} />}
        />

        {/* Rutas Administrativas */}
        <Route path="/admin" element={<AdminRoute component={AdminDashboard} />} />
        <Route path="/admin/clientes" element={<AdminRoute component={GestionClientes} />} />
        <Route path="/admin/clientes/nuevo" element={<AdminRoute component={NuevoCliente} />} />
        <Route path="/admin/solicitar-tarjeta" element={<AdminRoute component={SolicitarTarjeta} />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem('clienteId') !== null;
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

const AdminRoute = ({ component: Component }) => {
  // Aquí deberías implementar la lógica para verificar si el usuario es un administrador
  const isAdmin = true; // Reemplaza esto con tu lógica real de verificación de admin
  return isAdmin ? <Component /> : <Navigate to="/admin" />;
};

export default App;
