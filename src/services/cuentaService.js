import axios from "axios";

const API_BASE_URL = "/cuentas"; // Base URL para las rutas de cuentas

// Listar cuentas por cliente
export const listarCuentasPorCliente = async (idCliente) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { idCliente }, // Pasa el idCliente como parámetro
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al listar cuentas");
  }
};

// Mostrar detalles de una cuenta por ID
export const mostrarCuenta = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al mostrar la cuenta");
  }
};

// Crear una nueva cuenta
export const crearCuenta = async (cuentaData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, cuentaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al crear la cuenta");
  }
};

// Realizar un depósito en una cuenta
export const depositarEnCuenta = async (depositoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/deposito`, depositoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al realizar el depósito");
  }
};

// Activar una cuenta por ID
export const activarCuenta = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/activar`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al activar la cuenta");
  }
};

// Inactivar una cuenta por ID
export const inactivarCuenta = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/inactivar`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Error al inactivar la cuenta");
  }
};
