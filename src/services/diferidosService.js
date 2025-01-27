import Service from "./service"

class DiferidosService extends Service {
  constructor() {
    super('v1/diferidos')
  }

  async listarDiferidosTransacciones() {
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

const diferidosService = new DiferidosService()

export default diferidosService;