import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { CSVReader } from "react-papaparse";
import { Message, Button, Modal, Table } from "semantic-ui-react";
import CargarLista from "./CargarLista";
import exampleXlsx from "../../../assets/example.csv";
//import { withAuthenticationRequired } from "@auth0/auth0-react";
//import VistaNoAutorizado from "../inicio-de-sesion/VistaNoAutorizado";
import { ObtenerNodosYSedes } from "../../../services/Nodo.js";
var listaNodos = [];
var listaSedes = [];

const findNodo = (datos, nodo) => {
   if (datos.find((el) => el === nodo)) {
      return true;
   }
   return false;
};
const findSede = (data, sede) => {
   if (data.find((el) => el === sede)) {
      return true;
   }
   return false;
};

const publicarListaDeEgresades_URL = `${process.env.REACT_APP_SERVICIO_DE_DATOS_API}/egresades/`;

class ModalDeImportar extends Component {
   obtenerNodosYSedes = async () => {
      //const API_URL = `${process.env.REACT_APP_SERVICIO_DE_DATOS_API}/nodos/`;
      await ObtenerNodosYSedes()
         .then((response) => {
            this.setState({
               respuestaNodos: response.data.response,
            });
            this.state.respuestaNodos.forEach(function (element) {
               listaNodos.push(element.nombre);
               element.sedes.forEach(function (element) {
                  listaSedes.push(element.nombre);
               });
            });
         })
         .catch(function (error) {
            console.log(error);
         });
   };
   constructor(props) {
      super(props);
      this.obtenerNodosYSedes();
      this.state = {
         abierto: false,
         mostrarLista: false,
         egresades: [],
         contadorEgresades: 0,
         mensajeDeErrorDeCarga: "",
         mostrarMensajeDeErrorDeCarga: false,
         respuestaNodos: [],
      };
      this.mostrarTabla = this.mostrarTabla.bind(this);
      this.setAbierto = this.setAbierto.bind(this);
      this.errorDeCarga = this.errorDeCarga.bind(this);
      this.formatearFecha = this.formatearFecha.bind(this);
   }
   mostrarTabla = (data) => {
      this.setState({
         mostrarLista: true,
      });
   };

   setAbierto = (state) => {
      this.setState({
         abierto: state,
         mostrarLista: false,
         egresades: [],
         contadorEgresades: 0,
      });
   };

