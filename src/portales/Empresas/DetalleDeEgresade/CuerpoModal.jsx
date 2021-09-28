import React from 'react'
import InformacionPersonal from "./InformacionPersonal";
import InformacionDeCursos from "./InformacionDeCursos";
import LogoNahual from '../../../assets/images/logo-proyecto-nahual.webp'
import { Button, Modal, Image, Icon, Grid } from 'semantic-ui-react'

const CuerpoModal = ({ egresade, cerrarModal, cursosInscripto}) => {
  
  return (
    <>
      <Modal.Header >
        <Image src={LogoNahual} size='small' />
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid divided='vertically' centered>
          <InformacionPersonal egresade={egresade} />
          <InformacionDeCursos egresade={egresade} cursosInscripto={cursosInscripto}/>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button basic className="button-perfil" color="grey" onClick={cerrarModal} >
          Cerrar
        </Button>
        {egresade.linkedin ?
          <a
            href={egresade.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color='linkedin'>
              <Icon name='linkedin' />
                LinkedIn
            </Button>
          </a>
          :
          <Button disabled color='linkedin'>
            <Icon name='linkedin' /> LinkedIn
          </Button>
        }
      </Modal.Actions>
    </>
  )
}

export default CuerpoModal;
