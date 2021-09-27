import React, { useState} from "react";
import { Button, Modal, Grid, Label, Table, Divider } from "semantic-ui-react";
import { obtenerCurso } from "../../../../services/Curso";
import {obtenerInscriptosDeCurso} from '../../../../services/Inscripto';
import Previsualizar from './Previsualizar'
import exampleXlsx from "../../../../assets/exampleAlumnes.csv";
import CargaCSV from "./CargaCSV.jsx"
import InscribirAlumnes from "./InscribirAlumnes"
export default function BotonImportar({idCurso, actualizarAlumnes}) {

  const [curso, setCurso] = useState ([]);
  const [alumnes, setAlumnes] = useState ([]);
  const [inscriptos, setInscriptos] = useState ([]);

  const [modalAbierto, setModalAbierto] = useState (false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  function reset (){
    setMostrarLista(false);
    setModalAbierto(false);
    setAlumnes([]);
  }

  function getCurso(idCurso){
    obtenerCurso(idCurso)
      .then((response) => {return response.json()})
      .then((response) => {
          setCurso(response.respuesta);
          console.log(response.respuesta);
      });
  }

  function getEliminados(idCurso){
    obtenerInscriptosDeCurso(idCurso)
      .then((response) => {return response.json()})
      .then((response) => {
        setInscriptos(response.response);
      });
  }
  
  function inicializar(){
    getCurso(idCurso); 
    getEliminados(idCurso);
    setModalAbierto(!modalAbierto);
    setConfirmar(false);
  }

  const cabeceras = ()=>{
    return (
      <Table.Header >
        <Table.Row>
          <Table.HeaderCell>DNI</Table.HeaderCell>
          <Table.HeaderCell>Tipo DNI</Table.HeaderCell>
          <Table.HeaderCell>Nombre/s</Table.HeaderCell>
          <Table.HeaderCell>Apellidos</Table.HeaderCell>
          <Table.HeaderCell>Correo Electronico</Table.HeaderCell>
          <Table.HeaderCell>Telefono</Table.HeaderCell>
          <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
          <Table.HeaderCell>Sede </Table.HeaderCell>
          <Table.HeaderCell>Nodo </Table.HeaderCell>
          <Table.HeaderCell>Nivel de Ingles</Table.HeaderCell>
          <Table.HeaderCell>Nacionalidad</Table.HeaderCell>
          <Table.HeaderCell>Correo Opcional</Table.HeaderCell>
          <Table.HeaderCell>Detalle</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  };

  return (
    <>
      <Button
        floated="left" 
        color="green" 
        content="Importar" 
        icon="upload" 
        onClick={() => {inicializar()}}
      />
            
      <Modal
        open={modalAbierto}
        onClose={() => {reset()}}
        closeIcon
        centered={true}
        size='large'
      >

        <Modal.Header 
          content='Importar Alumnes'
        />

        <Modal.Content>
          <Label 
            as='a' 
            color='green' 
            icon='file excel' 
            content='Cabeceras'
            ribbon 
          />

          <Table style={{marginTop:'-15px'}} celled>
            {cabeceras()}
          </Table>
          
          <Divider/>

          <Modal.Description>
            <CargaCSV setMostrarLista={setMostrarLista} setAlumnes={setAlumnes} curso={curso} setConfirmar={setConfirmar}/>
          </Modal.Description>
          {mostrarLista && alumnes !== [] ?
            <Previsualizar json={alumnes} />
            :
            <h2 align="center">No se cargo ningun archivo</h2>}

          <Grid>
            <Button href={exampleXlsx} 
            download='Ejemplo_Alumnes.csv' 
            content= 'Descargar Ejemplo'
            icon= 'download'
            color='green'
            />
          </Grid>
        </Modal.Content>

        <Modal.Actions style={{height: '65px'}}>
          <Grid style={{margin: '0 0 0 0', position: 'absolute', right:'0'}}>
            <Button className="cancelButton" onClick={() => {reset()}}>Cancelar</Button>
            <InscribirAlumnes 
              alumnes={alumnes} setAlumnes={setAlumnes} 
              curso={curso} 
              setPrimerModal={setModalAbierto} eliminar={confirmar}
              eliminados={inscriptos}
              setMostrarLista={setMostrarLista}
              actualizarAlumnes = {actualizarAlumnes}
            />
            
          </Grid>
        </Modal.Actions>

      </Modal>
    </>
  );

}