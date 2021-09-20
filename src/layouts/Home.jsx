import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Header, Icon, Segment, Image } from "semantic-ui-react";
import image from '../assets/images/home.png'

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    isAuthenticated && (
      < >
        <Container textAlign="center" style={{marginTop:20}}>
          <Header as="h1" content={"! Bienvenide " + user.name + " !"} />
          <Header.Content style={{padding:30}}>
            <Image src={image} size='big' centered />
          </Header.Content>
          <Header.Content style={{padding:10}} as="h3" content='¡ Gracias por confiar en nosotres y ser parte del Proyecto Nahual !' />
          <Button style={{ color: 'white', background: '#81CE32'}} size='large' href="https://www.nahual.com.ar/" target="_blank">
            Visitanos
          <Icon name='right arrow' />
          </Button>
        </Container>
      </>
    )
  );
}
