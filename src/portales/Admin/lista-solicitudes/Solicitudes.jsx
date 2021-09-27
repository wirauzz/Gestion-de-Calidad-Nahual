import React, {useState } from "react";
import { Container, Tab, Divider, Header, Icon, Grid } from "semantic-ui-react";
import SolicitudesAprobadas from "./SolicitudesAprobadas";
import SolicitudesPendientes from "./SolicitudesPendientes";
import SolicitudesRechazadas from "./SolicitudesRechazadas";
import ModalOtorgarAcceso from '../otorgar-accesos/ModalOtorgarAcceso'

export default function Solicitudes() {
    const [
        cargandoSolicitudesPendientes,
        modificarCargandoSolicitudesPendientes
    ] = useState(true);

    const [
        cargandoSolicitudesAprobadas,
        modificarCargandoSolicitudesAprobadas
    ] = useState(true);

    const [
        cargandoSolicitudesRechazadas,
        modificarCargandoSolicitudesRechazadas
    ] = useState(true);
    
    const pestañas = [
    {
        menuItem: {
        key: "solicitudesPendientes",
        icon: "time",
        content: "Solicitudes pendientes"
        },
        render: () => (
        <Tab.Pane loading={cargandoSolicitudesPendientes}>
            <SolicitudesPendientes
            mostrarCargando={(cargando) =>
                modificarCargandoSolicitudesPendientes(cargando)
            }
            />
        </Tab.Pane>
        )
    },
    {
        menuItem: {
            key: "solicitudesAprobadas",
            icon: "check circle",
            content: "Solicitudes Aprobadas"
        },
        render: () => (
        <Tab.Pane loading={cargandoSolicitudesAprobadas}>
            <SolicitudesAprobadas
            mostrarCargando={(cargando) =>
                modificarCargandoSolicitudesAprobadas(cargando)
            }
            />
        </Tab.Pane>
        )
    },
    {
        menuItem:{
        key: "solicitudesRechazadas",
        icon: "times circle",
        content: "Solicitudes Rechazadas"
        },
        render: () => (
        <Tab.Pane loading={cargandoSolicitudesRechazadas}>
            <SolicitudesRechazadas
            mostrarCargando={(cargando) =>
                modificarCargandoSolicitudesRechazadas(cargando)
            }
            />
        </Tab.Pane>
        )
    }
    ];
    
    return (
        <div>
            <Grid centered>
                <Header as='h2' textAlign='center' style={{marginTop: '15px', marginBottom: '20px'}}>
                    <Icon name='list alternate outline' circular/>
                    <Header.Content>Administrador</Header.Content>
                </Header>
            </Grid>
            <Divider />
            <ModalOtorgarAcceso />
            <Container fluid >
                <Tab panes={pestañas} />
            </Container>
        </div>
    );
}