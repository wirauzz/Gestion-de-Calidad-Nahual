import React from "react";
import NahualLogo from "../assets/images/logo-proyecto-nahual.webp";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

function Encabezado() {
   const {
    user: usuario,
    isAuthenticated: estaAutenticado,
    logout: cerrarSesion,
  } = useAuth0(); 
  return (
    <div style={{ paddingBottom: "90px" }}>
      <Menu
        fixed="top"
        secondary
        style={{ borderBottom: "3px solid #81ce32", backgroundColor: "white" }}
      >
        <NavLink
          to="/home"
        >
          
          <Menu.Item>
            <Image rounded size={"small"} src={NahualLogo} />
          </Menu.Item>
        </NavLink>
        <>
        {estaAutenticado && (
					<>
						<Menu.Item position="right">
							<Dropdown
								trigger={
									<span>
										<Image src={usuario.picture} avatar />
										{usuario.name}
									</span>
								}
								options={[
									{
										key: "cerrar-sesion",
										text: "Cerrar Sesión",
										icon: "sign out"
									}
								]}
								pointing="top left"
								onChange={() => cerrarSesion({ returnTo: window.location.origin})}
							/>
						</Menu.Item>
					</>
				)}
        </>
      </Menu>
    </div>
  );
}
export default Encabezado;
