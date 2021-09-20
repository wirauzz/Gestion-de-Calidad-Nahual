import React, { useState } from "react";
import { Button, Icon, Modal, Grid, Image, Form, Input } from "semantic-ui-react";
import LogoNahual from "../../../assets/images/logo-proyecto-nahual.webp";
import {editarTopico} from './../../../services/Topico';
import servicioNotificacion from "../../../layouts/Notificaciones";

export default function EditarTopico({
    isOpenModalEditTopic,
    setIsOpenModalEditTopic,
    updateTopicsTable,
    topic
  }) {

    const [nombreTopico, setNombreTopico] = useState(topic.nombre);
    const resetVariables = () => {
        setIsOpenModalEditTopic(false);
        updateTopicsTable();
        setNombreTopico('');
    }
    return (
        <Modal
            closeIcon
            open={isOpenModalEditTopic}
            onClose={() => {setIsOpenModalEditTopic(false);setNombreTopico('');}}
            onOpen={() => {setNombreTopico(topic.nombre)}}
        >
            <Modal.Header>
            <Grid columns="equal">
          <Grid.Column>
            <Image src={LogoNahual} size="small" />
          </Grid.Column>
          <Grid.Column>Editar Tópico</Grid.Column>
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
                    value={nombreTopico}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    onChange={(x, data) => setNombreTopico(data.value)}
                    />

                <Button className="cancelButton" style={{ margin: "20px 0 0 10px" }} onClick={() => {setNombreTopico('');setIsOpenModalEditTopic(false);} }>
                    Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
                <Button style={{ margin: "20px 0 0 10px" }}
                    className="confirmButton"
                    onClick={() => {
                        editarTopico(topic.id,{nombre:nombreTopico})
                        .then(response=>{
                            if(response.status === 200){
                                console.log(response);
                                resetVariables();
                                servicioNotificacion.mostrarMensajeExito(
                                    "Tópico editado con éxito",
                                    `Se editó el Tópico a: ${response.data.Topico.nombre}`
                                );
                            } else {
                                resetVariables();
                                servicioNotificacion.mostrarMensajeError(
                                    "El Tópico no pudo ser editado",
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
                           } );
                    }}
                >
                    Editar <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
                </Button>
                </Form>

            </Modal.Content>
            <Modal.Actions>
            
            </Modal.Actions>
        </Modal>
  );
    
}
