import React from "react";
import { Icon, Grid, Header, Label, Input } from "semantic-ui-react";
import '../../../../styles/EgresadesStyles/InformacionDelCurso.css';


function InformacionDelPrimerTrabajo({ egresade }) {
    var fechaPrimerTrabajo = new Date(egresade.fechaPrimerEmpleo)
    return (
        <Grid.Row>
            <Grid.Column>
                <Header as='h3'> <Icon name='briefcase' />Trabajo</Header>
                <Grid columns='equal'>
                    <Grid.Column />
                    <Grid.Column floated="right" width={11} >
                        <span >{'Primer trabajo: ' + egresade.nombrePrimerTrabajo}</span>

                    </Grid.Column>

                    <Grid.Column floated="left" width={4}>

                    </Grid.Column>

                    {egresade.fechaPrimerEmpleo ?
                        <>
                            <Grid.Column />
                            <Grid.Column floated="right" width={11} >
                                <span > {'Fecha del primer trabajo: ' + fechaPrimerTrabajo.toLocaleDateString('es')}</span>

                            </Grid.Column>

                            <Grid.Column floated="left" width={4}>

                            </Grid.Column>
                        </>
                        : null}

                </Grid>
            </Grid.Column>
        </Grid.Row>
    );
}

export default InformacionDelPrimerTrabajo;
