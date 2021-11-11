import React, { useState } from 'react'
import Etiqueta from './Etiqueta/Etiqueta';
// import styles from './EtiquetasPersonalizadas.module.css';
import { SketchPicker } from 'react-color'
import { Button } from 'react-bootstrap';
import { observer } from "mobx-react"
import { Modal } from 'react-bootstrap';
import { ButtonAcc } from '../../../Button/Button';

const EtiquetaPersonalizada = observer(props => {
    const { endpoint } = props
    const [color, setColor] = useState('#000000')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => { setShow(false) }

    return (
        <>
            <Button onClick={handleShow}> </Button>
            <Modal className='modalEtiqueta' show={show} centered  fullscreen={true} >
                <Modal.Header>
                    <Modal.Title style={{ fontWeight: 'bold', color: "#4f4e4e" }}>QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-1">
                            <SketchPicker
                                color={color}
                                onChangeComplete={(color) => { setColor(color.hex) }}
                            />
                            <SketchPicker
                                color={backgroundColor}
                                onChangeComplete={(backgroundColor) => { setBackgroundColor(backgroundColor.hex) }}
                            />
                        </div>
                        <div class="col-md-6 ml-auto">
                            <Etiqueta color={color} backgroundColor={backgroundColor} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <ButtonAcc
                        style={{ width: '80px', height: '35px', fontWeight: 'normal', padding: '0' }}
                        onClick={handleClose}
                    >
                        Salvar
                    </ButtonAcc>
                </Modal.Footer>
            </Modal>
        </>
    );
})

export default EtiquetaPersonalizada