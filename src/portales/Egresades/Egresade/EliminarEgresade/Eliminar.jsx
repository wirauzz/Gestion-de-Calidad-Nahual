import React from "react";
import { Button, Confirm } from "semantic-ui-react";
import {EliminarEstudiante} from '../../../../services/Estudiante.js';
function Eliminar({ egresadeId, eliminarVista }) {
    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);

    const eliminarEgresadeDeAPI = (egresadeId) => {
        EliminarEstudiante(egresadeId)
            .then(response => {
                eliminarVista();
            });
        onClose();
    }

    return (
        <>
            <Button color='red' onClick={onOpen}>
                <label className="icon-delete">Eliminar</label>
                <i className="user delete icon" style={{ margin: '0 0 0 5px' }}></i>
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                cancelButton='Cancelar'
                confirmButton="Confirmar"
                onCancel={onClose}
                onConfirm={() => eliminarEgresadeDeAPI(egresadeId)}
            />
        </>
    );
}

export default Eliminar;