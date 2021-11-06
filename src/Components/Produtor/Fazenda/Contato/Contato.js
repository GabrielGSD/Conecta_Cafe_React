import React from 'react'
import styles from '../Fazenda.module.css';
import { Input } from '../../../Form/Input/Input';
import { Col, Container, Row } from 'react-bootstrap';

function Contato({ telefone, email, linkedin, facebook, instagram, twitter, youtube, whatsApp }) {
    return (
        <>
            <h1 className={styles.subTitle}>Contato</h1>
            <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <Input label="Telefone" type="text" name="telefone" placeholder="Entre com seu telefone" show={false} {...telefone} />

                            <Input label="E-mail" type="text" name="email" placeholder="Entre com seu e-mail" show={false} {...email} />

                            <Input label="Linkedin" type="text" name="linkedin" placeholder="Link do perfil do Linkedin" show={false} {...linkedIn} />

                        </Col>
                        <Col xs={4}>
                            <Input label="Facebook" type="text" name="facebook" placeholder="Link do perfil do Facebook" show={false} {...facebook} />

                            <Input label="Instagran" type="text" name="instagran" placeholder="Link do perfil do Instagran" show={false} {...instagram} />

                            <Input label="Twitter" type="text" name="twitter" placeholder="Link do perfil do Twitter" show={false} {...twitter} />

                        </Col>
                        <Col xs={4}>
                            <Input label="Youtube" type="text" name="youtube" placeholder="Link do canal no Youtube" show={false} {...youTube} />

                            <Input label="Watsapp" type="text" name="watsapp" placeholder="Entre com o Watsapp da Fazenda" show={false} {...whatsApp} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Contato