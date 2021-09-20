import React, { Component } from 'react'
import { Button, Label, Message, Table, Icon, Checkbox } from "semantic-ui-react";

const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL = process.env.REACT_APP_AUTENTICACION_NAHUAL_API;
export default class SolicitudesPendientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solicitudes: [],
            mensajeDeEstado: "",
            mostrarMensajeDeEstado: false,
            estaCargando: false,
            error: "",
            solicitudesMarcadas:[]
        };
        this.props.mostrarCargando(true);
    }

    obtenerSolicitudes() {
        fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/solicitudes`)
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((respuesta) => {
                respuesta.data &&
                    this.setState({
                        solicitudes: respuesta.data
                    });    
                    if(this.state.solicitudes.isChecked==false){
                        console.log(this.state.solicitudes);
                    }
                this.props.mostrarCargando(false);
            })
            .catch((error) => {
                this.setState({
                    error: "Problema al obtener los datos."
                });
                this.props.mostrarCargando(false);
            });
    }

    componentDidMount() {
        this.obtenerSolicitudes();
    }

    mostrarMensaje() {
        this.setState({ mostrarMensajeDeEstado: true });
    }

    manejarProblemas = () => {
        this.setState({ mostrarMensajeDeEstado: false });
    };

    otorgarAcceso = async (valor) => {
        this.setState({ estaCargando: true });
        const opcionesDeSolicitud = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valor)
        };
        fetch(
            `${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/otorgarAcceso`,
            opcionesDeSolicitud
        )
            .then((respuesta) => {
                return respuesta.json();
            })
            .then(() => {
                fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/solicitudes/${valor.id}`, {
                    method: "DELETE"
                }).then(() => {
                    this.setState({
                        solicitudes: this.state.solicitudes.filter(
                            (solicitud) => solicitud.id !== valor.id
                        )
                    });
                    this.mostrarMensaje();
                    this.setState({ estaCargando: false });
                    this.setState({
                        mensajeDeEstado: `Se le otorgó el acceso al usuario ${valor.email}.`
                    });
                });
            })
            .catch(() => {
                this.setState({
                    error: "Problema al obtener los datos."
                });
                this.setState({ estaCargando: false });
                this.props.mostrarCargando(false);
            });
    };

    rechazarAcceso = async (value) => {
        this.setState({ isLoading: true })
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };
        try {
            var res = await fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/solicitudes/rechazar/${value.id}`, { method: 'DELETE' })
        } catch (error) {
            console.log(error);
        }
        this.setState({ isLoading: false })
        this.componentDidMount()
    }

    listaVacia() {
        return this.state.error ? (
            <Message
                icon="warning sign"
                warning
                header={"Error, problema al conectar con la base de datos."}
            />
        ) : (
                <Message
                    icon="warning sign"
                    warning
                    header={"No hay solicitudes pendientes."}
                />
            );
    }
    handleCheck(val) {
        return this.state.solicitudesMarcadas.some(item => val.id === item.id);
    }
    handleRemove( arr, item ) {
        var i = arr.indexOf( item );
     
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
    }
    onChecked=(solicitud)=>{
        if(this.handleCheck(solicitud)== false){
            this.state.solicitudesMarcadas.push(solicitud);
        }
        else{
            this.handleRemove(this.state.solicitudesMarcadas,solicitud)
        } 
    }
    OtorgarAccesoATodos=()=>{
        for(let i=0;i<this.state.solicitudesMarcadas.length;i++)
        {
            this.otorgarAcceso(this.state.solicitudesMarcadas[i]);
        }
        this.state.solicitudesMarcadas=[];
    }

    render() {
        return (
            <div>
                {this.state.solicitudes.length === 0 || this.state.error ? (
                    this.listaVacia()
                ) : (
                        <>
                            {this.state.mostrarMensajeDeEstado && (
                                <Message
                                    positive
                                    onDismiss={this.manejarProblemas}
                                    header="!Solicitud Aceptada!"
                                    content={this.state.mensajeDeEstado}
                                ></Message>
                            )}
                            <Button color ='green'  onClick={this.OtorgarAccesoATodos}>
                                Otorgar Accesos Pendientes
                                <Icon color='white' name='add user' style={{ margin: '0 0 0 10px' }} />
                            </Button>
                            <Table celled className="tarjeta-tabla">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell className="cabeceras-tabla"></Table.HeaderCell>
                                        <Table.HeaderCell className="cabeceras-tabla">
                                            Nombre y Apellido
                        </Table.HeaderCell>
                                        <Table.HeaderCell className="cabeceras-tabla">
                                            Detalle
                        </Table.HeaderCell>
                                        <Table.HeaderCell className="cabeceras-tabla">
                                            Aplicación
                        </Table.HeaderCell>
                                        <Table.HeaderCell className="cabeceras-tabla">
                                            Acción
                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.solicitudes && this.state.solicitudes.map((solicitud) => (
                                        <Table.Row key={solicitud.id}>
                                            <Table.Cell className="bordes-tabla">
                                            <input
                                                    type="checkbox"
                                                    name="checkbox"
                                                    style={{ transform: "scale(1.4)" }}
                                                    onClick={()=>this.onChecked(solicitud)}
                                                />
                                            </Table.Cell>
                                            <Table.Cell className="bordes-tabla">
                                                <Label className="nombre">{solicitud.nombre}</Label>
                                                <br></br>
                                                <Label className="email">{solicitud.email}</Label>
                                            </Table.Cell>
                                            <Table.Cell className="bordes-tabla">
                                                <div> {solicitud.razon}</div>
                                            </Table.Cell>
                                            <Table.Cell className="bordes-tabla">
                                                <div> {solicitud.aplicacion}</div>
                                            </Table.Cell>
                                            <Table.Cell className="bordes-tabla">
                                                <Button
                                                    disabled={this.state.estaCargando}
                                                    positive
                                                    onClick={() => this.otorgarAcceso(solicitud)}
                                                >
                                                    Otorgar Acceso
                                    <Icon color='white' name='add user' style={{ margin: '0 0 0 10px' }} />
                                                </Button>
                                                <Button disabled={this.state.isLoading} negative onClick={() => this.rechazarAcceso(solicitud)}>
                                                    Rechazar Solicitud
                                    <Icon color='white' name='user cancel' style={{ margin: '0 0 0 10px' }} />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </>
                    )}
            </div>
        )
    }
}