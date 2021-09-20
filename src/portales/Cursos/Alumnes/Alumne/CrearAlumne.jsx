import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, TextArea, Icon, Grid, Image, Header } from "semantic-ui-react";
import LogoNahual from "../../../../assets/images/logo-proyecto-nahual.webp"
import { obtenerSedes } from '../../../../services/Sede';
import { obtenerNivelesIngles } from '../../../../services/NivelIngles';
import { CrearEstudiante } from '../../../../services/Estudiante';
import servicioNotificacion from "../../../../services/Notificacion";
import { crearInscripto, obtenerInscriptosDeCurso } from '../../../../services/Inscripto';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function CrearAlumne({ idCurso, actualizarAlumnes}) {
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

    const [validacionDni, setValidacionDni] = useState(false)
    const [validacionNombres, setValidacionNombres] = useState(false)
    const [validacionApellidos, setValidacionApellidos] = useState(false)
    const [validacionCorreoElectronico, setValidacionCorreoElectronico] = useState(false)
    const [validacionTelefono, setValidacionTelefono] = useState(false)
    const [validacionNivelDeIngles, setValidacionNivelDeIngles] = useState(false)
    const [validacionNacionalidad, setValidacionNacionalidad] = useState(false)
    const [validacionCorreoOpcional, setValidacionCorreoOpcional] = useState(false)
    const [validacionDetalle, setValidacionDetalle] = useState(false)
    const [validacionNodo, setValidacionNodo] = useState(false)

    function resetValores() {
        setHabilitado(false);
        setDni("");
        setNombres("");
        setApellidos("");
        setCorreoElectronico("");
        setTelefono("");
        setFechaDeNacimiento(null);
        setNivelDeIngles("");
        setNacionalidad("");
        setCorreoOpcional("");
        setDetalle("");

        setValidacionDni(false);
        setValidacionNombres(false);
        setValidacionApellidos(false);
        setValidacionCorreoElectronico(false);
        setValidacionTelefono(false);
        setValidacionNivelDeIngles(false);
        setValidacionNacionalidad(false);
        setValidacionCorreoOpcional(false);
        setValidacionDetalle(false);

        inicializarSedes();
        inicializarNivelesIngles();
        setValidacionNodo(false);
        setEstaAbierto(false);
    }

    useEffect(() => {
        inicializarSedes();
        inicializarNivelesIngles();
    }, []);

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

    function mostrarNotificacion(alumne) {
        servicioNotificacion.mostrarMensajeExito(
            "Alumne creado con exito",
            `Se creó el alumne ${alumne.nombre} ${alumne.apellido}`
        );
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
            validacionNivelDeIngles &&
            validacionNacionalidad) {

            setHabilitado(true);
        }
    }

    function crearAlumne() {
        CrearEstudiante({
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
            estadoId: 1,
            ...sedeNodo
        })
            .then((x) => {
                return x.data;
            })
            .then((x) => {
                return x.result;
            })
            .then((x) => {
                crearInscripto({
                    estudianteId: x.id,
                    cursoId: idCurso,
                })
                .then(() => {
                    actualizarAlumnes(idCurso)
                })
                
                return x;
            })
            .then((x) => {
                mostrarNotificacion(x);
            });
    }

    return (

        <Modal
            closeIcon
            open={estaAbierto}
            size='small'
            onClose={() => { 
                setEstaAbierto(false); 
                resetValores(); 
            }}
            trigger={
                <Button 
                className='RegistrarAlumne' 
                color='green' 
                onClick={() => setEstaAbierto(!estaAbierto)}>
                    Inscribir Nuevo Alumne
                <Icon color='white' name='add user' style={{ margin: '0 0 0 10px' }} />
                </Button>
            }>
            <Modal.Header>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={LogoNahual} size='small' />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid centered>
                            <Header content='Nuevo Alumne' style={{ marginTop: 25 }} />
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Modal.Header>
            <Modal.Content>

                <Form>
                    <Form.Input
                        label="DNI"
                        fluid
                        type="text"
                        class={"form-control"}
                        onChange={(x, data) => validarFormulario(data.value, "dni")}
                        required={true}
                    />
                    <Form.Input
                        label="Tipo DNI"
                        fluid
                        type="text"
                        class={"form-control"}
                        onChange={(x, data) => validarFormulario(data.value, "tipoDNI")}
                    />
                    <Form.Input
                        label="Nombre/s"
                        fluid
                        type="text"
                        class="form-control"
                        onChange={(x, data) => validarFormulario(data.value, "nombres")}
                        required={true}
                    />
                    <Form.Input
                        label="Apellidos"
                        fluid
                        type="text"
                        class="form-control"
                        onChange={(x, data) => validarFormulario(data.value, "apellidos")}
                        required={true}
                    />
                    <Form.Input
                        label="Correo Electrónico"
                        fluid
                        placeholder="correo@ejemplo.com"
                        type="text"
                        class="form-control"
                        onChange={(x, data) => validarFormulario(data.value, "correoElectronico")}
                        required={true}
                    />
                    <Form.Input
                        label="Teléfono"
                        fluid
                        placeholder="+000 0000000000"
                        type="text"
                        class="form-control"
                        onChange={(x, data) => validarFormulario(data.value, "telefono")}
                        required={true}
                    />
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
                    <Form.Select
                        fluid
                        label="Sede - Nodo"
                        placeholder="Seleccione Sede - Nodo"
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
                            setValidacionNodo(true)
                        }}
                        required={true}
                    />
                    <Form.Select
                        label="Nivel de Inglés"
                        fluid
                        placeholder="Seleccione el Nivel de Ingles"
                        options={nivelesDeIngles.map((t) => {
                            return {
                                key: `Nivel-${t.id}`,
                                value: t.id,
                                text: t.nombre
                            };
                        })}
                        onChange={(x, data) => {
                            setNivelDeIngles(data.value);
                            validarFormulario(data.value, "nivelDeIngles")
                        }}
                        required={true}
                    />
                    <Form.Input
                        label="Nacionalidad"
                        fluid
                        type="text"
                        class="form-control"
                        onChange={(x, data) => {
                            setValidacionNacionalidad(true);
                            validarFormulario(data.value, "nacionalidad")
                        }}
                        required={true}
                    />
                    <Form.Input
                        label="Correo Opcional"
                        fluid
                        type="text"
                        class="form-control"
                        onChange={(x, data) => validarFormulario(data.value, "correoOpcional")}
                    />
                    <Form.Input
                        label="Detalle"
                        fluid
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
                    onClick={() => {
                        setEstaAbierto(!estaAbierto);
                        resetValores();
                    }}
                >
                    Cancelar <Icon name="remove" style={{ margin: '0 0 0 10px' }} />
                </Button>
                <Button
                    className="confirmButton"
                    color="green"
                    disabled={!habilitado}
                    onClick={() => {
                        crearAlumne();
                        resetValores();
                    }}
                >
                    Inscribir <Icon name="checkmark" style={{ margin: '0 0 0 10px' }} />
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
