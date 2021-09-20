import BASE_ROUTE from "./rutas";

function obtenerEstados() {
  return fetch(`${BASE_ROUTE}/estados`);
}

export { obtenerEstados };
