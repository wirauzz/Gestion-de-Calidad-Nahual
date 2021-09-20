import React, { useEffect, useState } from "react";
import { obtenerSedesPorIdNodo } from "../../../services/Nodo";
import EliminarSede from "./eliminarSede";
import EditarSede from "./editarSede";
import { Table } from 'semantic-ui-react'

export default function AccionesSedes({ nodoId, nodoNombre }) {
    const [sedes, setSedes] = useState([]);

    const obtener = () => {
        obtenerSedesPorIdNodo(nodoId).then(sedeNodo => {
            return sedeNodo.json();
        }).then(sedeNodo => {
            setSedes(sedeNodo.response);
        })
    }

    useEffect(() => {
        obtener();
    }, []);

    const listaDeSedes = <div>
        {sedes.map(sede => {
            return (
                <div>
                    <Table.Cell align="right">
                        <div className={'displayFlex centered columnGap'}>
                            <EditarSede id={sede.id} nombre={sede.nombre} nodoNombre={nodoNombre} nodoId={nodoId}/>
                            <EliminarSede id={sede.id}/>
                        </div>
                    </Table.Cell>
                </div>
            )
        })}
    </div>;
    return (
        <div>
            {sedes.length > 0 ? listaDeSedes : <h4>El nodo no tiene sedes</h4>}
        </div>
    )
}