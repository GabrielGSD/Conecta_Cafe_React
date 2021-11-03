import React from 'react'
import styles from '../Cafe.module.css';
import { Col, Container, Row, Form } from 'react-bootstrap';
import {Input} from '../../../Form/Input/Input';
import { SelectCafe } from '../../../Select/Select';

function CafeCont({variedade, setVariedade, variedades, especie, setEspecie, arrRobusta, arrArabica, altitude, processo, safra, valor, setEspecial}) {
  return (
    <Container className={styles.cafe}>
      <Row>
        <Col>
          <SelectCafe type={variedade} setType={setVariedade} options={variedades} def="Variedade" label="Variedade" name="variedade" />
        </Col>
        <Col>
          {variedade === "Robusta (Conilon)" 
            ? <SelectCafe type={especie} setType={setEspecie} options={arrRobusta} def="Especie" label="Espécie" name="especie" />
            :<SelectCafe type={especie} setType={setEspecie} options={arrArabica} def="Especie" label="Espécie" name="especie" />
          }
        </Col>
      </Row>
    
      <Row style={{ marginTop: '15px' }}>
        <Col>
          <Input label="Altitude" type="number" name="altitude" placeholder="Altitude em metros" show={false} {...altitude} />
        </Col>
        <Col>
          <Input label="Processo" type="text" name="processo" placeholder="Processo de secagem" show={false} {...processo} />
        </Col>
      </Row>
    
      <Row>
        <Col>
          <Input label="Safra" type="number" name="safra" placeholder="Ano da safra" show={false} {...safra} />
        </Col>
        <Col>
          <Input label="Valor da Safra" type="number" name="valor" placeholder="Valor da safra" show={false} {...valor} />
        </Col>
      </Row>

      <Row>
        <Col><Form.Check type="checkbox" label="Especial" onChange={(e) => setEspecial(e.target.checked)} /></Col>
      </Row>
    </Container>
  )
}

export default CafeCont