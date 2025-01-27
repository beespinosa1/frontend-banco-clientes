import Service from "./service"

class CuentaService extends Service {
  constructor() {
    super('cuentas')
  }

  async listarCuentasCliente() {
    const usuario = JSON.parse(localStorage.getItem('cliente'));
    const endpoint = this.endpoint + '?idCliente=' + usuario.clienteId;

    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }
}

const cuentaService = new CuentaService()

export default cuentaService;