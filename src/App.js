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
import '@fortawesome/fontawesome-free/css/all.min.css'; //iconos


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/loginEmpresa" element={<LoginEmpresa />} />
        <Route path="/password" element={<Password />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
        <Route path="/cuentas" element={<PrivateRoute component={Cuentas} />} />
        <Route
          path="/cuentas/detalle-movimientos"
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
          path="/tarjetas-credito/historial"
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
      </Routes>
    </Router>
  );
};

// const PrivateRoute = ({ component: Component }) => {
//   const isAuthenticated = true; // Reemplaza con tu lógica real
//   return isAuthenticated ? <Component /> : <Navigate to="/" />;
// };

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = true; // Reemplaza esto con tu lógica real de autenticación

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};


export default App;
