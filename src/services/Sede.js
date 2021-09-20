import BASE_ROUTE from "./rutas";

function obtenerSedes() {
  return fetch(`${BASE_ROUTE}/sedes`);
}

export { obtenerSedes };