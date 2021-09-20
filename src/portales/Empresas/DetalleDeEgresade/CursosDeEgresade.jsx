import React, { Component } from "react";
import { Button, Modal, Image, Segment, Loader, Dimmer, Icon, Grid } from 'semantic-ui-react'
import { obtenerCurososDeEstudiante } from '../../../services/Inscripto';
import axios from "axios";
import BASE_ROUTE from "../../../services/rutas";
import InformacionDeCursos from "./InformacionDeCursos";
import LogoNahual from '../../../assets/images/logo-proyecto-nahual.webp'

class CursosDeEgresade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false,
      cursosInscripto: [],
      egresade: null
    };
  }

  async componentDidMount() {
    await this.obtenerCursosEgresade();
    await this.obtenerEgresade();
  }

  async obtenerCursosEgresade() {
    obtenerCurososDeEstudiante(this.props.id)
      .then((response) => { return response.json() })
      .then((response) => {
        this.setState({ cursosInscripto: response.response })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async obtenerEgresade(){
    axios
      .get(`${BASE_ROUTE}/estudiantes/${this.props.id}/DTO`)
      .then(respuesta => {
        this.setState({
          egresade: respuesta.data.response
        });
      })
      .catch(function (error) {
        alert("Error en la base de datos.")
      });
  }

  mostrarModal(state) {
    this.setState({
      abierto: state
    });
  }

  render() {
    return (
      <Modal
        open={this.state.abierto}
        onClose={() => this.mostrarModal(false)}
        onOpen={() => this.mostrarModal(true)}
        size="small"
        closeIcon
        trigger={<Button color="green" icon ><Icon  name="university"></Icon>{' '}Ver modulos</Button>}
      >
        {
          this.state.egresade !== null ?
            <>
              <Modal.Header >
                <Image src={LogoNahual} size='small' />
              </Modal.Header>
              <Modal.Content scrolling>
                <Grid divided='vertically' centered>
                  <InformacionDeCursos egresade={this.state.egresade} cursosInscripto={this.state.cursosInscripto} />
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                <Button basic className="button-perfil" color="grey" onClick={() => this.mostrarModal(false)} >
                  Cerrar
          </Button>
              </Modal.Actions>
            </>
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

export default CursosDeEgresade;
