import React from 'react'
import styles from '../Fazenda.module.css'
import styles1 from './QRCode.module.css'
import { Container, Row, Form, Col } from 'react-bootstrap'
import QRCodeFazenda from './Etiqueta/GeneratedQrCodeFazenda'

function QRCode({ nome }) {
    return (
        <>
            <h1 className={styles.subTitle}>QR Code</h1>
            <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                <Container className={styles1.container}>
                    <Form>
                        O link e o QRCode abaixo levará para a página web de sua fazenda.
                        <Row>
                            <Col xs={8}>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <a href="https://www.conectacafe.com.br/nome-da-fazenda"
                                    style={{ color: '#0000ff' }}>
                                    https://www.conectacafe.com.br/{nome.value}
                                </a>
                            </Col>

                            <Col xs={4}>
                                <QRCodeFazenda nome={nome} endpoint={`https://www.conectacafe.com.br/${nome.value}`} size={180} />
                            </Col>

                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default QRCode