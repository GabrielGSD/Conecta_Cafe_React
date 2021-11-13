import React, { useState } from 'react'
import Etiqueta from './Etiqueta/Etiqueta';
// import styles from './EtiquetasPersonalizadas.module.css';
import { Button, Form } from 'react-bootstrap';
import { observer } from "mobx-react"
import { Modal, Col, Row } from 'react-bootstrap';
import { ButtonAcc } from '../../../Button/Button';
import styles from './EtiquetasPersonalizadas.module.css';
import EtiquetaPequena from './Etiqueta/EtiquetaPequena';

const EtiquetaPersonalizada = observer(props => {
    const { endpoint } = props

    const [color, setColor] = useState('#000000')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => { setShow(false) }

    const handleColor = props => {
        setColor(props.target.value)
    }

    const handleBackgroundColor = props => {
        setBackgroundColor(props.target.value)
    }

    return (
        <>
            <Button onClick={handleShow}> </Button>
            <Modal className='modalEtiqueta' show={show} centered fullscreen={true} >
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
                            <Col xs={2}>
                                <EtiquetaPequena endpoint={endpoint? endpoint : "Em andamento"} color={color} backgroundColor={backgroundColor} />
                            </Col>
                            <Col xs={4}>
                                <div>
                                    <Etiqueta endpoint={endpoint? endpoint : "Em andamento"} color={color} backgroundColor={backgroundColor} />
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