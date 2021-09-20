import React from "react";
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { eliminarSede } from "../../../services/Nodo";

function EliminarSede({ id }) {
    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);

    const eliminar = (id) => {
        eliminarSede(id);
        setTimeout(() => {
            window.location.replace("/nodos");
        }, 1000);
    }
    
    return (
        <>
            <Button negative color="red" onClick={onOpen} style={{ padding: '10px' }}>
                Eliminar
                <Icon style={{ margin: '0 0 0 10px' }} name='trash alternate outline' />
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={onClose}
                onConfirm={() => eliminar(id)}
            />
        </>
    );
}

export default EliminarSede;