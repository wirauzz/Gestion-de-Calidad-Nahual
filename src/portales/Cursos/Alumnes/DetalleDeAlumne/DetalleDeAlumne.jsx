import React, { Component } from "react";
import { Button, Modal, Image, Segment, Loader, Dimmer, Icon } from 'semantic-ui-react'
import CuerpoModal from './CuerpoModal';
import axios from "axios";

class DetalleDeAlumne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false
    };
  }

  obtenerAPIDealumne() {
    const API_URL = process.env.REACT_APP_SERVICIO_DE_DATOS_API;
    axios
      .get(`${API_URL}/estudiantes/${this.props.id}/DTO`)
      .then(respuesta => {
        this.setState({
          alumne : respuesta.data.response
        });
      })
      .catch(function (error) {
        console.log("Error al cargar la base de datos")
      });
  }

  mostrarModal (state) {
    this.setState({
      abierto: state
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
        trigger={<Button circular basic color="green" icon onClick={() => (this.obtenerAPIDealumne(this.props.id))}><Icon color="black" name="eye"></Icon> </Button>}
      >
        {
          this.state.alumne ?
            <CuerpoModal alumne={this.state.alumne } filtrarAlumne={(id)=> this.props.filtrarAlumne(id)} cerrarModal={() => (this.mostrarModal (false))} />
            :
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Cargando</Loader>
              </Dimmer>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        }
      </Modal>
    )
  }
}

export default DetalleDeAlumne;
