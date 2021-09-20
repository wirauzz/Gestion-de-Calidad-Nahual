import axios from "axios";
const BASE_ROUTE_AUTENTIFICATION = process.env.REACT_APP_AUTENTICACION_NAHUAL_API;

export const AccesosService = {
    VerificarAccesoApp (email) {
        return axios.post(`${BASE_ROUTE_AUTENTIFICATION}/verificarAccesoApps`,{email}); 
    },

    SolicitarAccesoApps (body) {
        return axios.post(`${BASE_ROUTE_AUTENTIFICATION}/solicitudes`,body); 
    }
}

export default AccesosService;