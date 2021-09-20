import React from "react";
import ReactExport from "react-data-export";
import moment from "moment";
import "moment/locale/es";
import { Button } from "semantic-ui-react";

const Boton = ({ cantidad, deseleccionarAlumnes }) => {
  let desHabilitado = false;
  if (cantidad === 0) desHabilitado = true;
  return (
    <Button
      onClick={deseleccionarAlumnes}
      floated="left"
      color="green"
      content="Exportar"
      icon="download"
      disabled={desHabilitado}
      label={{
        basic: true,
        color: "green",
        pointing: "left",
        content: cantidad
      }}
    />
  );
};
const estilos = {
  fill: { fgColor: { rgb: "81ce32" } },
  font: { bold: true, sz: 14, color: { rgb: "ffffff" } },
  alignment: { vertical: "center", horizontal: "center" },
  border: {
    top: { style: "medium", color: { rgb: "66a527" } },
    bottom: { style: "medium", color: { rgb: "66a527" } },
    left: { style: "medium", color: { rgb: "66a527" } },
    right: { style: "medium", color: { rgb: "66a527" } }
  }
};

const conjuntoDeDatos = [
  {
    columns: [
      {
        title: "Nro.",
        width: { wpx: 40 },
        style: estilos
      },
      {
        title: "Nombre y Apellido",
        width: { wpx: 200 },
        style: estilos
      },
      {
        title: "Correo Electrónico",
        width: { wpx: 200 },
        style: estilos
      },
      {
        title: "Teléfono",
        width: { wpx: 110 },
        style: estilos
      },
      {
        title: "Sede",
        width: { wpx: 90 },
        style: estilos
      },
      {
        title: "Nodo",
        width: { wpx: 90 },
        style: estilos
      },
      {
        title: "Nivel de Inglés",
        width: { wpx: 130 },
        style: estilos
      },
      {
        title: "Fecha de Nacimiento",
        width: { wpx: 200 },
        style: estilos
      }
    ],
    data: []
  }
];

function PrimeraLetraEnMayuscula(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

const generarFila = (alumne, numeroDeFila) => {
  const fechaDeNacimiento = alumne.fechaNacimiento
    ? moment(alumne.fechaNacimiento).format("L")
    : "";
  return [
    numeroDeFila + 1,
    PrimeraLetraEnMayuscula(alumne.nombre + " " + alumne.apellido),
    alumne.correo,
    alumne.celular,
    alumne.sede && alumne.sede.nombre,
    alumne.nodo && alumne.nodo.nombre,
    alumne.nivelIngles && alumne.nivelIngles.nombre,
    fechaDeNacimiento
  ];
};

const BotonExportar = ({ seleccionados, deseleccionarAlumne }) => {
  moment.locale("es");
  const fecha_descarga = moment(Date.now()).format("LL");
  const filas = seleccionados.map((alumne, index) => {
    return generarFila(alumne.estudiante, index);
  });
  conjuntoDeDatos[0].data = filas;
  const ArchivoExcel = ReactExport.ExcelFile;
  const HojaExcel = ReactExport.ExcelFile.ExcelSheet;

  return (
    <div>
      {seleccionados.length ? (
        <ArchivoExcel
          filename={`Alumnes Exportados - ${fecha_descarga}`}
          element={
            <Boton
              cantidad={seleccionados.length}
              deseleccionarAlumnes={deseleccionarAlumne}
            />
          }
        >
          <HojaExcel dataSet={conjuntoDeDatos} name="Alumnes"></HojaExcel>
        </ArchivoExcel>
      ) : (
        <Boton cantidad={seleccionados.length} />
      )}
    </div>
  );
};

export default BotonExportar;
