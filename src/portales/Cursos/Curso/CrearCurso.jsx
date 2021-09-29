import React, { useEffect, useState } from "react";
import { Button, Modal, Form, TextArea, Icon, Grid, Image, Header } from "semantic-ui-react";
import { obtenerSedes } from "../../../services/Sede";
import { crearCurso, obtenerCursoPorId } from "../../../services/Curso";
import { obtenerModulos } from "../../../services/Modulo";
import LogoNahual from '../../../assets/images/logo-proyecto-nahual.webp'
import servicioNotificacion from "../../../layouts/Notificaciones";

export default function CrearCurso({ estaAbierto, setAbierto, cursos, setCursos }) {
  const [topicos, setTopicos] = useState([]);
  const [sedes, setSedes] = useState([]);

  const [topico, setTopico] = useState(null);
  const [anio, setAnio] = useState(2021);
  const [estado, setEstado] = useState(true);
  const [esEgresade, setEsEgresade] = useState(true);
  const [periodo, setPeriodo] = useState("")
  const [horario, setHorario] = useState("");
  const [sedeNodo, setSedeNodo] = useState(null);
  const [nota, setNota] = useState("");
  const [profesor, setProfesor] = useState("");

  const [validacionTopico, setValidacionTopico] = useState(false)
  const [validacionPeriodo, setValidacionPeriodo] = useState(false)
  const [validacionProfesor, setValidacionProfesor] = useState(false)
  const [validacionNota, setValidacionNota] = useState(false)
  const [validacionNodo, setValidacionNodo] = useState(false)
  const [validacionHorario, setValidacionHorario] = useState(false)

  const [habilitado, setHabilitado] = useState(false)

  function inicializarSedes() {
    obtenerSedes()
      .then((response) => response.json())
      .then((response) => {
        setSedes(response.response);
        setSedeNodo({
          SedeId: response.response[0].id,
          NodoId: response.response[0].NodoId,
        });
      });
  }

  function inicializarTopicos() {
    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setTopicos(response.response);
        setTopico(response.response[0].id);
      });
  }

  function resetValores() {
    inicializarSedes();
    inicializarTopicos();
    setHorario("");
    setNota("");
    setProfesor("");
    setAnio(2021);
    setPeriodo("");
    setEstado(true);
    setAbierto(!estaAbierto);
    setHabilitado(false);
    setValidacionNota(false);
    setValidacionNodo(false);
    setValidacionHorario(false);
    setValidacionProfesor(false);
  }

  useEffect(() => {
    inicializarSedes();
    inicializarTopicos();
  }, []);

  function mostrarNotificacion(curso) {
    servicioNotificacion.mostrarMensajeExito(
      "Curso creado con éxito",
      `Se creó el curso ${curso.horario}`
    );
  }

  function validarFormulario(data, tipo) {
    switch (tipo) {
      case "anio":
        setAnio(data)
        break;
      case "periodo":
        setPeriodo(data)
        if (data.length !== 0)
          setValidacionPeriodo(true)
        break;
      case "topico":
        setValidacionTopico(true)
        break;
      case "sede-nodo":
        setValidacionNodo(true)
        break;
      case "profesor":
        setProfesor(data)
        if (data.length !== 0)
          setValidacionProfesor(true)
        break;
      case "nota":
        setNota(data)
        if (data.length !== 0)
          setValidacionNota(true)
        break;
      case "horario":
        setHorario(data)
        if (data.length !== 0)
          setValidacionHorario(true)
        break;
      default:
        break;
    }
    if (validacionProfesor && validacionHorario && validacionNota && validacionNodo && validacionPeriodo && validacionTopico) {
      setHabilitado(true);
    }
  }

  function crear() {
    crearCurso({
      anio: anio,
      periodo: periodo,
      estado: estado,
      TopicoId: topico,
      ...sedeNodo,
      horario: horario,
      profesores: profesor,
      notas: nota,
      esEgresade: esEgresade
    })
      .then((x) => {
        return x.data;
      })
      .then((x) => {
        return x.result;
      })
      .then((x) => {
        return obtenerCursoPorId(x.id);
      })
      .then((x) => {
        return x.data.respuesta;
      })
      .then((x) => {
        setCursos([...cursos, x]);
        mostrarNotificacion(x);
      });

  }

  return (
    <Modal closeIcon open={estaAbierto} size='small' onClose={() => { setAbierto(!estaAbierto); resetValores(); }}>
      <Modal.Header>
        <Grid>
          <Grid.Column width={4}>
            <Image src={LogoNahual} size='small' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid centered>
              <Header content='Nuevo Curso' style={{ marginTop: 25 }} />
            </Grid>
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Año"
            fluid
            value={anio}
            type="number"
            className={"form-control"}
            onChange={(x, data) => validarFormulario(data.value, "anio")}
            required={true}
          />
          <Form.Input
            label="Periodo"
            fluid
            placeholder="Ingrese Periodo (1 o 2)"
            type="text"
            value={periodo}
            className={"form-control"}
            onChange={(x, data) => validarFormulario(data.value, "periodo")}
            required={true}
          />
          <Form.Select
            label="Estado"
            fluid
            value={estado}
            placeholder="Seleccione Estado"
            options={[
              { key: "activo", value: true, text: "Activo" },
              { key: "inactivo", value: false, text: "Inactivo" },
            ]}
            onChange={(x, data) => {
              setEstado(data.value === true);
            }}
            required={true}
          />
          <Form.Select
            label="Curso Para:"
            fluid
            value={esEgresade}
            placeholder="Seleccione Estado"
            options={[
              { key: "egresades", value: true, text: "Egresades" },
              { key: "alumnes", value: false, text: "Alumnes" },
            ]}
            onChange={(x, data) => {
              setEsEgresade(data.value === true);
            }}
            required={true}
          />
          <Form.Select
            label="Topico"
            fluid
            placeholder="Seleccione Topico"
            options={topicos.map((t) => {
              return {
                key: `topico-${t.id}`,
                value: t.id,
                text: t.nombre,
              };
            })}
            onChange={(e, data) => {
              setTopico(data.value);
              validarFormulario(data.value, "topico");
            }}
            required={true}
          />
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
            }}
            required={true}
          />
          <Form.Input
            label="Horario"
            fluid
            type="text"
            placeholder="Turno (00:00 - 00:00)"
            className={"form-control"}
            onChange={(x, data) => validarFormulario(data.value, "horario")}
            required={true}
          />
          <Form.Input
            label="Profesor"
            fluid
            type="text"
            class="form-control"
            onChange={(x, data) => validarFormulario(data.value, "profesor")}
            required={true}
          />
          <Form.Input
            label="Notas"
            fluid
            type="text"
            class="form-control"
            control={TextArea}
            onChange={(x, data) => validarFormulario(data.value, "nota")}
            required={true}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          className="cancelButton"
          size="small"
          onClick={() => {
            resetValores();
            setAbierto(!estaAbierto);
          }}
        >
          Cancelar <Icon name="remove" style={{ margin: '0 0 0 10px' }} />
        </Button>
        <Button
          className="confirmButton"
          color="green"
          size="small"
          disabled={!habilitado}
          onClick={() => {
            crear();
            resetValores();
          }}
        >
          Confirmar <Icon name="checkmark" style={{ margin: '0 0 0 10px' }} />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
