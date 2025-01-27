import Service from "./service"

class CuentaService extends Service {
  constructor() {
    super('v1/cuentas')
  }

  async listarCuentasCliente() {
    const endpoint = this.endpoint + '?idCliente=' + localStorage.getItem('clienteId');
    console.log(endpoint);
    try {
      const response = await this.api.get(endpoint);
      console.log("Respuesta endpoint");
      console.log(response.data);
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