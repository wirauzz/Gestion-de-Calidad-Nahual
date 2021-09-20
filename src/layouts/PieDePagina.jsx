import React from "react";
import NahualLogo from "../assets/images/logo-proyecto-nahual.webp";

import { Container, Image, Segment } from "semantic-ui-react";

const PieDePagina = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "-9.5em 0em 0em", padding: "2em 0em" }}
    >
      <Container textAlign="center">
        <Image centered size="small" src={NahualLogo} />
        <a style={{color:"grey"}} href="https://www.nahual.com.ar/">www.nahual.com.ar</a>
      </Container>
    </Segment>
  );
};

export default PieDePagina;
