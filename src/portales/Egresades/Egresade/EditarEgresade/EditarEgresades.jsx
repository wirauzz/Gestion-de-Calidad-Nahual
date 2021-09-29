import React, {  Component } from "react";
import 'semantic-ui-css/semantic.css';
import { Button, Grid, GridRow} from 'semantic-ui-react';
import { Form, Input, Dropdown } from 'semantic-ui-react-form-validator';
import '../../../../styles/EgresadesStyles/Registrar.css';
import 'semantic-ui-css/semantic.min.css';
import { OpcionesDeNivelDeIngles } from './OpcionesDeSeleccion/OpcionesDeNivelDeIngles';
import { OpcionesDeEstadoLaboral } from './OpcionesDeSeleccion/OpcionesDeEstadoLaboral';
import { MensajeResultante } from './TipoDeMensaje/MensajeResultante';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {ObtenerEgresade, ActualizarEstudiante} from '../../../../services/Estudiante.js';
import {ObtenerNodosYSedes} from '../../../../services/Nodo.js';
import {obtenerTopicos} from '../../../../services/Topico.js'

function obtenerEstadoDepurado(estadoActual) {
  var estadoDepurado = estadoActual;
  delete estadoDepurado.fechaNacimiento;
  delete estadoDepurado.trabajaActualmente;
  return estadoDepurado;
}

function getFechaPorDefecto() {
  return new Date().toISOString().split('T')[0];
}

function prepararDatosARecuperar(estadoActual) {
  var nombre = estadoActual.nombre;
  var apellido = estadoActual.apellido;
  var fechaNacimiento = estadoActual.fechaNacimiento !== null ? estadoActual.fechaNacimiento.split("T", 1).reduce((acc, fec) => acc.concat(fec), "") : "";
  var trabajaActualmente = OpcionesDeEstadoLaboral.filter(opcion => opcion.key === (estadoActual.trabajaActualmente ? 1 : 0))[0].value;
  let estadoDepurado = obtenerEstadoDepurado(estadoActual);
  return { ...estadoDepurado, nombre, apellido, fechaNacimiento, trabajaActualmente };
}

function obtenerValorConvertidoDeEnvio(opciones, valorAConvertir) {
  return opciones.filter(op => op.key === valorAConvertir)[0].valueToSend;
}
export class EditarEgresades extends Component {
  state = {
    salir: false
  };
  
  constructor(props) {
    super(props);
    this.state = {
      egresade: {
        nombre: '',
        apellido: '',
        dni:'',
        tipoDNI:'',
        nacionalidad:'',
        nodos: [],
        isVisibleErrorMessage: false,
        periodo: null ,
        isVisibleSuccessMessage: false
      },
      topics:[]      
    };
    
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleConfirmEdition = this.handleConfirmEdition.bind(this);
  }
  obtenerTopicosClass(){
    obtenerTopicos().then((response)=>{
      if(response.status==200)
      {
        response.data.response.forEach(singleTopic => {
          this.state.topics.push({key:singleTopic.nombre,text:singleTopic.nombre,value:singleTopic.nombre})          
        });
      }
    })
  }

  

  existeNivelIngles(nivelDeIngles) {
    if (!nivelDeIngles) {
      return null
    }
    else {
      return OpcionesDeNivelDeIngles.filter(op => op.value === this.state.egresade.nivelIngles)[0].valueToSend;
    }
  }

