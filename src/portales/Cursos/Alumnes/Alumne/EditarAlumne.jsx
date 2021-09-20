import React, { useState } from "react";

import { Button, Modal, Form, TextArea, Icon, Grid, Image, Header } from "semantic-ui-react";
import LogoNahual from "../../../../assets/images/logo-proyecto-nahual.webp"
import { obtenerSedes } from '../../../../services/Sede';
import { obtenerNivelesIngles } from '../../../../services/NivelIngles';
import { ObtenerEstudianteSinDTO, ActualizarEstudiante } from "../../../../services/Estudiante"
import servicioNotificacion from "../../../../services/Notificacion";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function EditarAlumne({ alumneId, actualizarAlumnes, cursoId }) {
    const [estaAbierto, setEstaAbierto] = useState(false)
    const [habilitado, setHabilitado] = useState(false)

    const [dni, setDni] = useState("");
    const [tipoDNI, setTipoDNI] = useState("");
    const [sedes, setSedes] = useState([]);
    const [sedeNodo, setSedeNodo] = useState(null);
    const [nivelesDeIngles, setNivelesDeIngles] = useState([]);

    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState(null);
    const [nivelDeIngles, setNivelDeIngles] = useState(null);
    const [nacionalidad, setNacionalidad] = useState("");
    const [correoOpcional, setCorreoOpcional] = useState("");
    const [detalle, setDetalle] = useState("");
    const [sede, setSede] = useState("");
    const [nodo, setNodo] = useState("");

    const [validacionDni, setValidacionDni] = useState(false)
    const [validacionNombres, setValidacionNombres] = useState(false)
    const [validacionApellidos, setValidacionApellidos] = useState(false)
    const [validacionCorreoElectronico, setValidacionCorreoElectronico] = useState(false)
    const [validacionTelefono, setValidacionTelefono] = useState(false)
    const [validacionFechaDeNacimiento, setValidacionFechaDeNacimiento] = useState(false)
    const [validacionNivelDeIngles, setValidacionNivelDeIngles] = useState(false)
    const [validacionNacionalidad, setValidacionNacionalidad] = useState(false)
    const [validacionCorreoOpcional, setValidacionCorreoOpcional] = useState(false)
    const [validacionDetalle, setValidacionDetalle] = useState(false)
    const [validacionNodo, setValidacionNodo] = useState(false)


    function inicializar() {
        inicializarSedes();
        inicializarNivelesIngles();
        inicializarEstudiantes(alumneId)
    }

    function inicializarEstudiantes(alumneId) {
        ObtenerEstudianteSinDTO(alumneId)
            .then(alumne => { return alumne })
            .then(alumne => {
                console.log(alumne.data.response)
                setDni(alumne.data.response.dni)
                setTipoDNI(alumne.data.response.tipoDNI)
                setNivelDeIngles(alumne.data.response.nivelInglesId)
                setNombres(alumne.data.response.nombre)
                setApellidos(alumne.data.response.apellido)
                setCorreoElectronico(alumne.data.response.correo)
                setTelefono(alumne.data.response.celular)
                setSede(alumne.data.response.sede.id)
                setNodo(alumne.data.response.nodo.id)
                setFechaDeNacimiento(new Date(alumne.data.response.fechaNacimiento))
                setNacionalidad(alumne.data.response.nacionalidad)
                setCorreoOpcional(alumne.data.response.correoOpcional)
                setDetalle(alumne.data.response.detalle)
            })
    }

    function inicializarSedes() {
        obtenerSedes()
            .then((response) => response.json())
            .then((response) => {
                setSedes(response.response);
                setSedeNodo({
                    SedeId: response.response[0].id,
                    NodoId: response.response[0].NodoId
                });
            });
    }

    function inicializarNivelesIngles() {
        obtenerNivelesIngles()
            .then((response) => response.json())
            .then((response) => {
                setNivelesDeIngles(response.response);
                setNivelDeIngles(response.response[0].id);
            });
    }




    function validarFormulario(data, tipo) {
        switch (tipo) {
            case "dni":
                setDni(data)
                if (data.length !== 0)
                    setValidacionDni(true)
                break;
            case "tipoDNI":
                setTipoDNI(data)
                break;
            case "sede-nodo":
                setValidacionNodo(true)
                break;
            case "nombres":
                setNombres(data)
                if (data.length !== 0)
                    setValidacionNombres(true)
                break;
            case "apellidos":
                setApellidos(data)
                if (data.length !== 0)
                    setValidacionApellidos(true)
                break;
            case "correoElectronico":
                setCorreoElectronico(data)
                if (data.length !== 0)
                    setValidacionCorreoElectronico(true)
                break;
            case "telefono":
                setTelefono(data)
                if (data.length !== 0)
                    setValidacionTelefono(true)
                break;
            case "fechaDeNacimiento":
                setFechaDeNacimiento(data)
                if (data.length !== 0)
                    setValidacionFechaDeNacimiento(true)
                break;
            case "nivelDeIngles":
                setValidacionNivelDeIngles(true)
                break;
            case "nacionalidad":
                setNacionalidad(data)
                if (data.length !== 0)
                    setValidacionNacionalidad(true)
                break;
            case "correoOpcional":
                setCorreoOpcional(data)
                if (data.length !== 0)
                    setValidacionCorreoOpcional(true)
                break;
            case "detalle":
                setDetalle(data)
                if (data.length !== 0)
                    setValidacionDetalle(true)
                break;

        }
        if (validacionDni &&
            validacionNodo &&
            validacionNombres &&
            validacionApellidos &&
            validacionCorreoElectronico &&
            validacionTelefono &&
            validacionFechaDeNacimiento &&
            validacionNivelDeIngles &&
            validacionNacionalidad) {

            setHabilitado(true);
        }
    }

    function EditarAlumne() {
        ActualizarEstudiante(alumneId, {
            dni: dni,
            nombre: nombres,
            apellido: apellidos,
            nacionalidad: nacionalidad,
            fechaNacimiento: fechaDeNacimiento,
            correo: correoElectronico,
            correoOpcional: correoOpcional,
            celular: telefono,
            detalle: detalle,
            tipoDNI: tipoDNI,
            trabajaActualmente: false,
            nivelInglesId: nivelDeIngles,
            estadoId:1,
            ...sedeNodo
        })
            .then((alumne) => {
                console.log(alumne)
                return alumne.data.Estudiante
            })
            .then((alumne) => {
                actualizarAlumnes(cursoId);
                mostrarNotificacion(alumne);
            })
    }

    function mostrarNotificacion(alumne) {
        servicioNotificacion.mostrarMensajeExito(
            "Alumne editado con éxito",
            `Se edito el Alumne ${alumne.nombre}`
        );
    }

    return (
        <>

            <Modal
                closeIcon
                open={estaAbierto}
                onClose={() => { 
                    setEstaAbierto(false); 
                }}
                trigger={
                    <Button
                        className='RegistrarAlumne'
                        size="small"
                        color='blue'
                        onClick={() => {
                            setEstaAbierto(!estaAbierto);
                            inicializar();
                        }}
                    >
                        Editar
                    <Icon color='white' name='edit' style={{ margin: '0 0 0 10px' }} />
                    </Button>}
            >
                <Modal.Header>
                    <Grid>
                        <Grid.Column width={4}>
                            <Image src={LogoNahual} size='small' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Grid centered>
                                <Header content='Editar Alumne' style={{ marginTop: 25 }} />
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Grid divided='vertically' stackable columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input
                                        label="DNI"
                                        fluid
                                        value={dni}
                                        type="text"
                                        class={"form-control"}
                                        onChange={(x, data) => validarFormulario(data.value, "dni")}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Tipo DNI"
                                        fluid
                                        value={tipoDNI}
                                        type="text"
                                        class={"form-control"}
                                        onChange={(x, data) => validarFormulario(data.value, "tipoDNI")}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Nombre/s"
                                        fluid
                                        value={nombres}
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => validarFormulario(data.value, "nombres")}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Apellidos"
                                        fluid
                                        value={apellidos}
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => validarFormulario(data.value, "apellidos")}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Correo Electrónico"
                                        fluid
                                        value={correoElectronico}
                                        placeholder="correo@ejemplo.com"
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => validarFormulario(data.value, "correoElectronico")}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Teléfono"
                                        fluid
                                        value={telefono}
                                        placeholder="+000 0000000000"
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => validarFormulario(data.value, "telefono")}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="field">
                                        <label>Fecha de Nacimiento</label>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid style={{ marginBottom: "5px" }}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    style={{ width: "100%" }}
                                                    InputLabelProps={{ style: { shrink: true, marginLeft: "15px", color: "black", fontSize: "17px", fontWeight: 'bold' } }}
                                                    placeholder="dd/mm/yyyy"
                                                    id="date-picker-inline"
                                                    value={fechaDeNacimiento}
                                                    onChange={date => setFechaDeNacimiento(date)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Select
                                        fluid
                                        label="Sede - Nodo"
                                        value={[sede, nodo]}

                                        options={sedes.map((s) => {
                                            return {
                                                key: `sede-${s.id}`,
                                                value: [s.nodo.id, s.id],
                                                text: s.nombre + " - " + s.nodo.nombre,
                                            };
                                        })}
                                        onChange={(e, data) => {
                                            const selected = data.value;
                                            validarFormulario(data.value, "sede-nodo")
                                            setSedeNodo({
                                                SedeId: selected[1],
                                                NodoId: selected[0],
                                            });
                                            setNodo(selected[0])
                                            setSede(selected[1])
                                        }}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Select
                                        label="Nivel de Inglés"
                                        fluid
                                        value={nivelDeIngles}
                                        placeholder="Seleccione el Nivel de Ingles"
                                        options={nivelesDeIngles.map((t) => {
                                            return {
                                                key: `Nivel-${t.id}`,
                                                value: t.id,
                                                text: t.nombre
                                            };
                                        })}
                                        onChange={(x, data) => {
                                            console.log(data.value)
                                            setNivelDeIngles(data.value);
                                            validarFormulario(data.value, "nivelDeIngles")
                                        }}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Nacionalidad"
                                        fluid
                                        value={nacionalidad}
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => {
                                            setValidacionNacionalidad(true);
                                            validarFormulario(data.value, "nacionalidad")
                                        }}
                                        required={true}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Correo Opcional"
                                        fluid
                                        value={correoOpcional}
                                        type="text"
                                        class="form-control"
                                        onChange={(x, data) => validarFormulario(data.value, "correoOpcional")}
                                    />
                                </Grid.Column>
                                <Grid.Column>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Input
                            label="Detalle"
                            fluid
                            value={detalle}
                            type="text"
                            class="form-control"
                            control={TextArea}
                            onChange={(x, data) => validarFormulario(data.value, "detalle")}
                        />
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        className="cancelButton"
                        size="small"
                        onClick={() => {
                            setEstaAbierto(!estaAbierto);

                        }}
                    >
                        Cancelar <Icon name="remove" style={{ margin: '0 0 0 10px' }} />
                    </Button>
                    <Button
                        type="submit"
                        className="confirmButton"
                        color="green"
                        size="small"
                        onClick={() => {
                            EditarAlumne();
                            setEstaAbierto(!estaAbierto);
                        }}
                    >
                        Guardar Cambios <Icon name="checkmark" style={{ margin: '0 0 0 10px' }} />
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );


}
