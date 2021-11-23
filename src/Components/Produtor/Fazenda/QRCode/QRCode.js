import React from 'react'
import styles from '../Fazenda.module.css'
import styles1 from './QRCode.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import QRCodeFazenda from './Etiqueta/GeneratedQrCodeFazenda'

function QRCode({id, nome}) {
    return (
        <>
            <h1 className={styles.subTitle}>QR Code</h1>
            <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                <Container className={styles1.container}>
                    <p>O link e o QRCode abaixo levará para a página web de sua fazenda.</p>
                    <Row style={{maxWidth: '60vw', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
                        <Col style={{paddingTop: '20px'}}>
                            <QRCodeFazenda nome={nome} endpoint={ `http://localhost:3000/fazendas/${id.value}` } size={180} />
                        </Col>

                        <Col>
                            <a href={`http://localhost:3000/fazendas/${id.value}`}
                                style={{ fontWeight: 'bold', marginLeft: '5px' }}
                            >
                                Clique para acessar a página de sua fazenda
                            </a> 
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default QRCode