import React from "react";
import InformacionPersonal from "./InformacionPersonal";
import LogoNahual from "../../../../assets/images/logo-proyecto-nahual.webp";
import { Button, Modal, Image, Grid} from "semantic-ui-react";

const CuerpoModal = ({ alumne, cerrarModal }) => {
  return (
    <>
      <Modal.Header>
        <Image src={LogoNahual} size="small" />
      </Modal.Header>
      
      <Modal.Content scrolling>
        <Grid centered>
          <InformacionPersonal alumne={alumne} />
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button
          className="cancelButton"
          basic
          color="red"
          onClick={cerrarModal}
        >
          Cerrar
        </Button>
      </Modal.Actions>
    </>
  );
};

export default CuerpoModal;
