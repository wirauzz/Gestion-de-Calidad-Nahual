import BASE_ROUTE from "./rutas";
import axios from "axios";


function obtenerCursosPorIdPeriodo(id) {
  return fetch(`${BASE_ROUTE}/periodos/${id}/cursos`);
}

function eliminarCursoDePeriodo(id, idCurso) {
  return axios.delete(`${BASE_ROUTE}/periodos/${id}/cursos/${idCurso}`);
}


export {
  obtenerCursosPorIdPeriodo,
  eliminarCursoDePeriodo
};
