import axios from "axios";
import React, { useState } from "react";
import { Confirm, Icon, Label } from "semantic-ui-react";

export const PermisoEtiqueta = ({ permiso, solicitud, quitarPermiso, asignarError }) => {
  const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL = process.env.REACT_APP_AUTENTICACION_NAHUAL_API;
  const [confirmacionAbierta, cambiarConfirmacionAbierta] = useState(false);
  const confirmar = () => {
    const contenido = {
      nombre: solicitud.nombre,
      email: solicitud.email,
      aplicacion: permiso.aplicacion
    };
    axios
      .post(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}/revocarAcceso`, contenido)
      .then((respuesta) =>{
        cuandoSeRevoqueAcceso(permiso.aplicacion,respuesta.data.data)})
      .catch((error) => {
        asignarError(error.message)
      });
    cambiarConfirmacionAbierta(false);
  };

  const cuandoSeRevoqueAcceso = (aplicacion, solicitud) => {
    switch (aplicacion) {
      case "Egresades":
        solicitud.permisoEgresades = false;
        break;
      case "Empresas":
        solicitud.permisoEmpresas = false;
        break;
      case "Admin":
        solicitud.permisoAdmin = false;
        break;
      case "Cursos-Periodos":
        solicitud.permisoCursosPeriodos = false;
        break;
      default:
        break;
    }
    quitarPermiso(solicitud);
  };

  const cancelar = () => cambiarConfirmacionAbierta(false);
  return (
    <Label style={{ padding: "10px" }} basic color={permiso.color} >
      {permiso.aplicacion}
      <Icon name="delete" onClick={() => cambiarConfirmacionAbierta(true)} />
      <Confirm
        header="Revocar Permiso"
        content={`¿Está seguro que desea quitar el permiso a la aplicación "${permiso.aplicacion}" a "${solicitud.nombre}" con el correo "${solicitud.email}"?`}
        open={confirmacionAbierta}
        onCancel={cancelar}
        onConfirm={confirmar}
        cancelButton="Cancelar"
        confirmButton="Quitar acceso"
        size="tiny"
      />
    </Label>
  );
};