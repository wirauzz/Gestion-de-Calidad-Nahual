import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { CSVReader } from "react-papaparse";

class CargaCSV extends Component {

   constructor(props) {
      super(props);
      this.state = {
         alumnes: [],
      };
   }
  
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

   getNivelIngles(nivel){
      switch(nivel) {
         case "Basico":
            return 1
         case "Intermedio":
            return 2
         case "Avanzado":
            return 3
         default:
           return 1
       }
   }

   handleOnDrop = (data) => {
      data.forEach((fila) => {
         var inscripte = {
            dni: fila.data["DNI"],
            nombre: fila.data["Nombre/s"],
            apellido: fila.data["Apellidos"],
            fechaNacimiento: fila.data["Fecha de Nacimiento"],
            correo: fila.data["Correo Electronico"],
            celular: fila.data["Telefono"],
            nodoId: this.props.curso.NodoId,
            sedeId: this.props.curso.SedeId,
            nivelInglesId: this.getNivelIngles(fila.data["Nivel de Ingles"]),
            topico: this.props.curso.topico,
            nacionalidad: fila.data["Nacionalidad"],
            correoOpcional: fila.data["Correo Opcional"],
            detalle: fila.data["Detalle"],
            tipoDNI: fila.data["Tipo DNI"]
         };
         this.state.alumnes.push(inscripte);
         this.props.setMostrarLista(true);
         this.props.setConfirmar(true);
      });
      console.log(this.state.alumnes)
      this.props.setAlumnes(this.state.alumnes)
   };

   formatearFecha(fecha) {
      return fecha.split("-").reverse().join("-");
   }

   handleOnError = (err) => {
      console.log(err);
   };

   handleOnRemoveFile = () => {
      this.props.setMostrarLista(false)
      this.setState({ alumnes: [] });
   };

   render() {
      return (
         <div>
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
               <span>Arrastra el archivo CSV aquí.</span>
            </CSVReader>
                 
         </div>
      );
   }
}

export default CargaCSV;

