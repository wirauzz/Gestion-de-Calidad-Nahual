import axios from "axios";
import BASE_ROUTE from "../../../../services/rutas";
let [
  filtrarPorModuloCompletado,
  filtrarPorNivelDeIngles,
  filtrarPorNombreDeNodo,
  filtroDeConsulta,
] = ["", "", "", "", ""];

function FabricaDeFiltros(criterioDeFiltrado) {
  establecerVariablesDeFiltroLocal(criterioDeFiltrado);
  filtroDeConsulta = construirFiltroDeConsulta();
  return axios.get(
    `${BASE_ROUTE}/egresades/desempleados/DTO?${filtroDeConsulta}`
  );
}

function removerUnFiltro(filtro) {
  switch (filtro.value) {
    case "moduloCompletado":
      filtrarPorModuloCompletado = "";
      break;
    case "nivelDeIngles":
      filtrarPorNivelDeIngles = "";
      break;
    case "nodo":
      filtrarPorNombreDeNodo = "";
      break;
    default:
      reiniciarFiltros();
      break;
  }
}

function establecerVariablesDeFiltroLocal(criterioDeFiltrado) {
  switch (criterioDeFiltrado.filterby) {
    case "moduloCompletado":
      if (criterioDeFiltrado.value === "Todos") filtrarPorModuloCompletado = "";
      else filtrarPorModuloCompletado = `topico=${criterioDeFiltrado.value}&`;
      break;
    case "nivelDeIngles":
      if (criterioDeFiltrado.value === "Todos") filtrarPorNivelDeIngles = "";
      else filtrarPorNivelDeIngles = `nivelInglesId=${criterioDeFiltrado.value}&`;
      break;
    case "nodo":
      if (criterioDeFiltrado.value === "Todos") filtrarPorNombreDeNodo = "";
      else filtrarPorNombreDeNodo = `nodoId=${criterioDeFiltrado.value}&`;
      break;
    case "Todos":
      reiniciarFiltros();
      break;
    case "SinFiltros":
      removerUnFiltro(criterioDeFiltrado);
      break;
    default:
      alert(
        "Parece haber un error con la base de datos, intentelo nuevamente."
      );
      break;
  }
}

function reiniciarFiltros() {
  filtrarPorNivelDeIngles = "";
  filtrarPorNombreDeNodo = "";
  filtrarPorModuloCompletado = "";
}

function construirFiltroDeConsulta() {
  let consulta = "";
  return consulta.concat(
    filtrarPorModuloCompletado,
    filtrarPorNivelDeIngles,
    filtrarPorNombreDeNodo,
  );
}

export default FabricaDeFiltros;
