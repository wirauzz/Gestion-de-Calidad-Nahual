import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerInscriptos() {
  return axios.get(`${BASE_ROUTE}/inscriptos`);
}
function crearInscripto(body) {
  return axios.post(`${BASE_ROUTE}/inscriptos`, body);
}
function obtenerInscriptosDeCurso(id) {
  return fetch(`${BASE_ROUTE}/cursos/${id}/inscriptes`);
}

function eliminarInscripto(id){
  return axios.delete(`${BASE_ROUTE}/inscriptos/${id}`);
}

function obtenerCurososDeEstudiante(id) {
  return fetch(`${BASE_ROUTE}/inscriptos/${id}/cursos`);
}

export { obtenerInscriptos, crearInscripto, obtenerInscriptosDeCurso, eliminarInscripto, obtenerCurososDeEstudiante};
