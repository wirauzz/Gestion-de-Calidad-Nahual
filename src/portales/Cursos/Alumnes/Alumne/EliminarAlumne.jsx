import React, { useState } from "react";
import { Button, Header, Icon, Modal, Grid } from "semantic-ui-react";
import { EliminarEstudiante } from '../../../../services/Estudiante';
import { eliminarInscripto, obtenerInscriptosDeCurso } from '../../../../services/Inscripto';
import servicioNotificacion from "../../../../services/Notificacion";

export default function Eliminar({ alumneId, curseId, actualizarAlumnes }) {

    const [abierto, setAbierto] = useState(false);
    const [inscripte, setInscripte] = useState(null);

    function abrirModal() {
        getIdInscripto();
        setAbierto(true);
    }

    function getIdInscripto() {
        obtenerInscriptosDeCurso(curseId)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                return response.response;
            })
            .then((inscriptos) => {
                let inscripto = inscriptos.filter(item => item.estudiante.id === alumneId)[0]
                setInscripte(inscripto);
            });
    }

    function mostrarNotificacion() {
        servicioNotificacion.mostrarMensajeExito(
            "Se Elimino al Alumne",
            `${inscripte.estudiante.nombre} ${inscripte.estudiante.apellido}`
        );
    }

    function eliminar() {
        eliminarInscripto(inscripte.id)
            .then((x) => {
                return x.data;
            })
            .then((x) => {
                return x.result;
            })
            .then((x) => {
                EliminarEstudiante(inscripte.estudiante.id)
            })
            .then(() => {
                setAbierto(false);
                actualizarAlumnes(curseId);
                mostrarNotificacion();
            });
    }

    return (
        <>
            <Modal
                basic
                onClose={() => setAbierto(false)}
                onOpen={() => abrirModal(true)}
                open={abierto}
                style={{ marginTop: '-200px' }}
                size='mini'
                trigger={
                    <Button
                        color='red'
                        size= 'small'
                        onClick={() => abrirModal(true)}
                    >
                        Eliminar
                        <Icon name='trash' style={{ margin: '0 0 0 10px' }} />
                    </Button>
                }
            >
                <Header icon style={{ marginBottom: '20px' }}>
                    <Icon name='trash' />
                    Eliminar Alumne
                </Header>
                
                <Grid centered style={{ marginBottom: '30px' }}>
                    <Modal.Content
                        content='Se Eliminaran todos los datos del Estudiante.' />
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