   onSubmit = (onRegistrarCorrectamente) => {
      let lista = this.state.egresades;
      lista = lista.map((x) => {
         if(x.fechaNacimiento != null){
            x.fechaNacimiento = x.fechaNacimiento.split("-").reverse().join("-");
            x.fechaNacimiento = x.fechaNacimiento.split("/").reverse().join("/");         
         }
         if(x.fechaPrimerEmpleo !=null){ 
            
            x.fechaPrimerEmpleo = x.fechaPrimerEmpleo.split("-").reverse().join("-");
            x.fechaPrimerEmpleo = x.fechaPrimerEmpleo.split("/").reverse().join("/");
         }
         return x;
      });
      fetch(publicarListaDeEgresades_URL, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify(lista).length.toString(),
         },
         body: JSON.stringify(lista),
      })
         .then((res) => {
            console.log("estado:");
            console.log(res.status);
            if (res) {
               onRegistrarCorrectamente(this.state.contadorEgresades);
               this.setAbierto(false);
            }
         })
         .catch((err) => {
            console.log("error al leer los datos " + err);
         });
   };

   getDate(date) {
      if (date) {
         let splittedDate = date.split("/");
         let preparedDate =
            splittedDate[1] + "/" + splittedDate[0] + "/" + splittedDate[2];
         return preparedDate;
      } else {
         return null;
      }
   }

   handleOnDrop = (data) => {
      data.forEach((fila) => {
         var nodo = fila.data["NODO"];
         var sede = fila.data["SEDE"];
         if (findNodo(listaNodos, nodo) && findSede(listaSedes, sede)) {
            var egresade = {
               nombre: fila.data["Nombre"],
               apellido: fila.data["Apellido"],
               Estado: "Egresade",
               fechaNacimiento:
                  fila.data["Fecha de Nacimiento"] === ""
                     ? null
                     : fila.data["Fecha de Nacimiento"],
               correo: fila.data["Mail"],
               celular: fila.data["Numero de Celular"],
               sede: fila.data["SEDE"],
               nodo: fila.data["NODO"],
               añoGraduacion: fila.data["Anio"],
               periodo: fila.data["Cuatri"],
               nivelIngles:
                  fila.data["Ingles"] === "Básico"
                     ? "Basico"
                     : fila.data["Ingles"],
               nombrePrimerTrabajo: fila.data["Empresa IT primer empleo"],
               linkedin: fila.data["Linkedin"],
               esEmpleado:
                  fila.data["Consiguio trabajo luego de egresar?"] === "" ? false : true,
               topico: fila.data["Tipo de curso del cual egreso"]=== "" ? null: fila.data["Tipo de curso del cual egreso"],
               profesor: fila.data["Profesor referente"]=== "" ? null: fila.data["Profesor referente"],
               tipoDNI:fila.data["Tipo de Documento"]=== "" ? null: fila.data["Tipo de Documento"],
               dni:fila.data["Numero de Documento"] === "" ? null: fila.data["Numero de Documento"],
               correoOpcional:fila.data["Mail Opcional"] === "" ? null: fila.data["Mail Opcional"] ,
               fechaPrimerEmpleo:fila.data["Consiguio trabajo luego de egresar?"]=== "" ? null: fila.data["Consiguio trabajo luego de egresar?"],

            };
            this.state.egresades.push(egresade);
            this.incrementarContadorEgresades();
         } else {
            this.state.egresades = [];
            this.setState({ contadorEgresades: 0 });
            this.errorDeCarga();
            throw null;
         }
         this.mostrarTabla();
      });
   };

   formatearFecha(fecha) {
      return fecha.split("-").reverse().join("-");
   }

   errorDeCarga() {
      this.setState({
         mensajeDeErrorDeCarga:
            "Error de formato en la columna Nodos o Sedes, verifique la informacion..",
         mostrarMensajeDeErrorDeCarga: true,
      });
      this.handleOnRemoveFile();
   }

   manejarProblemasErrorDeCarga = () => {
      this.setState({ mostrarMensajeDeErrorDeCarga: false });
   };

   incrementarContadorEgresades() {
      this.setState({ contadorEgresades: this.state.contadorEgresades + 1 });
   }

   handleOnError = (err) => {
      console.log(err);
   };

   handleOnRemoveFile = () => {
      this.setState({ mostrarLista: false, egresades: [] });
   };
   setAbierto(state) {
      this.setState({
         abierto: state,
         mostrarLista: false,
         egresades: [],
         contadorEgresades: 0,
      });
   }

   render() {
      return (
         <div>
            <Modal
               centered={true}
               open={this.state.abierto}
               onClose={() => this.setAbierto(false)}
               onOpen={() => this.setAbierto(true)}
               trigger={
                  <Button color="green">
                     <i className="white upload icon" />
                     Importar
                  </Button>
               }
            >
               <Modal.Header>Importar</Modal.Header>
               <Modal.Content color="white">
                  <div>
                     {this.state.mostrarMensajeDeErrorDeCarga ? (
                        <Message
                           negative
                           onDismiss={this.manejarProblemasErrorDeCarga}
                           header="Error de carga!"
                           content={this.state.mensajeDeErrorDeCarga}
                        ></Message>
                     ) : (
                        <p></p>
                     )}
                  </div>
                  <Modal.Description>
                     <CSVReader
                        config={{
                           header: true,
                           skipEmptyLines: "greedy",
                        }}
                        onDrop={this.handleOnDrop}
                        onError={this.handleOnError}
                        addRemoveButton
                        onRemoveFile={this.handleOnRemoveFile}
                     >
                        <span>Drop CSV file here to upload.</span>
                     </CSVReader>
                  </Modal.Description>
               </Modal.Content>
               <div className="container">
                  <h4>Nombres de headers del archivo .csv para la carga</h4>
                  <h5>El formato de fecha debe ser dd/mm/yyyy</h5>
                  <h5>No deben haber comillas entre los campos</h5>
                  <h5>El archivo no debe sobrepasar las 200 filas</h5>
               </div>
               <Table celled>
                  <Table.Header>
                     <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Apellido</Table.HeaderCell>
                        <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
                        <Table.HeaderCell>Mail</Table.HeaderCell>
                        <Table.HeaderCell>Numero de Celular</Table.HeaderCell>
                        <Table.HeaderCell>NODO</Table.HeaderCell>
                        <Table.HeaderCell>SEDE</Table.HeaderCell>
                        <Table.HeaderCell>Anio</Table.HeaderCell>
                     </Table.Row>
                     <Table.Row>
                        <Table.HeaderCell>Cuatri</Table.HeaderCell>
                        <Table.HeaderCell>
                           Tipo de curso del cual egreso
                        </Table.HeaderCell>
                        <Table.HeaderCell>Profesor referente</Table.HeaderCell>
                        <Table.HeaderCell>Ingles</Table.HeaderCell>
                        <Table.HeaderCell>Linkedin</Table.HeaderCell>
                        <Table.HeaderCell>
                           Consiguio trabajo luego de egresar?
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                           Empresa IT primer empleo
                        </Table.HeaderCell>
                     </Table.Row>
                     <Table.Row>
                        <Table.HeaderCell>Numero de Documento</Table.HeaderCell>
                        <Table.HeaderCell>Tipo de Documento</Table.HeaderCell>
                        <Table.HeaderCell>Mail Opcional</Table.HeaderCell>

                     </Table.Row>
                  </Table.Header>
                  <Button>
                     <a href={exampleXlsx} download="example.csv">
                        Descargar Ejemplo
                     </a>
                  </Button>
               </Table>
               <Modal.Actions>
                  {this.state.mostrarLista && this.state.egresades !== [] ? (
                     <CargarLista json={this.state.egresades} />
                  ) : (
                     <h1 align="center">No se cargo ningun archivo</h1>
                  )}
                  <button
                     className="ui basic negative button"
                     onClick={() => this.setAbierto(false)}
                  >
                     Cancelar
                  </button>
                  <button
                     className="ui basic positive button"
                     style={{ border: "rgb(129,206,50)" }}
                     onClick={() => this.onSubmit(this.props.onClick)}
                  >
                     Confirmar
                  </button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

export default ModalDeImportar;

/* export default withAuthenticationRequired(ModalDeImportar, {
  onRedirecting: () => <VistaNoAutorizado />,
}); */
