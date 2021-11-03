import React from 'react'
import styles from '../Cafe.module.css';
import { Container, Row } from 'react-bootstrap';
import {Input} from '../../../Form/Input/Input';

function Especial({aroma, sabor, finalizacao, acidez, corpo, docura}) {
  return (
    <Container className={styles.especial}>
      <Row>
        <Input label="Aroma" type="text" name="aroma" placeholder="Aroma do seu café" show={false} {...aroma} />
      </Row>
      
      <Row>
        <Input label="Sabor" type="text" name="sabor" placeholder="Sabor do seu café" show={false} {...sabor} />
      </Row>
      
      <Row>
        <Input label="Finalização" type="text" name="finalizacao" placeholder="Finalização do seu café" show={false} {...finalizacao} />
      </Row>
      
      <Row>
        <Input label="Acidez" type="text" name="acidez" placeholder="Acidez do seu café" show={false} {...acidez} />
      </Row>
      
      <Row>
        <Input label="Corpo" type="text" name="corpo" placeholder="Corpo do seu café" show={false} {...corpo} />
      </Row>
      
      <Row>
        <Input label="Doçura" type="text" name="docura" placeholder="Doçura do seu café" show={false} {...docura} />
      </Row>
      
    </Container>
  )
}

export default Especial
