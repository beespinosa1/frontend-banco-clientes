import Service from "./service"

class TarjetaService extends Service {
  constructor() {
    super('v1/tarjetas')
  }

  async listarTarjetasCliente() {
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

  async bloquearTarjeta(id) {
    const endpoint = this.endpoint + '/' + id + '/inactivar';

    try {
      const response = await this.api.put(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }

  async activarTarjeta(id) {
    const endpoint = this.endpoint + '/' + id + '/activar';

    try {
      const response = await this.api.put(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }
}

const tarjetaService = new TarjetaService()

export default tarjetaService;