import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
 
export default function Menu_Cursos (props) {
    return (
        <>
            <Menu pointing secondary>
                <Menu.Item
                    as = {NavLink} exact to = '/cursos'
                    name='Cursos'
                    active={props.actual === 'Cursos'}
                />
                 <Menu.Item
                    as = {NavLink} exact  to ='/cursos/alumnes'
                    name='Alumnes'
                    active={props.actual === 'Alumnes'}
                />
                <Menu.Item
                    as = {NavLink} exact  to ='/cursos/nodos'
                    name='Nodos & Sedes'
                    active={props.actual === 'Nodos'}
                />
                <Menu.Item
                    as = {NavLink} exact  to ='/cursos/topicos'
                    name='Topicos'
                    active={props.actual === 'Topicos'}
                />
                <Menu.Item
                    href = "https://docs.google.com/presentation/d/15cUJH9TsReVUCIdtLBzhydi2iCMLyAfX-GMGvfx0Mu4/edit?usp=sharing"
                    target = "_blank"
                    name='Guia de Estados'
                />
        </Menu>
        </>
    )

}