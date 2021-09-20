import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
 
export default function Menu_Egresades (props) {
    return (
        <>
        <Menu pointing secondary>
          <Menu.Item
            as = {NavLink} exact to = '/egresades'
            name='Egresades'
            active={props.actual === 'Egresades'}
          />
            <Menu.Item
            as = {NavLink} exact  to ='/egresades/estadisticas'
            name='Estadisticas'
            active={props.actual === 'Estadisticas'}
          />
      </Menu>
    </>
    )

}