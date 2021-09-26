import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import DetalleDeAlumne from "./DetalleDeAlumne/DetalleDeAlumne";
import EliminarAlumne from './Alumne/EliminarAlumne';
import { obtenerCurso } from '../../../services/Curso'
import { obtenerEstados } from '../../../services/Estado'
import EditarAlumne from "./Alumne/EditarAlumne";


function Alumne(props) {
  const [esEgresade, setEsEgresade] = useState(null)
  const [estado, setEstado] = useState('')

  useEffect(() => {
    inicializar();
  }, [props.cursoId]);

  function PrimeraLetraEnMayuscula(nombreCompleto) {
    return nombreCompleto.replace(/\b\w/g, l => l.toUpperCase());
  }

  function seleccionarUnAlumne(alumne) {
    let checkboxes = Array.from(document.getElementsByName("checkbox"));
    const estudiante = {
      estudiante: alumne
    }
    props.seleccionarAlumne(estudiante, checkboxes[props.numeracion].checked);
  }
  function getCurso(params) {
    obtenerCurso(props.cursoId)
      .then(curso => { return curso.json() })
      .then(curso => {
        if (curso.respuesta != null) {
          setEsEgresade(curso.respuesta.esEgresade);
        };
      });
  }

  function getEstado() {
    obtenerEstados()
      .then(estados => { return estados.json() })
      .then(estados => {
        if (estados.response != null) {
          setEstado(estados.response.filter(estado => estado.id === props.item.estadoId)[0].nombre)
        }
      });
  }


  function inicializar() {
    getCurso();
    getEstado();
  }


  return (

    <Table.Row>
      <Table.Cell style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          name="checkbox"
          style={{ transform: "scale(1.4)" }}
          onClick={() => seleccionarUnAlumne(props.item)}
        />
      </Table.Cell>
      <Table.Cell>
        {PrimeraLetraEnMayuscula(props.item.nombre + " " + props.item.apellido)}
      </Table.Cell>
      <Table.Cell>
        {estado}
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <div className={"displayFlex centered columnGap"}>
          <DetalleDeAlumne id={props.item.id} filtrarAlumne={(id) => props.filtrarAlumne(id)} ></DetalleDeAlumne>
          {esEgresade ? null :
            <EditarAlumne
              alumneId={props.item.id}
              actualizarAlumnes={props.actualizarAlumnes} 
              cursoId={props.cursoId}
              />}
          {esEgresade ? null :
            <EliminarAlumne
              alumneId={props.item.id}
              curseId={props.cursoId}
              actualizarAlumnes={props.actualizarAlumnes}
            />
          }
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default Alumne;
