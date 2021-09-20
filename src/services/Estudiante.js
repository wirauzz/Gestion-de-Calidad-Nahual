import BASE_ROUTE from "./rutas";
import axios from "axios";

function ObtenerEgresades() {
    return axios.get(`${BASE_ROUTE}/egresades/DTO`);
}

function ObtenerEgresade(idEgresade){
    return axios.get(`${BASE_ROUTE}/egresades/${idEgresade}/DTO`);
}

function EliminarEstudiante(idEstudiante,body) {
    return axios.delete(`${BASE_ROUTE}/estudiantes/${idEstudiante}`);
}

function ObtenerEstudiantes() {
    return axios.get(`${BASE_ROUTE}/estudiantes/DTO`);
}

function ObtenerEstudianteSinDTO(id){
    return axios.get(`${BASE_ROUTE}/estudiantes/${id}`);
}


function ActualizarEstudiante(idEgresade,egresadeAEnviar){
    return axios.put(`${BASE_ROUTE}/estudiantes/${idEgresade}`, egresadeAEnviar)
}

function CrearEstudiante(body){
    return axios.post(`${BASE_ROUTE}/estudiantes`, body);
}
export  {
    ObtenerEgresades,
    EliminarEstudiante,
    ObtenerEgresade,
    ObtenerEstudiantes,
    ActualizarEstudiante,
    CrearEstudiante,
    ObtenerEstudianteSinDTO
};
