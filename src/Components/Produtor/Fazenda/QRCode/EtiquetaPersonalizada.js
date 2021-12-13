import React, { useState, useEffect } from 'react'
import EtiquetaGrande from './Etiqueta/EtiquetaGrande';
import { Button, Form } from 'react-bootstrap';
import { observer } from "mobx-react"
import { Modal, Col, Row } from 'react-bootstrap';
import { ButtonAcc } from '../../../Button/Button';
import styles from './EtiquetaPersonalizada.module.css';
import EtiquetaPequena from './Etiqueta/EtiquetaPequena';
import { FARM_GET } from '../../../../Api/api';

const EtiquetaPersonalizada = observer(props => {
    const { endpoint, cafe } = props
    const [fazenda, setFazenda] = useState(null)

    useEffect(() => {
        async function fetchFarm() {
          const { url, options } = FARM_GET(cafe.farmId);
          const response = await fetch(url, options);
          const json = await response.json();
          setFazenda(json.data)
          console.log(json.data)
        }
        fetchFarm();
      }, [])

    const [color, setColor] = useState('#000000')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => { setShow(false) }

    var caminho = 'logo' + cafe.id
    var caminho1 = 'logocomum' + cafe.id
    var caminho2 = 'logopequena' + cafe.id

    const handleColor = props => {
        setColor(props.target.value)
        
        var l2 = document.getElementById(caminho2)
        for (let index = 0; index < l2.childNodes.length; index++) {
            l2.childNodes[index].style.fill = color
        }

        if (cafe.special !== null) {
            var l = document.getElementById(caminho)
            for (let index = 0; index < l.childNodes.length; index++) {
                l.childNodes[index].style.fill = color
            }
        }
        else {
            var l1 = document.getElementById(caminho1)
            for (let index = 0; index < l1.childNodes.length; index++) {
                l1.childNodes[index].style.fill = color
            }
        }
    }

    const handleBackgroundColor = props => {
        setBackgroundColor(props.target.value)
    }

    return (
        <>
            <Button variant="outline-light" onClick={handleShow}> </Button>
            <Modal className='modalAdesivo' show={show} cestylesntered fullscreen={true} >
                <Modal.Header>
                    <Modal.Title style={{ fontWeight: 'bold', color: "#4f4e4e" }}>QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Row>
                            <Col xs={4}>
                                <div className={styles.colors}>
                                    <Form.Label htmlFor="exampleColorInput">Cor do Texto</Form.Label>
                                    <Form.Control
                                        type="color"
                                        defaultValue="#563d7c"
                                        title="Selecione uma cor"
                                        onChange={handleColor}
                                        className={styles.icon}
                                    />
                                </div>
                                <div className={styles.colors}>
                                    <Form.Label htmlFor="exampleColorInput">Cor do fundo</Form.Label>
                                    <Form.Control
                                        type="color"
                                        defaultValue="#563d7c"
                                        title="Selecione uma cor"
                                        onChange={handleBackgroundColor}
                                        className={styles.icon}
                                    />
                                </div>
                            </Col>
                            <Col xs={1}>
                                <EtiquetaPequena endpoint={endpoint ? endpoint : "Em andamento"} color={color} backgroundColor={backgroundColor} cafe={cafe} />
                            </Col>
                            <Col xs={1}>
                            </Col>
                            <Col xs={5}>
                                <div>
                                    <EtiquetaGrande cafe={cafe} endpoint={endpoint ? endpoint : "Em andamento"} color={color} backgroundColor={backgroundColor} fazenda={fazenda}/>
                                </div>
                            </Col>
                        </Row>
                    </>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <ButtonAcc
                        style={{ width: '80px', height: '35px', fontWeight: 'normal', padding: '0', backgroundColor: '#828282' }}
                        onClick={handleClose}
                    >
                        Fechar
                    </ButtonAcc>
                </Modal.Footer>
            </Modal>
        </>
    );
})

export default EtiquetaPersonalizada