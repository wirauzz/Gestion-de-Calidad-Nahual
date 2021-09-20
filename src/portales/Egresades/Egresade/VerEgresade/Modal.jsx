import React, { Component, Fragment } from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header, Segment, Loader, Dimmer } from 'semantic-ui-react';
import '../../../../styles/EgresadesStyles/Modal.css';
import LogoNahual from '../../../../assets/images/logo-proyecto-nahual.webp';
import InformacionDelEgresade from "./InformacionDelEgresade";
import InformacionDelCurso from "./InformacionDelCurso";
import InformacionDelPrimerTrabajo from "./InformacionDelPrimerTrabajo"
import userIcon from '../../../../assets/images/user-icon.jpeg'
import { ObtenerEgresade } from '../../../../services/Estudiante.js';
import { obtenerCurososDeEstudiante } from '../../../../services/Inscripto.js';
class ModalExampleModal extends Component {
  constructor() {
    super();
    this.state = {
      cursos: [],
      open: false
    };
  }

  componentDidMount() {
    this.obtenerCursosDeEstudiante();
  }

  obtenerEgresadeDeAPI() {
    ObtenerEgresade(this.props.egresadeId)
      .then(response => {
        this.setState({
          egresade: response.data.response
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  abrirModal(estado) {
    this.setState({
      open: estado
    });
  }

  obtenerCursosDeEstudiante() {
    obtenerCurososDeEstudiante(this.props.egresadeId)
      .then((response) => { return response.json() })
      .then((response) => {
        this.setState({ cursos: response.response })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.abrirModal(false)}
        onOpen={() => this.abrirModal(true)}
        size="small"
        closeIcon
        trigger={
          <Button color='green' onClick={() => (this.obtenerEgresadeDeAPI(this.props.egresadeId))}>
            <label className="icon-text" >Ver</label>
            <i className="eye icon" style={{ margin: '0 0 0 5px' }}></i>
          </Button>}
      >
        {
          this.state.egresade ?
            <Fragment>
              <Modal.Header>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Image src={LogoNahual} size='small' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <h1>{this.state.egresade.nombre} {this.state.egresade.apellido}</h1>
                  </Grid.Column>
                </Grid>
              </Modal.Header>
              <Modal.Content image>
                <Grid columns='equal'>
                  <Grid.Row>
                    <Grid.Column>
                      <img src={userIcon}></img>
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <InformacionDelEgresade egresade={this.state.egresade} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <InformacionDelCurso egresade={this.state.egresade} cursos={this.state.cursos} />
                    </Grid.Column>
                  </Grid.Row>
                  {this.state.egresade.nombrePrimerTrabajo ?
                    <>
                      <Grid.Row>
                        <Grid.Column>
                          <InformacionDelPrimerTrabajo egresade={this.state.egresade} />
                        </Grid.Column>
                      </Grid.Row>
                    </>
                    : null}
                  {this.state.egresade.linkedin ?
                    <>
                      <GridRow>
                        <Grid.Column>
                          <Header as='h3'> <Icon name='linkedin' />Linkedin</Header>
                          <Grid columns='equal'>
                            <Grid.Column></Grid.Column>
                            <Grid.Column width={15}><a className="card-lightBlue" href={this.state.egresade.linkedin} target="_blank" rel="noopener noreferrer">• {this.state.egresade.linkedin} </a></Grid.Column>
                          </Grid>
                        </Grid.Column>
                      </GridRow>
                    </>
                    : null}
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
          <Button onClick={() => this.abrirModal(false)}>
            Cerrar
        </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleModal