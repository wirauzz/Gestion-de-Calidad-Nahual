import React, { useState } from "react";
/* import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios"; */
import { Dimmer, Loader } from "semantic-ui-react";
import NoAutorizado from "./VistaNoAutorizado";
import AccesosService from "../services/AccesoAut";
import { useHistory } from "react-router-dom";

const LoaderLogin = (props) => {
  const [estado, cambiarEstado] = useState({
    validado: false,
    mostrarIconoCargando: true,
  });

  /* useEffect(() => {
    verificarAutorizacion();
  }, [estado]); */

  let history = useHistory();
  function redireccionando() {
    history.push("/home");
  }

  const verificarAutorizacion = () => {
    console.log(1);
    AccesosService.VerificarAccesoApp(props.usuario.email)
      .then((respuesta) => {
        if (
          respuesta.data.data.permisoAdmin ||
          respuesta.data.data.permisoCursosPeriodos ||
          respuesta.data.data.permisoEgresades ||
          respuesta.data.data.permisoEmpresas
        ) {
          cambiarEstado({
            validado: true,
            mostrarIconoCargando: false,
          });
        } else {
          cambiarEstado({
            validado: false,
            mostrarIconoCargando: false,
          });
        }
      })
      .catch((error) => {
        cambiarEstado({
          mostrarIconoCargando: false,
        });
        console.log(error);
        alert("Hay un error con la base de datos, status: " + error.status);
      });
  };

  function iconoDeCarga() {
    return (
      /* estado.mostrarIconoCargando */false === true && (
        <Dimmer active inverted>
          <Loader>Verificando Acceso...</Loader>
        </Dimmer>
      )
    );
  }
  return (
    <div>
      {iconoDeCarga()}
      {estado.validado ? redireccionando() : <NoAutorizado />}
    </div>
  );
};

export default LoaderLogin;
