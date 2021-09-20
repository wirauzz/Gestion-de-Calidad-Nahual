import React from "react";
import { Icon, Grid, Header, Label } from "semantic-ui-react";
import '../../../../styles/EgresadesStyles/InformacionDelCurso.css';

function InformacionDelCurso({ egresade, cursos }) {

  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Módulo Cursado</Header>
        <Grid columns='equal'>
         

          {egresade.topico ?
            <>
             <Grid.Column />
              <Grid.Column floated="right" width={11} >
                <Icon color='green' name='check' /> <span className="card-green">{(egresade.añoGraduacion?egresade.añoGraduacion+ ' - ' :'') + (egresade.periodo?egresade.periodo+ ' / ' :'') +(egresade.topico?egresade.topico+ '  ' :'') +  (egresade.profesor?egresade.profesor:'')}</span> {/*  <span className="card-green">{egresade.añoGraduacion}</span> */}
              </Grid.Column>

              <Grid.Column floated="left" width={4}>

              </Grid.Column>
            </>
            : null}


          {cursos.map((curso) =>
            <>
              <Grid.Column />
              <Grid.Column floated="right" width={11} >
                <Icon color='green' name='check' /> <span className="card-green">{curso.curso.anio + ' / ' + curso.curso.periodo + ' ' + curso.curso.topico.nombre + ' - ' + curso.curso.profesores}</span> {/*  <span className="card-green">{egresade.añoGraduacion}</span> */}
              </Grid.Column>

              <Grid.Column floated="left" width={4}>

              </Grid.Column>
            </>
          )}
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default InformacionDelCurso;
