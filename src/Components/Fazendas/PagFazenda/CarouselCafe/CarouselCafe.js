import React from 'react'
import styles  from '../PagFazenda.module.css';
import { Col, Row } from 'react-bootstrap';

function CarouselCafe(fazenda, coffeeSel, cafeIndex) {
  return (
    <div style={{minWidth: '80%'}}>
      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Espécie:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].species}</p></Col>
      </Row>

      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Variedade:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].variety}</p></Col>
      </Row>

      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Altitude:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].altitude}</p></Col>
      </Row>

      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Processo:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].process}</p></Col>
      </Row>

      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Safra:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].harvest}</p></Col>
      </Row>

      <Row className={styles.dadoCafe}>
        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Valor da safra:</b></p></Col>
        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].harvestValue}</p></Col>
      </Row>

      {coffeeSel.special && <>
        <Row className={styles.dadoCafe}>
          <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Acidez:</b></p></Col>
          <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.acidity}</p></Col>
        </Row>

        <Row className={styles.dadoCafe}>
          <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Aroma:</b></p></Col>
          <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.aroma}</p></Col>
        </Row>

        <Row className={styles.dadoCafe}>
          <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Corpo:</b></p></Col>
          <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.body}</p></Col>
        </Row>

        <Row className={styles.dadoCafe}>
          <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Finalização:</b></p></Col>
          <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.completion}</p></Col>
        </Row>

        <Row className={styles.dadoCafe}>
          <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Sabor:</b></p></Col>
          <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.flavor}</p></Col>
        </Row>
      </>}
    </div>
  )
}

export default CarouselCafe
