import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import Axios from "axios";

class OpcionesDeCurso extends Component{
  constructor (props){
    super(props)
		this.state = {
      valor: '',
      opcionesDeCurso: [],
      textoDropdown:'',
      textoMenu:''
    };
  }

  componentDidMount() {
    this.obtenerCursos();
  }

  obtenerCursos(){
    const API_URL = process.env.REACT_APP_SERVICIO_DE_DATOS_API;
    Axios.get(`${API_URL}/cursos`)
      .then((respuesta) => {
        console.log(respuesta.data.response)
        var fitroEstado = respuesta.data.response.filter((curso) => curso.estado === true)
        this.agregarOpcionesDeFiltrado(fitroEstado);
        this.props.cuandoCambiaElCurso(fitroEstado[0].id);
        this.setState({
          textoMenu: fitroEstado[0].topico.nombre + " / " + fitroEstado[0].nodo.nombre +" - "+fitroEstado[0].sede.nombre + " / " + fitroEstado[0].profesores + " / " + fitroEstado[0].horario
        });
      })
      .catch(() => {
        console.log("Error al cargar la base de datos")
      });
  }

  agregarOpcionesDeFiltrado(respuesta) {
    const opcionesDeCurso = [];
    const sedePorDefecto = {nombre: "Sin sede"}
    respuesta.forEach(opcionDeCurso => {
      if (opcionDeCurso.sede == null){
        opcionDeCurso.sede = sedePorDefecto;
      }
      opcionDeCurso = {
        key: opcionDeCurso.id,
        text: opcionDeCurso.topico.nombre + " / " + opcionDeCurso.nodo.nombre + " - "+ opcionDeCurso.sede.nombre + " / " + opcionDeCurso.profesores + " / " + opcionDeCurso.horario,
        value: opcionDeCurso.id,
      }
      opcionesDeCurso.push(opcionDeCurso);
    });
    this.setState({opcionesDeCurso:opcionesDeCurso})
  }
  
  manejarEvento(opcionSeleccionada){
    this.setState({
       valor: opcionSeleccionada.key,
       textoMenu: opcionSeleccionada.text
      });
    this.props.cuandoCambiaElCurso(opcionSeleccionada.key);
  }  

  opcionesDeFiltro(){
     return (
      <Dropdown.Menu >
        {this.state.opcionesDeCurso.map((opcionSeleccionada) => (
          <Dropdown.Item 
            active={opcionSeleccionada.value === this.state.valor}
            key={opcionSeleccionada.key}
            value={opcionSeleccionada.value}
            text={opcionSeleccionada.text}
            {... opcionSeleccionada}
            onClick={() => this.manejarEvento(opcionSeleccionada)}
          />
        ))}
      </Dropdown.Menu>
      )
  }

  render(){
    return  (
     <span>
        Curso: {' '}
        <Dropdown
          inline
          compact
          text={this.state.textoMenu} 
          pointing='left' 
          className='link item'
          placeholder= 'Seleccionar curso'
        >
          {this.opcionesDeFiltro()}
        </Dropdown>
      </span> 
    );
  }
}

export default OpcionesDeCurso;