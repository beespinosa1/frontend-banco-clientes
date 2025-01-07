import Service from "./service";

class TransTarjetaService extends Service {
  constructor() {
    super("/transacciones/tarjeta");
  }

  async listarTransTarjetasCliente(id) {
    const endpoint = this.endpoint + "/" +id;

    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response) throw error;

      const { data, status } = error.response;
      throw { data, status };
    }
  }
}

const transTarjetaService = new TransTarjetaService();

export default transTarjetaService;