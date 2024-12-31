import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import PaginaPrincipal from './views/PaginaPrincipal';
import Cuentas from './views/Cuentas';
import CuentasDetalleMovimientos from './views/CuentasDetalleMovimientos';
import TarjetasCreditoPrincipal from './views/TarjetasCreditoPrincipal';
import TarjetasCreditoDiferidos from './views/TarjetasCreditoDiferidos';
import TarjetasCreditoBloqueos from './views/TarjetasCreditoBloqueos';
import TarjetasCreditoCupos from './views/TarjetasCreditoCupos';
import Password from './views/Password'; // Nueva ruta para contraseña
import Register from './views/Register'; // Nueva ruta para registro

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para la página de contraseña */}
        <Route path="/Password" element={<Password />} />

        {/* Ruta para la página de registro */}
        <Route path="/Register" element={<Register />} />

        {/* Ruta para la página principal */}
        <Route path="/principal" element={<PrivateRoute component={PaginaPrincipal} />} />

        {/* Ruta para Cuentas */}
        <Route path="/cuentas" element={<PrivateRoute component={Cuentas} />} />

        {/* Ruta para Detalle de Movimientos de una Cuenta */}
        <Route path="/cuentas/detalle-movimientos" element={<PrivateRoute component={CuentasDetalleMovimientos} />} />

        {/* Rutas para Tarjetas de Crédito */}
        <Route path="/tarjetas-credito/principal" element={<PrivateRoute component={TarjetasCreditoPrincipal} />} />
        <Route path="/tarjetas-credito/diferidos" element={<PrivateRoute component={TarjetasCreditoDiferidos} />} />
        <Route path="/tarjetas-credito/bloqueos" element={<PrivateRoute component={TarjetasCreditoBloqueos} />} />
        <Route path="/tarjetas-credito/cupos" element={<PrivateRoute component={TarjetasCreditoCupos} />} />
      </Routes>
    </Router>
  );
};

// PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true; // Aquí deberías verificar tu estado de autenticación

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default App;
