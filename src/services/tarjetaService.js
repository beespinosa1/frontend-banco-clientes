import Service from "./service"

class TarjetaService extends Service {
  constructor() {
    super('tarjetas')
  }
}

const tarjetaService = new TarjetaService()

export default tarjetaService;