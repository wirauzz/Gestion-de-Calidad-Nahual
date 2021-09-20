import React, { Component } from 'react'
import {Modal, Image } from 'semantic-ui-react'
import LogoNahual from '../../../../src/assets/images/logo-proyecto-nahual.webp'
import FormAcceso from "./FormAcceso"

const CuerpoModal = ({cerrarModal}) => {
  return (
    <>
      <Modal.Header >
        <Image src={LogoNahual} size='small' />
      </Modal.Header>
      <Modal.Content scrolling>
        <FormAcceso cerrarModal={cerrarModal}></FormAcceso>
      </Modal.Content>
    </>
  )
}

export default CuerpoModal; 
