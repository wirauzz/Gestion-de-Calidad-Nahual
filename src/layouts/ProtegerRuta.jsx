import React, { useState } from "react";
import Axios from "axios";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ValidarInicioSesion from "./ValidarInicioSesion"; 
import SideBar from '../layouts/SideBar'
import AccesosService from "../services/AccesoAut"

const ProtegerRuta = ({ component: Component, ...args }) => {
  const INTENTOS_MAXIMOS_LOGIN = 4;
  const { isAuthenticated: estaAutenticado, user: usuario } = useAuth0();
  const [estado, cambiarEstado] = useState({
    validado: false,
    intentosIniciarSesion: 0,
    egresades:false,
    cursos:false,
    admin:false,
    empresas:false,
  });

  const ValidarTieneAcceso = () => {
    const datos = JSON.stringify({
      nombre: usuario.name,
      email: usuario.email
    });
    if (estado.intentosIniciarSesion <= INTENTOS_MAXIMOS_LOGIN) {
       AccesosService.VerificarAccesoApp(usuario.email)
        .then((respuesta) => {
          if(respuesta.data.data.permisoAdmin || respuesta.data.data.permisoCursosPeriodos || 
            respuesta.data.data.permisoEgresades || respuesta.data.data.permisoEmpresas){
              cambiarEstado({
                validado: true,
                egresades : respuesta.data.data.permisoEgresades ,
                cursos:respuesta.data.data.permisoCursosPeriodos,
                admin:respuesta.data.data.permisoAdmin ,
                empresas:respuesta.data.data.permisoEmpresas
              });          
              
            }
        })
        .catch((error) => {
          cambiarEstado({
            intentosIniciarSesion: estado.intentosIniciarSesion + 1,
          });
          alert("Hay un error con la base de datos, status: " + error.status);
        });
    }
  };
  return (
    <Route
      {...args}
      render={(props) => {
        if ( estaAutenticado) {
          if (estado.validado) {
            return <SideBar portalComponent={Component} {...props} permisos={{egresades:estado.egresades,cursos:estado.cursos,admin:estado.admin,empresas:estado.empresas}}/>;
          } else {
            ValidarTieneAcceso();
            return <ValidarInicioSesion />; 
          }
        } else {
          return <ValidarInicioSesion />;
        }
      }}
    />
  );
};

export default ProtegerRuta;
