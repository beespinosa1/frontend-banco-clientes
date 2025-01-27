import Service from "./service";

class TransCuentaService extends Service {
  constructor() {
    super("v1/transacciones/cuenta");
  }

  async listarTransCuentasCliente(id) {
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

const transCuentaService = new TransCuentaService();

export default transCuentaService;