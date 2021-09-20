import React, { useEffect, useState } from "react";
import { Icon, Grid, Header, List } from "semantic-ui-react";

function InformacionDeCursos({ egresade, cursosInscripto }) {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    createListOfCourses();
  }, [])

  const createListOfCourses = async () => {
    let sortInscripto;
    let courses;
    sortInscripto = cursosInscripto.sort(function (a, b) {
      if (a.curso.anio < b.curso.anio) {
        return 1
      }
      if (a.curso.anio > b.curso.anio) {
        return -1
      }
      return 0;
    })
    courses = sortInscripto.map((inscripto, index) => {
      const { curso } = inscripto;
      return {
        id: index + 1,
        anio: curso.anio,
        topico: curso.topico.nombre,
        periodo: curso.periodo,
        profesores: curso.profesores
      }
    });
    courses.unshift({ index: 0,
      anio: egresade.añoGraduacion, 
      periodo: egresade.periodo, 
      topico: egresade.topico,
      profesores: egresade.profesor });
    setCoursesList(courses);
  }

  const showTextNull = (text) => {
    if (text !== null) {
      return text;
    } else {
      return '  '
    }
  }

  const renderCourses = () => {
    return coursesList.map((course, index) => {
      return (
        <>
        { course.topico !== null &&
          <List.Item key={index}>{`${showTextNull(course.anio)} / ${showTextNull(course.periodo)} ${course.topico} - ${showTextNull(course.profesores)}`}</List.Item>}
          </>
      )
    })
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Cursos Realizados</Header>
        <Grid>
          <Grid.Row>
            <div style={{ marginLeft: 30 }}>
              <List>
                {renderCourses()}
              </List>
            </div>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default InformacionDeCursos;
