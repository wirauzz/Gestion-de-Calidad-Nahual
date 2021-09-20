import React from "react";
import { Icon, Item, Header } from "semantic-ui-react";
import moment from 'moment';
import 'moment/locale/es';
import avatarGenerico from '../../../assets/images/avatar-generico.png'

function convertirAMayusculas(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

function InformacionPersonal({ egresade }) {
  moment.locale('es');
  const fecha_convertida = moment(egresade.fechaNacimiento).format('DD/MM/yyyy');
  return (
    <Item.Group>
      <Item>
        <Item.Image style={{ width: "200px", marginRight : "30px" }}
          size='medium'
          src={avatarGenerico}
        />
        <Item.Content verticalAlign='middle'>
            <div style={{ textAlign: "left" }}>
              <Header as='h1'> {convertirAMayusculas(egresade.nombre + " " + egresade.apellido)} </Header><br />
              <Item.Description>
                <p> <Icon name='mail outline' /> <b>Correo: </b>{egresade.correo}</p>
                <p> <Icon name='call' /> <b>Teléfono: </b>{egresade.celular}</p>
                <p> <Icon name='calendar outline' /><b>Fecha de nacimiento: </b>{fecha_convertida}</p>
                <p> <Icon name='level up alternate' /><b>Nivel de inglés: </b>{egresade.nivelIngles}</p>
                <p> <Icon name='map marker alternate'/><b>Sede: </b> {egresade.sede}</p>
                <p> <Icon name='map outline' /><b>Nodo: </b>{egresade.nodo}</p>
              </Item.Description>
            </div>
          <Item.Extra> * Utilizar estos datos solo para fines laborales.</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionPersonal;
