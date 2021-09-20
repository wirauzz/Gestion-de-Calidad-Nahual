import React, { useEffect, useState } from "react";
import { Table, Grid, GridColumn, Header, Icon, Divider } from 'semantic-ui-react'
import { obtenerNodos } from "../../../services/Nodo";
import styles from "../../../styles/styles.module.css";
import ListaSedes from "./listaSedes";
import CrearNodo from "./crearNodo";
import CrearSede from "./crearSede";
import AccionesSedes from "./accionesSedes";
import Menu_Cursos from "../Menu/menu";

export default function ListarNodos() {
    const [nodos, setNodos] = useState([]);

    const [abierto, setAbierto] = React.useState(false);

    useEffect(() => {
        obtenerNodos().then(response => response.json()).then(response => setNodos(response.response))
    }, [])

    return (
        <>
            <Menu_Cursos actual= {"Nodos"}/> 
            <Grid centered columns={1}>
                <GridColumn>
                    <div className={styles.vistaCursos}>
                    <Grid centered>
                        <Header as='h2' textAlign='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                            <Icon name='map signs' circular/>
                            <Header.Content>Nodos & Sedes</Header.Content>
                        </Header>
                    </Grid>
                    <Divider />
                        <div className={styles.crearNodoButton}>
                            <CrearNodo open={false} />
                        </div>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nodos</Table.HeaderCell>
                                    <Table.HeaderCell>Sedes</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {nodos.map(nodo => {
                                    return (
                                        <Table.Row key={`nodo-${nodo.id}`}>
                                            <Table.Cell>
                                                <Grid columns='equal'>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            {nodo.nombre}
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CrearSede open={abierto}  setOpen={setAbierto} nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Table.Cell>
                                            <Table.Cell verticalAlign='top'>
                                                <ListaSedes nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                            </Table.Cell>
                                            <Table.Cell verticalAlign='top'>
                                                <AccionesSedes nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </div >
                </GridColumn>
            </Grid>
        </>
    )
}