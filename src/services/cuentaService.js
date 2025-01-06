import Service from "./service"

class CuentaService extends Service {
  constructor() {
    super('cuentas')
  }

  async listarCuentasCliente() {
    const endpoint = this.endpoint + '?idCliente=' + localStorage.getItem("clienteId");

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