import './App.css';
import styles from "./styles/styles.module.css";
import "semantic-ui-less/semantic.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Message, Icon } from "semantic-ui-react";
import Encabezado from "./layouts/Encabezado";
import PieDePagina from "./layouts/PieDePagina"
import ProtegerRuta from './layouts/ProtegerRuta.jsx';
import Home from './layouts/Home.jsx';
import Cursos from './portales/Cursos/Cursos.jsx';
import TablaEgresades from './portales/Egresades/ListaEgresades/Tabla.jsx';
import EditarEgresade from './portales/Egresades/Egresade/EditarEgresade/Editar.jsx';
import Topicos from './portales/Cursos/Topicos/topicos.jsx'
import Estadisticas from './portales/Egresades/Estadisticas/Estadisticas.jsx';
import Certificacion from './portales/Egresades/Certificacion/GenerarCertificado.jsx';
import ListaDeAlumnesPorCurso from './portales/Cursos/Alumnes/ListaDeAlumnesPorCurso';
import ValidarInicioSesion from './layouts/ValidarInicioSesion';
import Empresas  from './portales/Empresas/ListaEgresades/ListaEgresades'
import Solicitudes from './portales/Admin/lista-solicitudes/Solicitudes';
import ListarNodos from './portales/Cursos/Nodos/listarNodos';

function App() {

  return (
    <Router>
      <div>
        <div id="mensaje-error" className={styles.notificationMessage}>
          <Message icon color="red">
            <Icon name="times circle outline" />
            <Message.Content>
              <Message.Header>
                <p id="titulo-mensaje-error"></p>
              </Message.Header>
              <p id="mensaje-error-description"></p>
            </Message.Content>
          </Message>
        </div>
        <div id="mensaje-exito" className={styles.notificationMessage}>
          <Message icon color="green">
            <Icon name="check" />
            <Message.Content>
              <Message.Header>
                <p id="titulo-mensaje-exito"></p>
              </Message.Header>
              <p id="mensaje-exito-description"></p>
            </Message.Content>
          </Message>
        </div>
        <div id="mensaje-advertencia" className={styles.notificationMessage}>
          <Message icon color="yellow">
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>
                <p id="titulo-mensaje-advertencia"></p>
              </Message.Header>
              <p id="mensaje-advertencia-description"></p>
            </Message.Content>
          </Message>
        </div>
        <Container style={{ paddingBottom: "10px", minHeight: "100vh", minWidth: "100vw", paddingLeft: "0px" }}>
          <Encabezado />
          <div className="app">
            <Switch>
              <ProtegerRuta exact path="/home" component={Home} />
              <ProtegerRuta exact path="/egresades" component={TablaEgresades} />
              <ProtegerRuta exact path="/egresades/editar/:id" component={EditarEgresade} />
              <ProtegerRuta exact path="/egresades/estadisticas" component={Estadisticas} />
              <ProtegerRuta exact path="/egresades/certificado/:id" component={Certificacion} />
              <ProtegerRuta exact path="/cursos" component={Cursos} />
              <ProtegerRuta exact path="/cursos/topicos" component={Topicos} />
              <ProtegerRuta exact path="/cursos/alumnes" component={ListaDeAlumnesPorCurso} />
              <ProtegerRuta exact path="/cursos/nodos" component={ListarNodos} />
              <ProtegerRuta exact path="/panel-administrador" component={Solicitudes} />
              <ProtegerRuta exact path="/empresas" component={Empresas} />
              <Route exact path="/" component={ValidarInicioSesion} />
            </Switch>
          </div>
        </Container>
        <PieDePagina />
      </div>
    </Router>
  );
}
export default App;
