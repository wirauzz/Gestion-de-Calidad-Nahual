import React from 'react'
import { Button, Icon, Modal } from "semantic-ui-react";
import servicioNotificacion from "../../../layouts/Notificaciones";
import {eliminarTopico} from './../../../services/Topico';

export default function EliminarTopico({isOpenModalDeletTopic,setIsOpenModalDeletTopic, topic, updateTopicsTable}) {
    return (
        <Modal
            closeIcon
            open={isOpenModalDeletTopic}
            onClose={() => {setIsOpenModalDeletTopic(false)}}
            onOpen={() => {}}
        >
            <Modal.Header>
                <h1>Eliminar Tópico</h1>
            </Modal.Header>
            <Modal.Content>
                {`¿ Seguro que desea eliminar el Tópico: ${topic.nombre} ?`}
            </Modal.Content>
            <Modal.Actions>
                <Button className="cancelButton" style={{ margin: "20px 0 0 10px" }} onClick={() => {setIsOpenModalDeletTopic(false);}}>
                    Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
                <Button className="confirmButton" style={{ margin: "20px 0 0 10px" }}
                     onClick={() => {
                        eliminarTopico(topic.id)
                        .then((response)=>{
                            console.log(response);
                            if ( response.status === 200 ) {
                                setIsOpenModalDeletTopic(false);
                                updateTopicsTable();
                                servicioNotificacion.mostrarMensajeExito(
                                    "Tópico eliminado con éxito",
                                    `Se eliminó el Tópico: ${topic.nombre}`
                                );
                            } else {
                                setIsOpenModalDeletTopic(false);
                                servicioNotificacion.mostrarMensajeError(
                                    "No se pudo eliminar el Tópico",
                                    `Estado de la petición: ${response.status}`
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
                     }}>
                    Confirmar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
