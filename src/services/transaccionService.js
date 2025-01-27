import Service from "./service"

class TransaccionService extends Service {
  constructor() {
    super('transaccion')
  }

  async listarTransaccionCliente() {
    const endpoint = this.endpoint + '?idCuenta=' + localStorage.getItem("clienteId");

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

const transaccionService = new TransaccionService()

export default transaccionService;