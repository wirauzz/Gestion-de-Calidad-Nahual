import React, { Component } from "react";
import Pdf from "react-to-pdf";
import { Button } from "semantic-ui-react";
import "../../../styles/EgresadesStyles/CertificadoEstilos.css";
import { ObtenerEgresade } from "../../../services/Estudiante.js";
const ref = React.createRef();
const options = {
   orientation: "landscape",
};

class GenerarCertificado extends Component {
   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         nodo: "",
      };
   }

   obtenerEgresade = async () => {
      let egresadeDato;
      try {
         egresadeDato = await ObtenerEgresade(this.props.match.params.id);
         this.setState({ nombre: egresadeDato.data.response.nombre });
         this.setState({ apellido: egresadeDato.data.response.apellido });
         this.setState({ nodo: egresadeDato.data.response.nodo });
      } catch (error) {}
      console.log(egresadeDato);
   };
   componentDidMount() {
      this.obtenerEgresade();
   }
   retornar() {
      this.props.history.push("/egresades");
   }
   render() {
      const { nombre, apellido, nodo } = this.state;
      return (
         <>
            <div className="certificado" ref={ref}>
               <div className="datos">
                  <h2 className="nodoEgresade">{nodo}</h2>
                  <h1 className="nombreEgresade">
                     {nombre} {apellido}
                  </h1>
               </div>
            </div>
            <div className="pdfBotones">
               <Button
                  color="red"
                  onClick={() => {
                     this.retornar();
                  }}
               >
                  <i className="cancel icon"></i>
                  <label className="icon-text">Cancelar</label>
               </Button>
               <Pdf
                  y="0"
                  options={options}
                  targetRef={ref}
                  filename={this.state.nombre + this.state.apellido + ".pdf"}
               >
                  {({ toPdf }) => (
                     <Button onClick={toPdf} color="green">
                        Descargar PDF
                     </Button>
                  )}
               </Pdf>
            </div>
         </>
      );
   }
}

export default GenerarCertificado;
