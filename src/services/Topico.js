import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerTopicos() {
    return axios.get(`${BASE_ROUTE}/topicos`);
}

function crearTopico(body) {
    return axios.post(`${BASE_ROUTE}/topicos`, body);
}

function eliminarTopico(id) {
    return axios.delete(`${BASE_ROUTE}/topicos/${id}`);
}

function editarTopico(id,body){
    console.log('elbody',body)
    return axios.put(`${BASE_ROUTE}/topicos/${id}`,body);
}

export  {
    obtenerTopicos,
    crearTopico,
    eliminarTopico,
    editarTopico
};
