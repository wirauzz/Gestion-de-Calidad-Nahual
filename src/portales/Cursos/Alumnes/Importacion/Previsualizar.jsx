import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'

export default function Previsualizar ({json}){

  const [alumnes, setAlumnes] = useState([])

  useEffect(() => {
    setAlumnes(json);
  })

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>DNI</Table.HeaderCell>
          <Table.HeaderCell>Nombre y Apellidos</Table.HeaderCell>
          <Table.HeaderCell>Correo</Table.HeaderCell>
          <Table.HeaderCell>Telefono</Table.HeaderCell>
          <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
          <Table.HeaderCell>Nacionalidad</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {alumnes.map((alumne) => (
          <Table.Row key={alumne.dni}>
            <Table.Cell>{alumne.dni}</Table.Cell>
            <Table.Cell>{alumne.nombre} {alumne.apellido}</Table.Cell>
            <Table.Cell>{alumne.correo}</Table.Cell>
            <Table.Cell>{alumne.celular}</Table.Cell>
            <Table.Cell>{alumne.fechaNacimiento}</Table.Cell>
            <Table.Cell>{alumne.nacionalidad}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
  
}