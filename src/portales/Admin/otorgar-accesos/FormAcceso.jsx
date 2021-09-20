import React, { Component } from 'react'
import { Button, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react-form-validator'
import axios  from 'axios';
import MensajeAcceso from './mensaje-acceso/MensajeAcceso'

const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL = process.env.REACT_APP_AUTENTICACION_NAHUAL_API;
export default class FormAcceso extends Component {
    constructor(props) {
        super(props);
        this.state = {
        nombre: "",
        correo: "",
        aplicacion: "",
        exito: null,
        mostrarBotonDeCarga: false
        }
    }

    cambioEnEntrada = (e, { value, name }) => {
        this.setState({ [name]: value })
    }

    iconoDeCarga() {
        return (
        this.state.mostrarBotonDeCarga === true && (
            <Dimmer active inverted>
            <Loader inverted>Cargando</Loader>
            </Dimmer>
        )
        );
    }

    otorgarAcceso = (evento) => {
        evento.preventDefault();
        var nuevoUsuario = {
            nombre: this.state.nombre,
            email: this.state.correo,
            aplicacion: this.state.aplicacion
        }
        this.setState({mostrarBotonDeCarga:true});
        axios({
        method: "post",
        url: `${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/otorgarAcceso`,
        headers: { "Content-Type": "application/json" },
        data: nuevoUsuario
        })
        .then(respuesta => {
            this.setState({exito:true});
            this.setState({mostrarBotonDeCarga:false});
            setTimeout(() => { 
            this.props.cerrarModal();
            }, 2500);
        })
        .catch(error => {
            this.setState({exito:false});
            this.setState({mostrarBotonDeCarga:false});
            setTimeout(() => { 
            this.props.cerrarModal();
            }, 2500);
        });
    }

    render() {
        const opcionesAplicacion = [
        { key: 'Admin', text: 'Admin', value: 'Admin' },
        { key: 'Egresades', text: 'Egresades', value: 'Egresades' },
        { key: 'Empresas', text: 'Empresas', value: 'Empresas' },
        { key: 'Cursos-Periodos', text: 'Cursos y Periodos', value: 'Cursos-Periodos' },
        ]
        return (
        <div>
            {this.iconoDeCarga()}
            <Form id="myForm" onSubmit={this.otorgarAcceso}>
            <Input
                name='nombre'
                value={this.state.nombre}
                id='form-acceso'
                label='Nombre completo'
                placeholder='Nombre completo'
                width={16}
                onChange={this.cambioEnEntrada}
            />
            <Input
                name='correo'
                value={this.state.correo}
                type='email'
                id='form-input-control-error-email'
                label='Correo'
                placeholder='ejemplo@****.com'
                validators={['required', 'matchRegexp:.+@.+.+']}
                errorMessages={['Este campo es requerido','Formato incorrecto, ingrese un correo valido']}
                width={16}
                onChange={this.cambioEnEntrada}
            />
            <p><b>Aplicación</b></p>
            <Dropdown style={{ marginTop: 25 }}
                compact
                name='aplicacion'
                placeholder='Aplicacion'
                validators={['required']}
                fluid
                selection
                options={opcionesAplicacion}
                onChange={this.cambioEnEntrada}
                />
            <Button floated='right' color='green' type='submit' onSubmit={this.otorgarAcceso} style={{ marginTop: 70 }}>Otorgar acceso</Button>
            <Button floated='right'  onClick={this.props.cerrarModal} style={{ marginTop: 70 }}>Cancelar</Button>
            </Form>
            {(this.state.exito === true) && (
            <MensajeAcceso encabezadoDelMensaje= "Solicitud exitosa" cuerpoDelMensaje="Acceso otorgado con exito" colorDeFondo="green"/>)}
            {(this.state.exito === false) && (
            <MensajeAcceso encabezadoDelMensaje= "Solicitud no exitosa" cuerpoDelMensaje="Hubo un error al momento de enviar, intente de nuevo más tarde" colorDeFondo="red"/>)}
        </div>
        )
    }
}
