import React, { useEffect, useState} from "react";
import { Button, Image, Modal, Grid, Label, Dropdown, Divider, Segment, Loader, Dimmer, Form } from 'semantic-ui-react';
import '../../../styles/EgresadesStyles/Modal.css'
import {ObtenerEgresade} from '../../../services/Estudiante.js';
import {obtenerCursos} from '../../../services/Curso.js';
import {crearInscripto} from '../../../services/Inscripto.js'
import servicioNotificacion from "../../../layouts/Notificaciones";
import LogoNahual from '../../../assets/images/logo-proyecto-nahual.webp';

export default function BotonReinscribir({idEgresade}) {
    const [open, setOpen] = useState(false);
    const [idCurso, setIdCurso] = useState (0);
    const [cursos, setCursos] = useState ([]);
    const [egresade, setEgresade] = useState(null);
    const [opcionesCurso, setOpcionesCurso] = useState ([]);
    const [inscribir, setInscribir] = useState(false);

    useEffect(() => {
        getEgresade(idEgresade);
        getCursos();
    },[idEgresade]);
    
    function getEgresade(idEgresade){
        ObtenerEgresade(idEgresade)
            .then(response => {
                setEgresade(response.data.response)
            })
            .catch(function (error) {
                console.log(error);
            });
      setInscribir(false);
    }
    
    function getCursos(){
      const opcionesDeCurso = [];
      obtenerCursos()
          .then((response) => response.json())
          .then((response) => setCursos(response.response));
      cursos.forEach(opcionDeCurso => {
        if(opcionDeCurso.esEgresade && opcionDeCurso.estado) {
          opcionDeCurso = {
            key: opcionDeCurso.id,
            text: opcionDeCurso.topico.nombre +" / "+opcionDeCurso.nodo.nombre + " - "+ opcionDeCurso.sede.nombre + " / " + opcionDeCurso.profesores + " / " + opcionDeCurso.horario,
            value: opcionDeCurso.id,
          }
          opcionesDeCurso.push(opcionDeCurso);
        }
      });
      setOpcionesCurso(opcionesDeCurso); 
      return true;
    }
    
    function abrirModal (estado) {
      setOpen(estado);
    }
    
    function submit() {
      if (inscribir)  crear();
      abrirModal(false);
    }

    function mostrarNotificacion() { 
      servicioNotificacion.mostrarMensajeExito(
        "Egresade Inscrito con Exito",
        `Se inscribio al Egresade: ${egresade.nombre} ${egresade.apellido}`
      );
    }

    function crear(){
      crearInscripto({                
        estudianteId: idEgresade,
        cursoId: idCurso,
      }).then((x) => {
          return x.data;
        })
        .then((x) => {
          return x.result;
        })
        .then((x) => {
          mostrarNotificacion();
        });
       
    }

    function setCurso(value) {
      setIdCurso(value);
      setInscribir(true);
    }

    return (
      
        <Modal
          open={open}
          onClose={() => abrirModal(false)}
          onOpen={() => abrirModal(true)}
          size="small"
          closeIcon
          trigger={
            <Button color='brown' onClick={() => (getEgresade(idEgresade), getCursos())}>
              <label className="icon-text" >Reinscribir</label>
              <i className="add user icon" style={{ margin: '0 0 0 5px' }}></i>
            </Button>}
        >
          {
            egresade ?
              <Segment>
                <Segment>
                <Modal.Header>
                  <Grid columns='equal'>
                    <Grid.Column width={4}>
                      <Image src={LogoNahual} />
                    </Grid.Column>
                    <Grid.Column width={12} textAlign="center">
                      <h2 style ={{margin:'7px 0 7px 0'}} >{egresade.nombre} {egresade.apellido}</h2>
                    </Grid.Column>
                  </Grid>
                </Modal.Header>

            <Divider clearing />
                <Modal.Content>
                  <Form className="ui form">
                    <Grid columns='equal'>
                      <Grid.Row>
                        <Grid.Column textAlign="center">
                          <Label color='olive' attached='top left' style={{margin:'0 0 0 15px'}}>Cursos Disponibles</Label>
                          <Dropdown
                            placeholder='Selecciona un Curso'
                            fluid
                            selection
                            options={opcionesCurso}
                            onChange = {(x, data) =>{
                              setCurso(data.value);
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Modal.Content>
                </Segment>
                <Modal.Actions style={{height: '40px'}}>
                  <Grid style={{margin: '0 0 0 0',position: 'absolute', right:'10px'}}>
                    <Button  type="" className="cancelButton" onClick={() => abrirModal(false)}>
                      Cerrar
                    </Button>
                    <Button type="" className="confirmButton" onClick={() => submit()} >
                      Confirmar
                    </Button>
                  </Grid>
                </Modal.Actions>
              </Segment>
              : <Segment style={{margin:'10px 10px 10px 10px'}}>
                <Dimmer active inverted>
                  <Loader inverted>Cargando...</Loader>
                </Dimmer>
                <Image src={LogoNahual} size='small' />
              </Segment>
          }
        </Modal>
    )
}
