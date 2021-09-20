import React, { useState } from "react";
import { Button, Icon, Modal, Grid, Image, Form, Input } from "semantic-ui-react";
import LogoNahual from "../../../assets/images/logo-proyecto-nahual.webp";
import {crearTopico} from './../../../services/Topico';
import servicioNotificacion from "../../../layouts/Notificaciones";

export default function NuevoTopico({
    isOpenModal,
    setIsOpenModal,
    updateTopicsTable
  }) {

    const [nuevoTopico, setNuevoTopico] = useState('');
    const resetVariables = () => {
        setIsOpenModal(false);
        updateTopicsTable();
        setNuevoTopico('');
    }
    return (
        <Modal
            closeIcon
            open={isOpenModal}
            onClose={() => {setIsOpenModal(false);setNuevoTopico('');}}
            onOpen={() => {}}
        >
            <Modal.Header>
            <Grid columns="equal">
          <Grid.Column>
            <Image src={LogoNahual} size="small" />
          </Grid.Column>
          <Grid.Column>Nuevo Tópico</Grid.Column>
        </Grid>
            </Modal.Header>
            <Modal.Content>
                <Form className="ui form">
                    <Input
                    label="Topico"
                    id='Topico'
                    fluid
                    type="text"
                    width={16}
                    value={nuevoTopico}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    onChange={(x, data) => setNuevoTopico(data.value)}
                    />

                <Button className="cancelButton" style={{ margin: "20px 0 0 10px" }} onClick={() => {setIsOpenModal(false);setNuevoTopico('');}}>
                    Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
                <Button style={{ margin: "20px 0 0 10px" }}
                    className="confirmButton"
                    onClick={() => {
                        crearTopico({nombre:nuevoTopico})
                        .then(response=>{
                            if(response.status === 200){
                                resetVariables();
                                servicioNotificacion.mostrarMensajeExito(
                                    "Tópico creado con éxito",
                                    `Se creó el Tópico: ${response.data.result.nombre}`
                                );
                                console.log(response);
                            } else {
                                resetVariables();
                                servicioNotificacion.mostrarMensajeError(
                                    "El Tópico no pudo ser creado",
                                    `Estado de la peticion: ${response.status}`
                                );
                            }
                        })
                        .catch(function (error) {
                            servicioNotificacion.mostrarMensajeError(
                                "Algo salio mal al hacer la peticion",
                                `Ver detalles en la consola del navegador`
                            );
                            console.log(error);
                        });
                    }}
                >
                    Crear <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
                </Button>
                </Form>

            </Modal.Content>
            <Modal.Actions>
            
            </Modal.Actions>
        </Modal>
  );
    
}
