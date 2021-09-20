import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import CuerpoModal from './CuerpoModal'

export default class ModalOtorgarAcceso extends Component {
    constructor(props) {
        super(props);
        this.state = {
        abierto: false
        };
    }
    
    mostrarModal (estado) {
        this.setState({
        abierto: estado
        });
    }

    render() {
        return (
            <Modal
            open={this.state.abierto}
            onClose={() => this.mostrarModal (false)}
            onOpen={() => this.mostrarModal (true)}
            size="small"
            closeIcon
            trigger={
            <Button className='AccesoCorreo'  color ='green' floated='right'  onClick={() => (this.mostrarModal(true))}>
                Otorgar Acceso Directo
                <Icon color='white' name='add user' style={{ margin: '0 0 0 10px' }} />
            </Button>}
            >
            <CuerpoModal cerrarModal={() => (this.mostrarModal (false))}></CuerpoModal> 
            </Modal>
        )
    }
}
