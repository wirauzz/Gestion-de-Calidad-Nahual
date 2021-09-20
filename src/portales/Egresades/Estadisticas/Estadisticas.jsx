import React, { Component } from 'react'
import Nahual_Egresades from '../Menu/Menu';
import Nahual_BarrasChart from './Barras/BarrasChart'
import { Segment, Grid, Icon, Header, Divider } from 'semantic-ui-react'
import '../../../styles/EgresadesStyles/Estadisticas.css'
class Nahual_Estadisticas extends Component {

  render() {
    return (
      <div>
        <Nahual_Egresades actual={'Estadisticas'}/>
        <div className='estadistica'>
          <Grid centered>
            <Header as='h2' textAlign='center' style={{marginTop: '20px', marginBottom: '20px'}}>
              <Icon name='chart bar' circular/>
              <Header.Content>Estadisticas</Header.Content>
            </Header>
          </Grid>
          <Divider/>
          <div className='container-estadistica'>
            <Segment>
              <Nahual_BarrasChart/>
            </Segment>
          </div>
        </div>
      </div>
    )
  }
}
export default Nahual_Estadisticas;
