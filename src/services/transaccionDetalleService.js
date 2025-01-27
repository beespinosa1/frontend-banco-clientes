import Service from "./service"

class TransaccionDetalleService extends Service {
  constructor() {
    super('v1/transaccionDetalle')
  }

  async listarTransaccionDetalles() {
    const endpoint = this.endpoint + '?idTransaccion=' + localStorage.getItem("idTransaccion");

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

const transaccionDetalleService = new TransaccionDetalleService()

export default transaccionDetalleService;