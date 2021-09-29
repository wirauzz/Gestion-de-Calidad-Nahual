import React, { useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import NoAutorizado from "./VistaNoAutorizado";
import { useHistory } from "react-router-dom";

const LoaderLogin = (props) => {
  const [estado] = useState({
    validado: false,
    mostrarIconoCargando: true,
  });

  

  let history = useHistory();
  function redireccionando() {
    history.push("/home");
  }

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
