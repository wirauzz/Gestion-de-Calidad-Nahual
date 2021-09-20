import React from "react";
import { Button, Modal, Dropdown } from "semantic-ui-react";
import Axios from "axios";

function ModalCambioEstado(props) {

	const [abierto, cambiarAbierto] = React.useState(false);
	const opciones = [
		{ key: "2", text: "Egresade", value: "Egresade" },
		{ key: "4", text: "Abandonade", value: "Abandonade" }
	];

	const [opcionSeleccionada, setOpcionSeleccionada] = React.useState(
		opciones[0].value
	);

	const handleChange = (e, { value }) => setOpcionSeleccionada(value);

	const prepararDatos = () => {
		let estadoACambiar;
		let estudiantes = [];
		switch (opcionSeleccionada) {
			case "Abandonade":
				estadoACambiar = 4;
				break;
			case "Egresade":
				estadoACambiar = 2;
				break;
			default:
				estadoACambiar = 1;
				break;
		}
		props.alumnes.forEach((alumne) => {
			const alumneListo = {
				id: alumne.estudiante.id,
				estadoId: alumne.estudiante.estadoId
			};
			estudiantes.push(alumneListo);
		});
		console.log(estudiantes);
		const datos = {
			estudiantes: estudiantes,
      		estado: estadoACambiar,
		};
		return datos;
  	};

	const filtrarLista=(alumnesPorBorrar)=>{
		alumnesPorBorrar.forEach(alumne => {
		props.filtrarAlumneDeLaLista(alumne.id);
		});
		
	};

	const cambiarEstado = () => {
		const API_URL = process.env.REACT_APP_SERVICIO_DE_DATOS_API;
		Axios.post(
			`${API_URL}/estudiantes/cambiarEstadoAlumnes/`,
			prepararDatos()
		).then((repuesta) => {
			cambiarAbierto(false);
      props.cambiarEstadoSeleccionable(true);
      filtrarLista(prepararDatos().estudiantes);
		});
	};

	return (
		<Modal
			size="tiny"
			onClose={() => cambiarAbierto(false)}
			onOpen={() => cambiarAbierto(true)}
			open={abierto}
			trigger={<Button disabled={props.alumnes.length===0?true:false}>Cambiar Estado</Button>}
		>
			<Modal.Header>Cambio de Estado</Modal.Header>
			<Modal.Content style={{ textAlign: "center" }}>
				<Modal.Description>
					<Dropdown
						onChange={handleChange}
						options={opciones}
						placeholder="Elija una opción"
						selection
						value={opcionSeleccionada}
					/>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button className="cancelButton" onClick={() => cambiarAbierto(false)}>Cancelar</Button>
				<Button
					className="confirmButton"
					content="Confirmar Cambio"
					labelPosition="right"
					icon="checkmark"
					positive
					onClick={() => cambiarEstado()}
				/>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalCambioEstado;
