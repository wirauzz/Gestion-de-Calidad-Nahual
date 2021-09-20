import axios from "axios";
import BASE_ROUTE from "./rutas";


const ServicioDeFiltrado  = {
  obtenerOpcionesDeModulosCompletados(){
    return axios.get(`${BASE_ROUTE }/topicos`)
  },
  obtenerOpcionesDeNivelDeIngles(){
    return axios.get(`${BASE_ROUTE}/nivel-ingles`)
  },
  obtenerOpcionesDeNodos(){
    return axios.get(`${BASE_ROUTE }/nodos`)
  },
  obtenerOpcionesDeEstado(){
    return axios.get(`${BASE_ROUTE }/estados`)
  }
}

export default ServicioDeFiltrado;