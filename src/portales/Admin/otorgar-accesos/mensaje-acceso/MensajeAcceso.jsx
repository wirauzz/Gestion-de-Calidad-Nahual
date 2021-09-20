import React, { Component } from 'react'
import {Message} from 'semantic-ui-react';

export default class MensajeAcceso extends Component {
    render() {
        var colorDeMensaje = this.props.colorDeFondo;
        return (
            <div style={{border: '1px solid `${colorDeMensaje}` !important'}} className="centerMessage">
                <Message color={`${colorDeMensaje}`} size='big' style={{
                    color: `${colorDeMensaje}`,border: `${colorDeMensaje}`}}>
                <Message.Header>{this.props.encabezadoDelMensaje}</Message.Header>
                <p>
                    {this.props.cuerpoDelMensaje}
                </p>
                </Message>
            </div>
        )
    }
}
