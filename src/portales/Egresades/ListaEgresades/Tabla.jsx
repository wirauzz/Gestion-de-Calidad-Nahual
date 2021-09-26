import React, { Component } from 'react'
import { Label, Button, Message, Table, Search, Dropdown, Pagination, Grid, Header, Icon, Divider} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { OpcionesDeFiltro } from '../../Egresades/Egresade/EditarEgresade/OpcionesDeSeleccion/OpcionesDeFiltro';
import ModalDeImportar from '../BotonImportar/ModalDeImportar';
import Eliminar from '../Egresade/EliminarEgresade/Eliminar';
import Modal from '../Egresade/VerEgresade/Modal';
import Nahual_Egresades from '../Menu/Menu'
import '../../../styles/EgresadesStyles/Table.css';
import {ObtenerEgresades} from './../../../services/Estudiante.js';
import BotonReinscribir from '../Reinscribir/BotonReinscribir'

const { REACT_APP_SERVICIO_DE_DATOS_API }  = process.env;
class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      busqueda: '',
      egresades: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false,
      currentFilter: 'Egresade',
      valueFilter:'',
      cargando: true,
      cantItems:0,
      cantPages:0,
      firstElemetToShow:0,
      lastElementToShow:10,
      actualPage:1
    }
    this.enRegistroExitoso = this.enRegistroExitoso.bind(this)
  }

  enRegistroExitoso(contador) {
    if (contador > 0) {
      this.setState({
        mensajeDeEstado: "Se realizo el registro de " + contador + " egresados exitosamente.",
        mostrarMensajeDeEstado: true
      });
    }
    this.obtenerEgresades();
  }

  obtenerEgresades() {
    ObtenerEgresades()
      .then(res => {
        let dat = res.data;
        this.setState({
          api: dat.response,
          egresades: dat.response,
          filasEncontradas: dat.response,
          cargando: false,
          cantItems: dat.response.length,
          cantPages: Math.round((dat.response.length/10)+0.5)       
        },()=>{this.buscador({target:{value:''}})});
      })
  }

  eliminarEgresadesVista(id) {
    this.obtenerEgresades();
  }

  componentDidMount() {
    this.obtenerEgresades();
  }

  mostrarModal() {
    this.setState({ mostrarModal: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  onSearchChange = async e => {
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarEgresades();
  }

  
  buscador(nombre){
    let buscado = nombre.target.value;
    let listaEgresades = this.state.api;
    let resultados = Array(0);
    if (nombre.target.value.trim() === "") {
      this.setState({
        filasEncontradas: this.state.api
      });
    }
  
    for (let contador = 0; contador < listaEgresades.length; contador++) {      
      if ((listaEgresades[contador].nombre.toLowerCase() +" "+listaEgresades[contador].apellido.toLowerCase()).includes(buscado.toLowerCase()) ||
      listaEgresades[contador].nodo.toLowerCase().includes(buscado.toLowerCase()) ||
      listaEgresades[contador].sede.toLowerCase().includes(buscado.toLowerCase())) {

        switch (this.state.currentFilter) {
          case 'Egresade':
              if(listaEgresades[contador].Estado === 'Egresade' || listaEgresades[contador].Estado === 'Egresade/Alumne') {
                resultados.push(listaEgresades[contador]);
              }
            break;
          case 'Empleade':
              if(listaEgresades[contador].Estado === 'Empleade') {
                resultados.push(listaEgresades[contador]);
              }
            break;
          default:
              resultados.push(listaEgresades[contador]);
        }
      }
    }
    this.setState({
      filasEncontradas: resultados,
      valueFilter: nombre.target.value
    });
    this.state.cantPages= Math.round((resultados.length/10)+0.4)
    this.state.activePage=1
    this.state.firstElemetToShow= ((this.state.activePage-1)*10);
    this.state.lastElementToShow= ((this.state.activePage)*10);
  }


  activeFilter(filter){
    this.setState({
      currentFilter: filter
    },()=>{ 
      this.buscador(
      {target:{value:this.state.valueFilter}}
    )});
   
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
    this.state.firstElemetToShow= ((activePage-1)*10);
    this.state.lastElementToShow= ((activePage)*10);
  };
  

  render() {
    return (
      <div>
        <Nahual_Egresades actual = {'Egresades'}/> 
        <div className="tabla"> 
        <Grid centered>
          <Header as='h2' textAlign='center' style={{marginTop: '20px', marginBottom: '20px'}}>
            <Icon name='users' circular/>
            <Header.Content>Lista Egresades</Header.Content>
          </Header>
        </Grid>
        <Divider/>
          
          <div>
            {this.state.mostrarMensajeDeEstado ?
              <Message
                positive
                onDismiss={this.manejarProblemas}
                header='Registro exitoso!'
                content={this.state.mensajeDeEstado}
              ></Message>
              :
              <p></p>
            }
          </div>
          <div className="tabla-menu">
            <Search
              showNoResults={false}
      
              onSearchChange={this.buscador.bind(this)}
              style={{ width: "auto" }}
            >
            </Search>
            <div className="registrar" style={{ color: "black" }}>
              
              <ModalDeImportar onClick={this.enRegistroExitoso} />
            </div>
          </div>

          <Dropdown
            text={this.state.currentFilter}
            icon='filter'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>  
              <Dropdown.Divider />
              <Dropdown.Header icon='tags' content='Estados' />
              <Dropdown.Menu scrolling>
                {OpcionesDeFiltro.map((option) => (
                  <Dropdown.Item 
                  active={option.value === this.state.currentFilter}
                  key={option.value} {...option} 
                  onClick={()=>{this.activeFilter(option.value)}}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>

          <h1 class="ui button floating totales" style={{'backgroundColor':'white'}}>Total: {this.state.filasEncontradas.length}</h1>
          
          
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Nodo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Sede</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Estado</Table.HeaderCell>
                
                <Table.HeaderCell className="cabeceras-tabla-accion">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.cargando? 
              (<Table.Row>
                <td colSpan="5">
                  <div class="ui active centered inline loader"></div>
                </td>
              </Table.Row>) :
              (this.state.filasEncontradas.slice(this.state.firstElemetToShow,this.state.lastElementToShow).map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
              <Label className="nombre">{value.nombre} {value.apellido}</Label><br></br>
                    <Label className="email">{value.correo}</Label>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    
                    <Label className="tarjeta-azul">• {value.nodo}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">• {value.sede}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-verde">• {value.Estado}</Label>
                
                    </Table.Cell>
             
                  <Table.Cell colSpan="3" className="bordes-tabla-accion">
                    {<Link to={`/egresades/editar/${value.id}`}>
                      <Button className="view-button"  color='blue'>
                        <label className="icon-text">Editar</label>
                        <i className="edit icon" style={{ margin: '0 0 0 5px' }}></i>
                      </Button>
                    </Link>}

                    <Modal egresadeId={value.id} open={this.state.mostrarModal} />

                    { value.Estado === 'Egresade' ? <BotonReinscribir idEgresade={value.id}/> : null }
                    
                    {<Link to={`/egresades/certificado/${value.id}`}>
                      <Button className="view-button"  color='teal'>
                        <label className="icon-text">Certificado</label>
                        <i className="edit icon" style={{ margin: '0 0 0 5px' }}></i>
                      </Button>
                    </Link>}

                    <Eliminar egresadeId={value.id} eliminarVista={() => this.eliminarEgresadesVista(value.id)}></Eliminar>
                    
                  </Table.Cell>
                </Table.Row>
              )))
              }
            </Table.Body>
          </Table>

          <Pagination
            boundaryRange={0}
            defaultActivePage={this.state.actualPage}
            currentPage
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={this.state.cantPages}
            onPageChange={this.setPageNum}
          />

        </div>
      </div>)

  }

}
export default Nahual_Table;
