import React, { Component, Fragment } from 'react';
import { Button, Image, Modal, Grid, Segment, Loader, Dimmer, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import BASE_ROUTE from "../../../services/rutas";

class CrearSede extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nombreSede: "",
      nodoId: this.props.nodoId,
      nodoNombre: this.props.nodoNombre
    };
  }


  abrirModal(estado) {
    this.setState({
      open: estado
    });
  }

  enCambio = (event) => {
    let valor = event.target.value;
    this.setState({ nombreSede: valor });
  }

  enConfirmacion() {
    if (this.state.nombreSede === "") {
      alert("Los datos no pueden viajar vacios!");
    } else {
      console.log(this.state);
      var sede = { nombre: this.state.nombreSede, NodoId: this.state.nodoId }
      axios.post(`${BASE_ROUTE}/sedes`, sede)
        .then(function (respuesta) {
          this.setState({ open: false });
          window.location.reload(false);
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.abrirModal(false)}
        onOpen={() => this.abrirModal(true)}
        size="mini"
        closeIcon
        trigger={
          <Button color='green' style={{ padding: '10px' }}>
            Sede
                <Icon color='white' name='add circle' style={{ margin: '0 0 0 10px' }} />
          </Button>}
      >
        {
          this.state.nodoNombre ?
            <Fragment>
              <Modal.Header>
                <Grid>
                  <Grid.Column>
                    <h2>Crear Sede</h2>
                  </Grid.Column>
                </Grid>
              </Modal.Header>

              <Modal.Content>
                <Grid>
                  <Grid.Column width={4}>
                    <h3 style={{ margin: "10px 0 0 0" }}>Nodo</h3>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Input
                      disabled
                      type="text"
                      name="nodo"
                      value={this.state.nodoNombre}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      disabled
                    />
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column width={4}>
                    <h3 style={{ margin: "10px 0 0 0" }}>Sede</h3>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Input
                      type="text"
                      name="nodo"
                      onChange={this.enCambio}
                    />
                  </Grid.Column>
                </Grid>
              </Modal.Content>
            </Fragment>
            : <Segment>
              <Dimmer active inverted>
                <Loader inverted>Cargando...</Loader>
              </Dimmer>
              <Image src='https://react.semantic-ui.com/imagenes/wireframe/short-paragraph.png' />
            </Segment>
        }
        <Modal.Actions>
          <Button className="cancelButton" onClick={() => this.abrirModal(false)}>
            Cerrar
          </Button>

          <Button className="confirmButton" onClick={() => this.enConfirmacion()}>
            Crear
          </Button>

        </Modal.Actions>
      </Modal>
    )
  }
}

export default CrearSede