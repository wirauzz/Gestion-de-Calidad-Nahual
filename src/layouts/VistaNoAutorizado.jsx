import React, { useState } from "react";
import SolicitarAcceso from "./SolicitarAcceso";
import {
  Header,
  Button,
  Image,
  Segment,
  Grid,
  Icon,
  Reveal,
  Popup,
} from "semantic-ui-react";
import imagenSinAcceso from "../assets/images/NoAcceso.png";
import { useAuth0 } from "@auth0/auth0-react";
import AccesosService from "../services/AccesoAut";
import { useHistory } from "react-router-dom";
import servicioNotificacion from "../layouts/Notificaciones";

const NoAutorizado = () => {
  const { user: usuario, logout: cerrarSesion } = useAuth0();
  const [isOpenModalSolicitarAcceso, setIsOpenModalSolicitarAcceso] =
    useState(false);
  const [estado, cambiarEstado] = useState(false);
  let history = useHistory();
  function redireccionando() {
    history.push("/home");
  }
  const verificarAutorizacion = () => {
    console.log(1);
    AccesosService.VerificarAccesoApp(usuario.email)
      .then((respuesta) => {
        if (
          respuesta.data.data.permisoAdmin ||
          respuesta.data.data.permisoCursosPeriodos ||
          respuesta.data.data.permisoEgresades ||
          respuesta.data.data.permisoEmpresas
        ) {
          cambiarEstado(true);
        } else {
          servicioNotificacion.mostrarMensajeAdvertencia(
            "Lo sentimos",
            `Su cuenta no tiene acceso, cambie de cuenta o solicite acceso.`
          )
          cambiarEstado(false);
        }
      })
      .catch((error) => {
        cambiarEstado(false);
        console.log(error);
        alert("Hay un error con la base de datos, status: " + error.status);
      });
  };

  return (
    <>
      <Grid centered>
        <Reveal animated="small fade" instant style={{ marginTop: "45px" }}>
          <Reveal.Content visible>
            <Image circular size="small" src={usuario.picture} />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image size="tiny" src={imagenSinAcceso} />
          </Reveal.Content>
        </Reveal>
      </Grid>
      <Grid centered>
        <Header
          style={{ marginTop: "45px", marginBottom: "45px" }}
          textAlign="center"
          as="h2"
          content={usuario.name}
          subheader="Para iniciar sesion verifique su acceso o sino, tienes las siguientes opciones:"
        />
      </Grid>

      <Segment placeholder>
        <Grid columns={3} divided stackable textAlign="center">
          
          <Grid.Row verticalAlign="middle">
          <Grid.Column>
              <Header icon>
                <Icon name="sign out" />
                Cambiar a una cuenta con acceso
              </Header>
              <Button
                onClick={() =>
                  cerrarSesion({ returnTo: window.location.origin })
                }
                color="red"
                content="Cerrar Sesion"
              >
               
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="clipboard" />
                Ingresar al Portal
              </Header>
              <Button onClick={() => verificarAutorizacion()} color="green" content="Verificar Acceso">
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="unlock" />
                Solicite Acceso
              </Header>

              <Popup
                content="Si ya solicitaste acceso, no vuelvas a hacerlo, su solicitud esta siendo procesada."
                trigger={
                  <Button
                    onClick={() => {
                      setIsOpenModalSolicitarAcceso(true);
                    }}
                    content="Solicitar"
                    color = "teal"
                  />
                }
              />
            </Grid.Column>

            
          
          </Grid.Row>
        </Grid>
      </Segment>
      {estado
        ? redireccionando()
        : null}
      {isOpenModalSolicitarAcceso ? (
        <SolicitarAcceso
          isOpenModalSolicitarAcceso={isOpenModalSolicitarAcceso}
          setIsOpenModalSolicitarAcceso={setIsOpenModalSolicitarAcceso}
          user={usuario}
        />
      ) : null}
    </>
  );
};

export default NoAutorizado;
