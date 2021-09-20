import React, {Component} from 'react';

import { Bar  } from 'react-chartjs-2';

import {ObtenerEgresades, ObtenerEstudiantes} from '../../../../services/Estudiante.js';

class BarrasChart extends Component {
  constructor() {
    super();
    this.state ={
      egresades : [],
      cantidadEgresades :'',
      cantidadEmpleades:'',
      estudiantes : [],
      cantidadEstudiantes : '',
      /* cantidadPreInscripte : '', */
      cantidadAbandonades:'',
      total:'',
      chartData: Bar,
      isLoaded:false
    }
    this.obtenerEgresades()
    this.obtenerEstudiantes()
  }

  obtenerEgresades() {
    ObtenerEgresades()
      .then(
        (result) => {
          this.state.cantidadEgresades = result.data.response
          .filter(item => item.Estado === 'Egresade' || item.Estado === 'Egresade/Alumne').length
          this.state.cantidadEmpleades = result.data.response
              .filter(item => item.Estado === 'Empleade').length
          this.setState({
              egresades: result.data.response,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  obtenerEstudiantes() {

    ObtenerEstudiantes()
      .then(
        (result) => {
          console.log(result.data);
          this.state.total = result.data.response.length

          this.state.cantidadEstudiantes = result.data.response
              .filter(item => item.Estado ==='Alumne').length
          this.state.cantidadAbandonades = result.data.response
              .filter(item => item.Estado ==='Abandonade').length
          this.setState({
              estudiantes: result.data.response,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

 
  
  render  () {
    const data = {
      labels: ['Alumnes', 'Egresades', 'Empleades', 'Abandonades'],
      datasets: [
        {
          label: "Total: " + this.state.total,
          data: [
            this.state.cantidadEstudiantes, 
            this.state.cantidadEgresades, 
            this.state.cantidadEmpleades, 
            this.state.cantidadAbandonades, 

          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
         
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
  }

  return (
      <div>
        <Bar
          data={ data }
          height={500}
          width={800}
          options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
            },],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
          }}
        />
      </div>
    )
  }
}
export default BarrasChart