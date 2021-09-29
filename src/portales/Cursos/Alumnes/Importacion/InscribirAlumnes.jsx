import React, { useState } from 'react';
import { Button, Modal, Grid } from "semantic-ui-react";
import { crearInscripto, eliminarInscripto } from '../../../../services/Inscripto';
import { EliminarEstudiante, CrearEstudiante } from '../../../../services/Estudiante'
import servicioNotificacion from "../../../../layouts/Notificaciones";

export default function InscribirAlumnes({ eliminados, alumnes, setAlumnes, curso, setPrimerModal, eliminar, setMostrarLista, actualizarAlumnes }) {

  const [segundoModal, setSegundoModal] = useState(false)

  function reset() {
    setSegundoModal(false);
    setPrimerModal(false);
    setAlumnes([]);
    setMostrarLista(false);
  }

  function desInscribirYEliminarAlumnes() {
    eliminados.forEach(alumne => {
      eliminarInscripto(alumne.id)
        .then((x) => {
          return x.data;
        })
        .then((x) => {
          return x.result;
        })
        .then((x) => {
          EliminarEstudiante(alumne.estudiante.id)
        });
    });
  }

  function setFormatoFecha(fecha) {
    if (fecha) {
      let splittedDate = fecha.split("/");
      let preparedDate = splittedDate[1] + "/" + splittedDate[0] + "/" + splittedDate[2];
      return preparedDate;
    }
    else
      return null;
  }

  function mostrarNotificacion() {
    servicioNotificacion.mostrarMensajeExito(
      'Alumnes importados correctamente',
      ''
    );
  }
  function crearEInscribirAlumnes() {
    alumnes.forEach(alumne => {
      CrearEstudiante({
        dni: alumne.dni,
        nombre: alumne.nombre,
        apellido: alumne.apellido,
        correo: alumne.correo,
        celular: alumne.celular,
        fechaNacimiento: setFormatoFecha(alumne.fechaNacimiento),
        sedeId: alumne.sedeId,
        nodoId: alumne.nodoId,
        estadoId: 1,
        nivelInglesId: alumne.nivelInglesId,
        nacionalidad: alumne.nacionalidad,
        correoOpcional: alumne.correoOpcional,
        detalle: alumne.detalle,
        tipoDNI: alumne.tipoDNI
      })
        .then((x) => {

          return x.data;
        })
        .then((x) => {
          return x.result;
        })
        .then((x) => {
          crearInscripto({
            estudianteId: x.id,
            cursoId: curso.id
          })
          .then(()=>{
            actualizarAlumnes(curso.id)
            mostrarNotificacion();
          });
          return x;
        });
    })
  }

  function inicializar() {
    setSegundoModal(true);
    desInscribirYEliminarAlumnes();
  }


  function confirmar() {
    crearEInscribirAlumnes();
    reset();
  }

  return (
    <>
      <Button
        className="confirmButton"
        floated="left"
        content="Confirmar"
        disabled={!eliminar}
        onClick={async () => { inicializar() }}
      />

      <Modal
        open={segundoModal}
        onClose={() => { reset() }}
        closeIcon
        centered={true}
        size='tiny'
      >

        <Modal.Header
          content='Alumnes Inscriptes'
          centered
        />

        <Modal.Content>
          <Modal.Description content="Se eliminaron los Alumnes Registrados y se inscribieron los Nuevos Alumnes" />
        </Modal.Content>

        <Modal.Actions style={{ height: '65px' }}>
          <Grid style={{ margin: '0 0 0 0', position: 'absolute', right: '10px' }}>
            <Button
              className="confirmButton"
              icon='check'
              content='Continuar'
              onClick={async () => confirmar()}
            />
          </Grid>
        </Modal.Actions>

      </Modal>
    </>
  )

}