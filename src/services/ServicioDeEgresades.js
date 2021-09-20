import axios from "axios";
import BASE_ROUTE from "./rutas";

const ServicioDeEgresades  = {
    obtenerEgresades(){
      return axios.get(`${BASE_ROUTE }/egresades/desempleados/DTO`)
    }
}

export default ServicioDeEgresades;