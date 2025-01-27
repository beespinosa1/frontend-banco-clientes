import Service from "./service"

class TarjetaService extends Service {
  constructor() {
    super('tarjetas')
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
}

const tarjetaService = new TarjetaService()

export default tarjetaService;