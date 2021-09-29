import React, { useState } from "react";
import { Button, Icon, Modal, Grid, Image, TextArea } from "semantic-ui-react";
import { Form, Input } from 'semantic-ui-react-form-validator'
import LogoNahual from "../assets/images/logo-proyecto-nahual.webp";
import servicioNotificacion from "../layouts/Notificaciones";
import AccesosService from "../services/AccesoAut"

export default function SolicitarAcceso({
    isOpenModalSolicitarAcceso,
    setIsOpenModalSolicitarAcceso,
    user
  }) {

    const [email, setEmail] = useState(user.email);
    const [nombre, setNombre] = useState(user.name);
    const [motivo, setMotivo] = useState('');

    return (
        <Modal
            closeIcon
            open={isOpenModalSolicitarAcceso}
            onClose={() => {setIsOpenModalSolicitarAcceso(false);}}
            onOpen={() => {setEmail(user.email); setNombre(user.nombre);}}
        >
            <Modal.Header>
            <Grid columns="equal">
          <Grid.Column>
            <Image src={LogoNahual} size="small" />
          </Grid.Column>
          <Grid.Column>Solicitar Acceso</Grid.Column>
        </Grid>
            </Modal.Header>
            <Modal.Content scrolling>
                <Form id="myForm">
                    <Input
                    name="email"
                    label="email"
                    id='form-acceso'
                    fluid
                    type="text"
                    width={16}
                    value={email}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    />

                    <Input
                    label="nombre"
                    id='nombre'
                    fluid
                    type="text"
                    width={16}
                    value={nombre}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    />
                    Motivo
                    <TextArea
                    label="motivo"
                    id='motivo'
                    fluid
                    type="text"
                    width={16}
                    value={motivo}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    onChange={(x,data) => {setMotivo(data.value)}}
                    />

                <Button className="cancelButton" style={{ margin: "20px 0 0 10px" }} onClick={() => {setIsOpenModalSolicitarAcceso(false);} }>
                    Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
                <Button style={{ margin: "20px 0 0 10px" }}
                    className="confirmButton"
                    onClick={() => { 
                        AccesosService.SolicitarAccesoApps({nombre,email,razon:motivo,aplicacion:'Egresades'})
                        .then((response)=>{
                            if(response.status == 201){                                
                                servicioNotificacion.mostrarMensajeExito(
                                    "Solicitud enviada con éxito",
                                    `Su solicitud sera revisada`
                                );
                            } else {
                                //resetVariables();
                                servicioNotificacion.mostrarMensajeError(
                                    "La solicitud no pudo ser procesada",
                                    `Estado de la peticion: ${response.status}`
                                );                                
                            }
                            setIsOpenModalSolicitarAcceso(false);
                        })
                        .catch(function (error) {
                            servicioNotificacion.mostrarMensajeError(
                                "Algo salio mal al hacer la peticion",
                                `Ver detalles en la consola del navegador`
                            );
                        } )
                    }}
                >
                    Solicitar <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
                </Button>
                </Form>

            </Modal.Content>
            <Modal.Actions>
            
            </Modal.Actions>
        </Modal>
  );
    
}
