import React from 'react'
import styles from '../Fazenda.module.css'
import styles1 from './QRCode.module.css'
import { Container, Row, Form, Col } from 'react-bootstrap'
import QRgenerator from './Etiqueta/GeneratedQrCode'

function QRCode() {
    return (
        <>
            <h1 className={styles.subTitle}>QR Code</h1>
            <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                <Container className={styles1.container}>
                    <Form>
                        O link e o QRCode abaixo levará para a página web de sua fazenda.
                        <Row>
                            <Col xs={6}>
                                https://www.conectacafe.com.br/nome-da-fazenda
                            </Col>

                            <Col xs={6}>
                                <QRgenerator endpoint={"https://www.conectacafe.com.br/nome-da-fazenda"} size={220}/>
                            </Col>

                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default QRCode