import React from 'react'
import styles from '../Fazenda.module.css';
import {Input, TextArea} from '../../../Form/Input/Input';
import { Col, Container, Row } from 'react-bootstrap';

function Sobre({ nome, historia, inseticidas, fertilizantes }) {
  return (
    <>
      <h1 className={styles.subTitle}>Sobre</h1>
      <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
        <Container>
          <Row>
            <Input label="Nome" type="text" name="nome" placeholder="Entre com o nome da sua fazenda" show={false} {...nome} />
          </Row>
          <Row>
            <TextArea label="História" type="text" name="historia" placeholder="Conte-nos sobre a história de sua fazenda" show={false} {...historia} />
          </Row>
          <Row>
            <Col xs={{ order: 'first' }}>
              <Input label="Inseticidas" type="text" name="inseticidas" placeholder="Entre com os inseticidas utilizados em sua fazenda" show={false} {...inseticidas} />
            </Col>
            <Col xs={{ order: 'last' }}>
              <Input label="Fertilizantes" type="text" name="fertilizantes" placeholder="Entre com os fertilizantes utilizados em sua fazenda" show={false} {...fertilizantes} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Sobre
