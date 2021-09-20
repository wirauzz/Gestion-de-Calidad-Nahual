import React, { Component } from "react";
import {
  Table,
  Loader,
  Dimmer,
  Message,
  Label,
  Icon,
  Segment,
  Header
} from "semantic-ui-react";
import Egresade from "./Egresade";
import FabricaDeFiltros from "../FiltradoDeEgresades/FabricaDeFiltros/FabricaDeFiltros";
import ServicioDeEgresades from "../../../services/ServicioDeEgresades";
import BotonExportar from "./BotonExportar";
import OpcionesDeQuitarFiltro from "../FiltradoDeEgresades/OpcionesDeQuitarFiltro";
import BotonDeFiltrado from "./BotonDeFiltrado";
import iconoEgresade from "../../../assets/images/egresadeIcon.png";
import {Pagination} from 'semantic-ui-react';
import '../../../styles/EmpresasStyles/ListaEgresades.css';

class ListaEgresades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      egresades: [],
      filterBy: "Todos",
      criterioDeFiltrado: "",
      nuevaPeticionDeFiltrado: false,
      mostrarBotonDeCarga: true,
      quitarUnFiltro: "",
      deshabilitarFiltro: {
        value: "Todos",
        filterby: "Todos",
        desactivarOpcion: false
      },
      egresadesSeleccionados: [],
      firstElement:0,
      lastElement:10,
      actualPage:1,
      cantItems:0,
      cantPages:0
    };
  }


  componentDidMount() {
    this.obtenerTodesLosEgresades();
  }

  obtenerRespuesta(respuesta) {
    this.setState({
      egresades: respuesta.data.response,
      nuevaPeticionDeFiltrado: false,
      mostrarBotonDeCarga: false,
      cantItems:respuesta.data.response.length,
      cantPages:Math.round((respuesta.data.response.length/10)+0.5)
    });
  }

  errorDeCaptura(error) {
    this.setState({
      nuevaPeticionDeFiltrado: false,
      mostrarBotonDeCarga: false
    });
    alert("Hay un error en la base de datos, status: " + error.status);
  }

  async obtenerTodesLosEgresades() {
    await ServicioDeEgresades.obtenerEgresades()
      .then((respuesta) => {
        this.obtenerRespuesta(respuesta);
      })
      .catch((error) => {
        this.errorDeCaptura(error);
      });
  }

  async obtenerEgresadesFiltrados() {
    await FabricaDeFiltros(this.state.criterioDeFiltrado)
      .then((respuesta) => {
        this.obtenerRespuesta(respuesta);
      })
      .catch((error) => {
        this.errorDeCaptura(error);
      });
  }

  listaEgresades() {
    if (this.state.nuevaPeticionDeFiltrado) {
      this.obtenerEgresadesFiltrados();
    }
    return this.mapeoListaEgresades(this.state.egresades);
  }

  mapeoListaEgresades(listaEgresades) {
    return listaEgresades.slice(this.state.firstElement,this.state.lastElement).map((egresade, index) => {
      return (
        <Egresade
          item={egresade}
          key={egresade.id}
          seleccionarEgresades={this.seleccionarEgresades}
          numeracion={index + 1}
        />
      );
    });
  }

  enviarDatosAlEstado(data, estado) {
    this.setState({
      criterioDeFiltrado: data,
      filterBy: data.value,
      nuevaPeticionDeFiltrado: true,
      mostrarBotonDeCarga: true,
      egresadesSeleccionados: [],
      quitarUnFiltro: "",
      deshabilitarFiltro: {
        value: "Todos",
        filterby: "Todos",
        desactivarOpcion: estado
      }
    });
    this.cambiarEstadoDeCheckbox(true);
  }

  manejarEvento = (data) => {
    this.enviarDatosAlEstado(data, true);
  };

  quitarFiltros(data) {
    this.enviarDatosAlEstado(data, false);
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

  listaVacia() {
    let cabeceraDelMensaje = "por el momento no tenemos egresades disponibles.";
    let contenidoDelMensaje = "Intenta mas tarde";
    if (this.state.filterBy !== "Todos") {
      cabeceraDelMensaje = "no existen datos relacionados con su busqueda.";
      contenidoDelMensaje = "Intenta con otro filtro";
    }
    return this.state.egresades.length === 0 ? (
      <Message
        icon="warning sign"
        warning
        header={`Lo sentimos, ${cabeceraDelMensaje}`}
        content={`${contenidoDelMensaje}. Gracias`}
      />
    ) : (
      <BotonExportar
        seleccionados={this.state.egresadesSeleccionados}
        deseleccionarEgresades={() => {
          this.cambiarEstadoDeCheckbox(true);
          this.setState({ egresadesSeleccionados: [] });
        }}
      />
    );
  }

  removerFiltros() {
    return (
      this.state.deshabilitarFiltro.desactivarOpcion === true && (
        <Label
          pointing="left"
          as="a"
          onClick={() => this.quitarFiltros(this.state.deshabilitarFiltro)}
          valor={this.state.deshabilitarFiltro}
        >
          Quitar Todos
          <Icon name="delete" />
        </Label>
      )
    );
  }

  seleccionarTodosEgresades() {
    let checkboxes = this.cambiarEstadoDeCheckbox(false);
    checkboxes[0].checked
      ? this.setState({ egresadesSeleccionados: this.state.egresades })
      : this.setState({ egresadesSeleccionados: [] });
  }

  seleccionarEgresades = (egresade, checked) => {
    if (checked) {
      this.setState({
        egresadesSeleccionados: this.state.egresadesSeleccionados.concat(
          egresade
        )
      });
    } else {
      this.state.egresadesSeleccionados.map(() => {
        return this.setState({
          egresadesSeleccionados: this.state.egresadesSeleccionados.filter(
            (e) => e.id !== egresade.id
          )
        });
      });
    }
  };
  cambiarEstadoDeCheckbox(filtro) {
    let checkboxes = Array.from(document.getElementsByName("checkbox"));
    checkboxes.map((checkbox) => {
      return filtro
        ? (checkbox.checked = false)
        : (checkbox.checked = checkboxes[0].checked);
    });
    return checkboxes;
  }

  quitarUnFiltro = (data) => {
    this.setState({
      criterioDeFiltrado: {
        value: data.filterby,
        filterby: "SinFiltros"
      },
      quitarUnFiltro: data,
      nuevaPeticionDeFiltrado: true,
      mostrarBotonDeCarga: true
    });
  };

  verificarSiEraUltimoBoton = (data) => {
    if (data === false) this.quitarFiltros(this.state.deshabilitarFiltro);
  };

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
    this.state.lastElement= ((activePage)*10);
    this.state.firstElement= (this.state.lastElement-10);
  };

  render() {
    return (
      <>
        {this.iconoDeCarga()}
				<Header className="titulo" as='h2' image={iconoEgresade} textAlign="center" content='Lista Egresades' />
        <Segment>
          <BotonDeFiltrado
            manejarEvento={this.manejarEvento}
            valor={this.state.deshabilitarFiltro}
            quitarUnFiltro={this.state.quitarUnFiltro}
          />
          {this.removerFiltros()}
          <OpcionesDeQuitarFiltro
            quitarFiltro={this.quitarUnFiltro}
            esUltimoFiltro={this.verificarSiEraUltimoBoton}
            opcion={this.state.criterioDeFiltrado}
          />
        </Segment>
        <div style={{ overflowX: "auto" }}>
          <Table singleLine selectable striped unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="header-table" textAlign="center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    onClick={() => this.seleccionarTodosEgresades()}
                    style={{ transform: "scale(1.4)" }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className="header-table">NOMBRE Y APELLIDO</Table.HeaderCell>
                <Table.HeaderCell className="header-table">CORREO</Table.HeaderCell>
                <Table.HeaderCell className="header-table">TELEFONO</Table.HeaderCell>
                <Table.HeaderCell className="header-table">NODO</Table.HeaderCell>
                <Table.HeaderCell className="header-table">MÓDULOS CURSADOS</Table.HeaderCell>
                <Table.HeaderCell className="header-table">NIVEL DE INGLES</Table.HeaderCell>
                <Table.HeaderCell className="header-table" textAlign="center"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.listaEgresades()}</Table.Body>
          </Table>
          <Pagination
            boundaryRange={0}
            defaultActivePage={this.state.actualPage}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={this.state.cantPages}
            onPageChange={this.setPageNum}
          />
        </div>
        {this.listaVacia()}
      </>
    );
  }
}

export default ListaEgresades;
