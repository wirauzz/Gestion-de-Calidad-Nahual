import React from "react";
import { Icon, Item, Header } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import avatarGenerico from "../../../../assets/images/avatar-generico.png";

function convertirAMayusculas(palabras) {
  return palabras.replace(/\b\w/g, (l) => l.toUpperCase());
}

function InformacionPersonal({ alumne }) {

  React.useEffect(() => {
    console.log(alumne)
  }, []);

  moment.locale("es");
  const fecha_convertida = moment (alumne.fechaNacimiento).format("DD/MM/YYYY");

  return (
    <Item.Group>
      <Header as="h1">
        {convertirAMayusculas(alumne.nombre + " " + alumne.apellido)}
      </Header>

      <Item style={{ margin: '0 0 0 0' }}>
        <Item.Image
          style={{ width: "250px", marginRight: "30px", marginTop:"10px" }}
          size="medium"
          src={avatarGenerico}
        />
        <Item.Content verticalAlign="middle">
          <div style={{ textAlign: "left" }}>

            <Item.Description>
              <p>
                <Icon name="id card outline" /> <b>DNI: </b>
                {alumne.dni}
              </p>
              {alumne.tipoDNI && alumne.tipoDNI !== "Sin Tipo" ?
                <p>
                  <Icon name="id card outline" /> <b>Tipo DNI: </b>
                  {alumne.tipoDNI}
                </p>
                : null
              }
              <p>
                <Icon name="mail outline" /> <b>Correo: </b>
                {alumne.correo}
              </p>
              <p>
                <Icon name="call" /> <b>Teléfono: </b>
                {alumne.celular}
              </p>
              <p>
                <Icon name="calendar outline" />
                <b>Fecha de nacimiento: </b>
                {fecha_convertida}
              </p>
              <p>
                <Icon name="level up alternate" />
                <b>Nivel de inglés: </b>
                {alumne.nivelIngles}
              </p>
              <p>
                <Icon name="world" /> <b>Nacionalidad: </b>
                {alumne.nacionalidad}
              </p>
              <p>
                <Icon name="map marker alternate" />
                <b>Sede: </b> {alumne.sede}
              </p>
              <p>
                <Icon name="map outline" />
                <b>Nodo: </b>
                {alumne.nodo}
              </p>

              {alumne.correoOpcional && alumne.correoOpcional !== "Sin Correo" ?
                <p>
                  <Icon name="mail outline" /> <b>Correo Opcional: </b>
                  {alumne.correoOpcional}
                </p>
                : null
              }

              {alumne.detalle && alumne.detalle !== "Sin Detalle" ?
                <p>
                  <Icon name="newspaper outline" /> <b>Detalle: </b>
                  {alumne.detalle}
                </p>
                : null
              }

            </Item.Description>
          </div>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionPersonal;
