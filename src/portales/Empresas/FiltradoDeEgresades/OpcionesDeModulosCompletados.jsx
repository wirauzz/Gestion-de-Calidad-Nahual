import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import ServicioDeFiltrado from "../../../services/ServicioDeFiltrado";

class OpcionesDeModulosCompletados extends Component{
  constructor (props){
    super(props)
		this.state = {
      valor: '',
      opcionesDeFiltrado: []
    };
  }

  async componentDidMount() {
    await ServicioDeFiltrado.obtenerOpcionesDeModulosCompletados()
    .then(respuesta => {
      this.agregarOpcionesDeFiltrado(respuesta.data.response);
    })
    .catch(error => {
      alert("Error en la base de datos.")
    })
  }

  agregarOpcionesDeFiltrado(respuesta) {
    const opcionesDeModulosCompletados = []
    respuesta.forEach(opcionDeModuloCompletado => {
      opcionDeModuloCompletado={
        key: opcionDeModuloCompletado.id,
        text: opcionDeModuloCompletado.nombre,
        value: opcionDeModuloCompletado.nombre,
        filterby: "moduloCompletado"
      }
      opcionesDeModulosCompletados.push(opcionDeModuloCompletado);
    });
    this.setState({opcionesDeFiltrado:opcionesDeModulosCompletados})
  }

  manejarEvento(opcionSeleccionada){
    this.setState({ valor: opcionSeleccionada.value });
    this.props.manejarEvento(opcionSeleccionada)
  }  

  opcionesDeFiltro(){
     return (
      <Dropdown.Menu >
        {this.state.opcionesDeFiltrado.map((opcionSeleccionada) => (
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

  componentWillReceiveProps(nuevasProps){
    if (nuevasProps.valor.desactivarOpcion === false || nuevasProps.quitarUnFiltro.filterby === 'moduloCompletado')
      this.setState({valor:'Todos'})
  }

  render(){
    return  (
      <Dropdown
        text='Modulo Cursado' 
        pointing='left' 
        className='link item'
      >
         {this.opcionesDeFiltro()}
       </Dropdown>
    );
  }
}

export default OpcionesDeModulosCompletados;