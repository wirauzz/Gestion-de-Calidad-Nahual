import React from 'react';
import EncabezadoDeRegistrar from './EncabezadoDeRegistrar';
import EditarEgresades from './EditarEgresades';
export default function Editar(props) {
    return (
        <>
            <EncabezadoDeRegistrar/>
            <EditarEgresades {...props}/>
        </>
    )
}
