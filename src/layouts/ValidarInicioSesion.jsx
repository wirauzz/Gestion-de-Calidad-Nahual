import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NoAutorizado from "./VistaNoAutorizado";
import IniciarSesion from "./IniciarSesion";
import LoaderLogin from "./LoaderLogin"

const ValidarInicioSesion = () => {

  

  const { isAuthenticated: estaAutenticado,user: usuario } = useAuth0();

  return estaAutenticado ? <LoaderLogin usuario={usuario}/> : <IniciarSesion />;
};

export default ValidarInicioSesion;
