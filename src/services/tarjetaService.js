import axios from 'axios';

// Usa la URL base definida en el archivo .env
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/tarjetas`;

// Obtener tarjetas de un cliente
export const listarTarjetas = async (idCliente) => {
  try {
    const response = await axios.get(`${BASE_URL}/${idCliente}`);
    return response.data.datos; // Retorna el cuerpo de la respuesta
  } catch (error) {
    console.error('Error al listar tarjetas:', error);
    throw error;
  }
};

// Obtener detalles de una tarjeta específica por ID
export const obtenerTarjeta = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log('Datos recibidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener tarjeta:', error);
    throw error;
  }
};

// Crear una nueva tarjeta
export const crearTarjeta = async (datosTarjeta) => {
  try {
    const response = await axios.post(BASE_URL, datosTarjeta);
    return response.data;
  } catch (error) {
    console.error('Error al crear tarjeta:', error);
    throw error;
  }
};

// Activar una tarjeta por ID
export const activarTarjeta = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/activar`);
    return response.data;
  } catch (error) {
    console.error('Error al activar tarjeta:', error);
    throw error;
  }
};

// Inactivar una tarjeta por ID
export const inactivarTarjeta = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/inactivar`);
    return response.data;
  } catch (error) {
    console.error('Error al inactivar tarjeta:', error);
    throw error;
  }
};
