import React, { useEffect, useState } from "react";
import { obtenerSedesPorIdNodo } from "../../../services/Nodo";
import { Label, Table } from 'semantic-ui-react'

export default function ListaSedes({ nodoId, nodoNombre }) {
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
                    <Table.Cell >
                            <Label style={{ padding: '10px' }}>• {sede.nombre}</Label>
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