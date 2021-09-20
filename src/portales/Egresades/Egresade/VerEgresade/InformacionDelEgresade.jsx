import React from "react";
import { Form, Input, Icon, Item } from "semantic-ui-react";
import '../../../../styles/EgresadesStyles/Modal.css';



function InformacionDelEgresade({ egresade }) {
  var hoy = new Date(egresade.fechaNacimiento);
  var mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>

          <Item.Description>
            <Form id="form-data">

              <Form.Field inline>
                <label><Icon name='mail outline' /><span className="title-data">Correo:</span></label>
                <Input> {egresade.correo} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='call' /><span className="title-data">Telefono:</span></label>
                <Input > {egresade.celular} </Input>
              </Form.Field>
              <Form.Field inline>
                <label><Icon name='id card' /><span className="title-data">DNI:</span></label>
                <Input > {egresade.dni} </Input>
              </Form.Field>
              {egresade.tipoDNI ?
                <>
                  <Form.Field inline>
                    <label><Icon name='id card outline' /><span className="title-data"> Tipo DNI:</span></label>
                    <Input> {egresade.tipoDNI} </Input>
                  </Form.Field>
                </>
                : null}

              <Form.Field inline>
                <label><Icon name='calendar outline' /><span className="title-data">Fecha de nacimiento:</span></label>
                <Input> {egresade.fechaNacimiento != null ? mañana.toLocaleDateString('es') : "Sin Fecha"} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='level up alternate' /><span className="title-data">Nivel de ingles:</span></label>
                <Input> {egresade.nivelIngles} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='map outline' /><span className="title-data"> Nodo:</span></label>
                <Input> {egresade.nodo} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='map outline' /><span className="title-data"> Sede:</span></label>
                <Input> {egresade.sede} </Input>
              </Form.Field>
              <Form.Field inline>
                <label><Icon name='map outline' /><span className="title-data"> Nacionalidad:</span></label>
                <Input> {egresade.nacionalidad} </Input>
              </Form.Field>
              {egresade.correoOpcional ?
                <>
                  <Form.Field inline>
                    <label><Icon name='mail outline' /><span className="title-data"> Correo opcional:</span></label>
                    <Input> {egresade.correoOpcional} </Input>
                  </Form.Field>
                </>
                : null}


            </Form>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionDelEgresade;
