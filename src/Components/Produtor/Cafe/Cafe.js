import React from 'react';
import './Cafe.module.css';
import { UserContext } from '../../../Context/UserContext';
import { ButtonSalvar, ButtonAcc } from '../../Button/Button';
import {Input} from '../../Form/Input/Input';
import { Modal, Col, Container, Row, Form } from 'react-bootstrap';
import Card from './Card/Card';
import { SelectCafe } from '../../Select/Select';
import useForm from '../../../Hooks/useForm';

function Cafe() {

  const [variedade, setVariedade] = React.useState("");
  const variedades = ['Arábica ', 'Robusta (Conilon)'];
  const [especie, setEspecie] = React.useState("");
  const arrRobusta = ["Conilon"];
  const arrArabica = ["Mundo Novo", "Bourbon", "Laurina", "Catuaí", "Acaiá", "Topázio", "Icatu", "Caturra"];
  const altitude = useForm();
  const processo = useForm();
  const safra = useForm();
  const valor = useForm();

  const { data } = React.useContext(UserContext);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className={`bgGray center`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className="title">Café</h1>
        </div>
        <div className="container-scroll list-grid" style={{ margin: ' 0px auto'}}>
          <Card especie="Arábica" variedade="Catuaí vermelho" />
        </div>

        <Modal show={show} onHide={handleClose} animation={false} centered>
          <Modal.Header>
            <Modal.Title style={{fontWeight: 'bold'}}>Adicionar Café</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
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
                  <Input label="Altitude" type="text" name="altitude" placeholder="Altitude em metros" show={false} {...altitude} />
                </Col>
                <Col>
                  <Input label="Processo" type="text" name="processo" placeholder="Processo de secagem" show={false} {...processo} />
                </Col>
              </Row>
  
              <Row>
                <Col>
                  <Input label="Safra" type="text" name="safra" placeholder="Ano da safra" show={false} {...safra} />
                </Col>
                <Col>
                  <Input label="Valor da Safra" type="text" name="valor" placeholder="Valor da safra" show={false} {...valor} />
                </Col>
              </Row>

              <Row>
                <Col><Form.Check type="checkbox" label="Especial" /></Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <ButtonAcc style={{width: '80px', height: '35px', fontWeight: 'normal', padding: '0'}}>Salvar</ButtonAcc>
          </Modal.Footer>
        </Modal>

        <ButtonSalvar style={{width: '130px', marginTop: '35px'}}  onClick={handleShow}> Adicionar café</ButtonSalvar>
      </div>
    </div>
  )
}

export default Cafe
