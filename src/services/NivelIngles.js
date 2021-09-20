import BASE_ROUTE from "./rutas";

function obtenerNivelesIngles() {
  return fetch(`${BASE_ROUTE}/nivel-ingles`);
}

export { obtenerNivelesIngles };
