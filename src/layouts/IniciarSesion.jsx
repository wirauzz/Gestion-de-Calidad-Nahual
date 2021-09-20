import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header, Icon, Segment, Button, Image } from "semantic-ui-react";
import Navbar from "./Encabezado";
import Logo from "../assets/images/educacion-en-linea.png";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const IniciarSesion = () => {
  const { loginWithRedirect: iniciarSesion, isAuthenticated, user: usuario } = useAuth0();
  let history = useHistory();
  function redireccionando() {
    history.push("/home");
  }
  

  return (


    <Segment placeholder vertical textAlign="center" color="white">
      <Header icon textAlign="center" size="large">
        <Image src={Logo} style={{ width: "200px", height: "200px" }} />
      </Header>
      <Segment.Inline style={{ textAlign: "center" }}>
        {isAuthenticated ?
        <>
          <h1>¡Bienvenido!</h1>
          <h4> Ya puede ingresar.</h4>
        </>
        :
        <>
          <h1>¡Bienvenido!</h1>
          <h4> Para continuar debe iniciar sesión.</h4>
        </>
        
        }
        
      </Segment.Inline>
      {/* <NavLink exact to="/home"> */}
      {isAuthenticated ?
          <Button
            size="big"
            style={{ color: "white", marginTop: "30px", backgroundColor: "#4763C8" }}
            onClick={() => { redireccionando() }}
          >
            Ir al Home
              <Icon name="right arrow" />
          </Button>
        :
          <Button
            size="big"
            style={{ marginTop: "30px", backgroundColor: "#87D734" }}
            onClick={() => { iniciarSesion() }}
          >
            Iniciar Sesión
            <Icon name="right arrow" />
          </Button>
      }
      {/* </NavLink> */}
    </Segment>
  );
};

export default IniciarSesion;
