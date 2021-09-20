import React, { Children } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { createRef } from 'react/cjs/react.production.min';
import {AccesosService} from "../services/AccesoAut"
import servicioNotificacion from "../layouts/Notificaciones";

export default function SideBar({portalComponent:PortalComponent, history:History, match:Match, permisos}) {
    const { user:usuario,isAuthenticated:estaAutenticado,logout: cerrarSesion } = useAuth0();
    const botonActual = window.location.href.split('/').find((el)=> el === 'home' || el === 'egresades' || el === 'cursos' || el === 'panel-administrador' || el === 'empresas');
    return (
        <Sidebar.Pushable as={Segment}  style={{height:"calc(100vh - 225px)", width:"100vw", paddingLeft:"0px", overflow:"auto"}}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
        <NavLink exact to="/home">
            <Menu.Item as='a'>
                <Icon name='home' style={{color: botonActual === 'home' ? "rgb(124,198,49)": "rgb(255,255,255)"}}/>
                <p style={{color:botonActual === 'home' ? "rgb(124,198,49)": "rgb(255,255,255)"}}>Home</p>
            </Menu.Item>
        </NavLink>
        {
            permisos.egresades &&
            <NavLink exact to="/egresades">
                <Menu.Item as='a'>
                    <Icon name='student' style={{color: botonActual === 'egresades' ? "rgb(124,198,49)": "rgb(255,255,255)"}} />
                    <p style={{color:botonActual === 'egresades' ? "rgb(124,198,49)": "rgb(255,255,255)"}}>Egresades</p>
                </Menu.Item>
            </NavLink>
        }
        {
            permisos.cursos &&
            <NavLink exact to="/cursos">
                <Menu.Item as='a'>
                <Icon name='clipboard outline' style={{color: botonActual === 'cursos' ? "rgb(124,198,49)": "rgb(255,255,255)"}}/>
                <p style={{color:botonActual === 'cursos' ? "rgb(124,198,49)": "rgb(255,255,255)"}}>Cursos</p>
                </Menu.Item>
            </NavLink>

        }
        {
            permisos.admin &&
            <NavLink exact to="/panel-administrador">
                <Menu.Item as='a'>
                    <Icon name='lock' style={{color: botonActual === 'panel-administrador' ? "rgb(124,198,49)": "rgb(255,255,255)"}}/>
                    <p style={{color:botonActual === 'panel-administrador' ? "rgb(124,198,49)": "rgb(255,255,255)"}}>Admin</p>
                </Menu.Item>
            </NavLink>

        }
        {
            permisos.empresas &&
            <NavLink exact to="/empresas">
                <Menu.Item as='a'>
                    <Icon name='building' style={{color: botonActual === 'empresas' ? "rgb(124,198,49)": "rgb(255,255,255)"}}/>
                    <p style={{color:botonActual === 'empresas' ? "rgb(124,198,49)": "rgb(255,255,255)"}}>Empresas</p>
                </Menu.Item>
            </NavLink>
        }

    </Sidebar>

    <Sidebar.Pusher style={{padding: "20px 10px 20px 200px", height:"100%",overflow:"auto"}}>
        <PortalComponent history={History} match={Match}/>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
    )
}
