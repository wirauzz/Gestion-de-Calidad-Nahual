import React, { useState } from "react";
import { Button, Icon, Modal, Header, Grid } from 'semantic-ui-react'
import { eliminarCurso } from "../../../services/Curso";
import { EliminarEstudiante } from '../../../services/Estudiante'
import { obtenerInscriptosDeCurso, eliminarInscripto } from "../../../services/Inscripto";
import servicionotificacion from "../../../layouts/Notificaciones";


export default function EliminarCurso({ idCurso, cursos, setCursos }) {

    const [abierto, setAbierto] = useState(false);
    const [alumnes, setAlumnes] = useState([]);

    function obtenerAlumnes() {
        obtenerInscriptosDeCurso(idCurso)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                return response.response;
            })
            .then((response) => {
                setAlumnes(response);
            })
    }

    function inicializar() {
        obtenerAlumnes();
        setAbierto(true);
    }

    const mostrarNotificacion = () => {
        servicionotificacion.mostrarMensajeExito(
            'Curso eliminado con éxito', ''
        );
    }

    function arrayRemove(array, value) {
        return array.filter(function (element) {
            return element.id != value;
        });
    }

    function eliminar() {

        eliminarInscripto(alumnes.id)
            .then((x) => {
                return x.data;
            })
            .then(() => {
                EliminarEstudiante(alumnes.estudiante.id)
            });
        eliminarCurso(idCurso)
            .then((x) => {
                setAbierto(false);
                mostrarNotificacion();
                return x.data;
            })
            .then((x) => {
                let result = arrayRemove(cursos, x.id);
                setCursos(result)
            });
    }

    return (
        <>

            <Modal
                basic
                onClose={() => setAbierto(false)}
                onOpen={() => inicializar()}
                open={abierto}
                style={{ marginTop: '-200px' }}
                size='mini'
                trigger={
                    <Button negative color="red" size="small" onClick={() => inicializar()}>
                        Eliminar <Icon color='white' name='trash' style={{ margin: '0 0 0 10px' }} />
                    </Button>
                }
            >
                <Header icon style={{ marginBottom: '20px' }}>
                    <Icon name='trash' />
                    Eliminar Curso
                </Header>

                <Grid centered style={{ marginBottom: '30px' }}>
                    <Modal.Content
                        content='Se Eliminaran todos los datos del Curso.' />
                </Grid>

                <Modal.Actions >

                    <Grid centered>
                        <Button
                            color='red'
                            inverted
                            style={{ marginRight: '20px' }}
                            onClick={() => setAbierto(false)}>
                            <Icon name='remove' />
                            Cancelar
                        </Button>
                        <Button
                            color='green'
                            inverted
                            onClick={() => { eliminar() }}>
                            <Icon name='checkmark' />
                            Confirmar
                        </Button>
                    </Grid>
                </Modal.Actions>
            </Modal>
        </>
    );
}