  obtenerEgresade() {
    ObtenerEgresade(this.props.match.params.id)      
      .then(response => {
        console.log(response.data.response)
        this.setState({
          egresade: response.data.response
        });
        let egresadeCompleto = prepararDatosARecuperar(this.state.egresade);
        egresadeCompleto = this.validarFecha(egresadeCompleto);
        this.setState({ egresade: egresadeCompleto });
        this.obtenerNodo();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  validarFecha(egresade) {
    if (egresade.fechaNacimiento == null) {
      egresade.fechaNacimiento = new Date().toLocaleDateString();
    }
    return egresade;
  }

  obtenerNodo() {
    ObtenerNodosYSedes()
      .then(response => {
        
        this.setState({
          nodos: response.data.response
        });

        this.state.nodos.forEach(function (element) {
          element.text = element.nombre;
          element.key = element.nombre;
          element.value = element.nombre;
          element.valueToSend = element.id;
          element.sedes.forEach(function (element) {
            element.text = element.nombre;
            element.key = element.nombre;
            element.value = element.nombre;
            element.valueToSend = element.id;
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  obtenerSede(nodo) {
    if (this.state.nodos === undefined) {
      return null;
    }
    else {
      let nodoEscogido = this.state.nodos.filter(value => value.nombre === nodo)[0];
      let sedesEscogidas = nodoEscogido.sedes
      return sedesEscogidas;
    }
  }

  componentDidMount() {
    this.obtenerEgresade();
    this.obtenerTopicosClass();
  }

  enCambio = (event) => {
    let nombre = event.target.name;
    let valor = event.target.value;
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`${nombre}`];
    let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
    this.setState({ egresade: nuevoEstado });
  }

  obtenerFechaNacimiento(egresade) {
    if (egresade.fechaNacimiento == getFechaPorDefecto()) {
      egresade.fechaNacimiento = null;
    }
    return egresade;
  }

  async handleConfirmEdition() {
    let graduate = await this.guardarEgresade();
    if (graduate !== undefined) {
      this.setState({ isVisibleSuccessMessage: true });
      setTimeout(() => {
        this.setState({ isVisibleSuccessMessage: false });
        this.props.history.push("/egresades");
      }, 700);
    }
  }

  async guardarEgresade() {
    var egresadeAEnviar = {
      ...this.state.egresade,
      nodoId: obtenerValorConvertidoDeEnvio(this.state.nodos, this.state.egresade.nodo),
      sedeId: obtenerValorConvertidoDeEnvio(this.obtenerSede(this.state.egresade.nodo), this.state.egresade.sede)
    }
    let graduateData;
    egresadeAEnviar.nivelInglesId = this.existeNivelIngles(this.state.egresade.nivelIngles)
    egresadeAEnviar = this.obtenerFechaNacimiento(egresadeAEnviar);
    //egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
    egresadeAEnviar.trabajaActualmente = OpcionesDeEstadoLaboral.filter(op => op.value === this.state.egresade.trabajaActualmente)[0].valueToSend;
    egresadeAEnviar.fechaNacimiento = egresadeAEnviar.fechaNacimiento === "" ? null :  egresadeAEnviar.fechaNacimiento;
    delete egresadeAEnviar.nodo;
    delete egresadeAEnviar.sede;
    delete egresadeAEnviar.nivelIngles;
    try {
      console.log('el egresade');
      console.log(egresadeAEnviar);
      graduateData = await ActualizarEstudiante(egresadeAEnviar.id,egresadeAEnviar);
    } catch {
      this.setState({ isVisibleErrorMessage: true });
      setTimeout(() => {
        this.setState({ isVisibleErrorMessage: false });
      }, 2200);
    }
    return graduateData;
  }

  handleCancel = () => { this.setState({ abrirModal: false }) }

  handleConfirm() {
    this.setState({ abrirModal: false })
    this.props.history.push("/egresades");
  }

  handleCancelEdition() {
    this.setState({ abrirModal: true });
  }

  onChangeDropdown = (e, { value, name }) => {
    let valor = this.state.egresade[name];
    this.setState({ selectedType: valor })
    valor = value;
    this.state.egresade[name] = valor;
  }

  onChangeDropdownNodo = (e, { value, name }) => {
    let valor = this.state.egresade[name];
    this.setState({ selectedType: valor })
    this.state.egresade['sede'] = null;
    valor = value;
    this.state.egresade[name] = valor;
  }

  filtrarSedes(opcionesSede, valorAConvertir) {
    return opcionesSede.filter(op => op.nodo === valorAConvertir);
  }
  editarFecha=fecha=>{
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`fechaNacimiento`];
    let nuevoEstado = { ...estadoDepurado, [`fechaNacimiento`]: ""};
    if(fecha != "" && fecha != null){
      nuevoEstado = { ...estadoDepurado, [`fechaNacimiento`]: fecha.toISOString().split('T')[0]};
    }
    this.setState({ egresade: nuevoEstado });
  }
  editarFechaTrabajoActual=fecha=>{
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`fechaActualTrabajo`];
    let nuevoEstado = { ...estadoDepurado, [`fechaActualTrabajo`]: ""};
    if(fecha != "" && fecha != null){
      nuevoEstado = { ...estadoDepurado, [`fechaActualTrabajo`]: fecha.toISOString().split('T')[0]};
    } 
    this.setState({ egresade: nuevoEstado });
  }
  
  
  obtenerNuevaFecha() {
    if(this.state.egresade.fechaNacimiento == undefined || this.state.egresade.fechaNacimiento == ""){
      return null;
    }else {
      const mes = this.state.egresade.fechaNacimiento.substring(5,7);
      const dia = this.state.egresade.fechaNacimiento.substring(8,10);
      const anio = this.state.egresade.fechaNacimiento.substring(0,4);
      const hora = 'T00:00:00';
      const fecha = anio+'-'+mes+'-'+dia+hora;
      return new Date(fecha);
    }
  }

  obtenerNuevaFechaActualTrabajo() {
    if(this.state.egresade.fechaActualTrabajo == undefined || this.state.egresade.fechaActualTrabajo == ""){
      return null;
    }else {
      const mes = this.state.egresade.fechaActualTrabajo.substring(5,7);
      const dia = this.state.egresade.fechaActualTrabajo.substring(8,10);
      const anio = this.state.egresade.fechaActualTrabajo.substring(0,4);
      const hora = 'T00:00:00';
      const fecha = anio+'-'+mes+'-'+dia+hora;
      return new Date(fecha);
    }
  }

  obtenerNuevaFechaPrimerTrabajo() {
    if(this.state.egresade.fechaPrimerEmpleo == undefined || this.state.egresade.fechaPrimerEmpleo == ""){
      return null;
    }else {
      const mes = this.state.egresade.fechaPrimerEmpleo.substring(5,7);
      const dia = this.state.egresade.fechaPrimerEmpleo.substring(8,10);
      const anio = this.state.egresade.fechaPrimerEmpleo.substring(0,4);
      const hora = 'T00:00:00';
      const fecha = anio+'-'+mes+'-'+dia+hora;
      return new Date(fecha);
    }
  }
  editarFechaPrimerEmpleo=fecha=>{
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`fechaPrimerEmpleo`];
    let nuevoEstado = { ...estadoDepurado, [`fechaPrimerEmpleo`]: ""};
    if(fecha != "" && fecha != null){
      nuevoEstado = { ...estadoDepurado, [`fechaPrimerEmpleo`]: fecha.toISOString().split('T')[0]};
    } 
    this.setState({ egresade: nuevoEstado });
  }

  render() {
    const { isVisibleErrorMessage, isVisibleSuccessMessage } = this.state;
    return (
      <div className="contenedor">
        <Form id="myForm" onSubmit={() => this.handleConfirmEdition()} className="ui form">
          <Grid divided='vertically' stackable columns={2}>
            <Grid.Row >
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="nombre">Nombre<br /></label>
                  <Input class="ui one column stackable center aligned page grid" type="text"
                    name="nombre"
                    maxLength="20"
                    placeholder="Nombre"
                    value={this.state.egresade.nombre}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="apellido">Apellidos<br /></label>
                  <Input type="text"
                    name="apellido"
                    maxLength="30"
                    placeholder="Apellido"
                    value={this.state.egresade.apellido}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="tipoDNI">Tipo de documento<br /></label>
                  <Input type="text"
                    name="tipoDNI"
                    maxLength="30"
                    placeholder="tipoDNI"
                    value={this.state.egresade.tipoDNI}
                    errorMessages={['Este campo es requerido', 'El campo no acepta caracteres']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="dni">DNI<br /></label>
                  <Input type="text"
                    name="dni"
                    maxLength="30"
                    placeholder="Dni"
                    value={this.state.egresade.dni}
                    errorMessages={['Este campo es requerido', 'El campo no acepta caracteres']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>

              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nacionalidad">Nacionalidad<br /></label>
                  <Input type="text"
                    name="nacionalidad"
                    maxLength="30"
                    placeholder="Nacionalidad"
                    value={this.state.egresade.nacionalidad}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                {
                  <span className="etiquetas"  >
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento (dd/mm/aaaa)</label>
                    <div  style={{ margin: "0px 12%"}}>
                    <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={this.obtenerNuevaFecha()}
                    onChange={this.editarFecha}/>
                    </div>
                  </span>
              }
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="telefono">Teléfono de Contacto<br /></label>
                  <Input type="text"
                    maxLength="50"
                    name="celular"
                    placeholder="Celular"
                    value={this.state.egresade.celular}
                    errorMessages={['Solo se permite 50 caracteres como maximo']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correo">Correo Electrónico<br /></label>
                  <Input type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={this.state.egresade.correo}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>

              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correoOpcional">Correo Electrónico Opcional<br /></label>
                  <Input type="email"
                    name="correoOpcional"
                    placeholder="Correo Opcional"
                    value={this.state.egresade.correoOpcional}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nivelIngles">Nivel de Ingles<br /></label>
                  <Dropdown type="text"
                    name="nivelIngles"
                    placeholder="Nivel de Inglés"
                    value={this.state.egresade.nivelIngles}
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeNivelDeIngles}
                    style={{ margin: "0px 15%" }}
                    selection
                    required
                  />
                </span>
              </Grid.Column>     
             
            </Grid.Row>
      
            <Grid.Row columns={2}>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="trabajaActualmente">Estado Laboral<br /></label>
                  <Dropdown type="text"
                    name="trabajaActualmente"
                    placeholder={this.state.egresade.trabajaActualmente? "Empleade":"Desempleado"}
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeEstadoLaboral}
                    //value={this.state.egresade.trabajaActualmente? "Empleade":"Desempleado"}
                    style={{ margin: "0px 15%" }}
                    selection
                  />
                </span>
              </Grid.Column>
              {
                (OpcionesDeEstadoLaboral[1].value === this.state.egresade.trabajaActualmente) &&

              <Grid.Column>
              {
                  <span className="etiquetas"  >
                    <label htmlFor="fechaActualTrabajo">Fecha de obtencion trabajo (DD/MM/AAAA)</label>
                    <div  style={{ margin: "0px 12%"}}>
                    <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={this.obtenerNuevaFechaActualTrabajo()} 
                    onChange={this.editarFechaTrabajoActual}/>
                    </div>
                  </span>    
              }
              </Grid.Column>
            }
              { (OpcionesDeEstadoLaboral[1].value === this.state.egresade.trabajaActualmente) &&
                <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correo">Lugar de trabajo(Area tecnologica)<br /></label>
                  <Input type="text"
                    name="lugarActualTrabajo"
                    placeholder="empresa actual trabajo"
                    value={this.state.egresade.lugarActualTrabajo}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              }
            </Grid.Row>
            <Grid.Row columns={2}>
            <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nombrePrimerTrabajo">Nombre Primer Empleo<br /></label>
                  <Input type="text"
                    name="nombrePrimerTrabajo"
                    maxLength="40"
                    placeholder="Nombre Primer Empleo"
                    value={this.state.egresade.nombrePrimerTrabajo}
                    validators={["matchRegexp:^[A-Za-z0-9\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\^\\_\\`\\~ ]+$"]}
                    errorMessages={['El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              {(this.state.egresade.nombrePrimerTrabajo !== "" && this.state.egresade.nombrePrimerTrabajo !== null) &&
              <Grid.Column>
              {
                  <span className="etiquetas"  >
                    <label htmlFor="fechaPrimerEmpleo">Fecha de primer empleo (DD/MM/AAAA)</label>
                    <div  style={{ margin: "0px 12%"}}>
                    <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={this.obtenerNuevaFechaPrimerTrabajo()} 
                    onChange={this.editarFechaPrimerEmpleo}/>
                    </div>
                  </span>    
              }
              </Grid.Column>
              }
               <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="linkedin">Enlace de CV en LinkedIn<br /></label>
                  <Input type="url"
                    name="linkedin"
                    placeholder="LinkedIn"
                    value={this.state.egresade.linkedin}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered rows={1} columns={1}>
            <GridRow>
              <Button type="button" onClick={() => this.props.history.push("/egresades")} className="ui basic negative button" style={{ margin: "0px 50px 10px 50px" }}>Cancelar</Button>
              <Button type="Submit" className="ui basic positive button" style={{ margin: "0px 50px 10px 50px", background: "rgb(129,206,50)" }}>Confirmar</Button>
            </GridRow>
          </Grid>
        </Form>
        {isVisibleErrorMessage && (
          <MensajeResultante encabezadoDelMensaje="Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red" />)}
        {isVisibleSuccessMessage && (
          <MensajeResultante encabezadoDelMensaje="Guardado exitoso" cuerpoDelMensaje="Se guardo exitosamente" colorDeFondo="green" />)}
      </div>
    );
  }
}
export default EditarEgresades;
/* export default withRouter(withAuthenticationRequired(EditarEgresades, {
  onRedirecting: () => <VistaNoAutorizado />,
})); */
