import BASE_ROUTE from "./rutas";
import axios from "axios";

function ObtenerNodosYSedes() {
    return axios.get(`${BASE_ROUTE}/nodos/`);
}

function obtenerNodos() {
    return fetch(`${BASE_ROUTE}/nodos`);
}

function obtenerSedesPorIdNodo(id) {
    return fetch(`${BASE_ROUTE}/nodos/${id}/sedes`);
}

function eliminarSede(id) {
    return axios.delete(`${BASE_ROUTE}/nodos/sedes/${id}`);
}

function obtenerSede(id) {
    return fetch(`${BASE_ROUTE}/nodos/`)
}

export {
    ObtenerNodosYSedes, obtenerNodos, obtenerSedesPorIdNodo, eliminarSede, obtenerSede
};
