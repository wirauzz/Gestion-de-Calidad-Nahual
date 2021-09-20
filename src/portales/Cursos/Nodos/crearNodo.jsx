import React, { Component, Fragment } from 'react';
import { Button, Modal, Grid, Icon, Input, Form } from 'semantic-ui-react';
import axios from 'axios';
import BASE_ROUTE from "../../../services/rutas";

class CrearNodo extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nombreNodo: ""
    };
  }

  enConfirmacion() {
    if (this.state.nombreNodo === "") {
      alert("Los datos no pueden viajar vacios!");
    } else {
      var nodo = { nombre: this.state.nombreNodo }
      axios.post(`${BASE_ROUTE}/nodos`, nodo)
        .then(function (respuesta) {
          this.setState({ open: false });
          window.location.reload(false);
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  enCambio = (event) => {
    let valor = event.target.value;
    this.setState({ nombreNodo: valor });
  }

  abrirModal(estado) {
    this.setState({
      open: estado
    })
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
          <Button color='green'>
            Nodo
                <Icon color='white' name='add circle' style={{ margin: '0 0 0 10px' }} />
          </Button>}
      >
        {
          <Fragment>
            <Modal.Header>
              <Grid>
                <Grid.Column>
                  <h2>Crear Nodo</h2>
                </Grid.Column>
              </Grid>
            </Modal.Header>

            <Modal.Content>
              <h3 style={{ margin: "10px 0 0 80px" }}>Nodo</h3>
              <Form>
                <Input style={{ margin: "0 0 0 80px" }}
                  type="text"
                  name="nodo"
                  onChange={this.enCambio}
                />
              </Form>
            </Modal.Content>
          </Fragment>
        }
        <Modal.Actions>
          <Button className="cancelButton" onClick={() => this.abrirModal(false)}>Cerrar</Button>
          <Button className="confirmButton" onClick={() => this.enConfirmacion()}>Crear</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CrearNodo