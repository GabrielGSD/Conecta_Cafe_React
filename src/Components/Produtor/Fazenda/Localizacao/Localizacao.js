import React from 'react';
import { observer } from "mobx-react";
import { Input } from '../../../Form/Input/Input';
import { Container, Row } from 'react-bootstrap';
import styles from '../Fazenda.module.css';
import Maps from './Maps/Maps'
import { ButtonSalvar } from '../../../Button/Button';
import useForm from '../../../../Hooks/useForm';

const Localizacao = observer(props => {
    const endereco = useForm();

    // Rua: Maria Joaquina, 185, Crisólia, Ouro Fino, MG
    var localizacao = ''
    const handleLocalizacao = () => {
        localizacao = endereco.value
        console.log(localizacao)
    }
    return (
        <>
            <h1 className={styles.subTitle}>Localização</h1>
            <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                <Container>
                    <Row>
                        <Input label="Endereço" type="text" name="endereco" placeholder="Entre com seu endereco (Rua, N°, Bairro, Cidade, UF)" show={false} {...endereco} />
                    </Row>
                    <ButtonSalvar style={{ width: '130px', marginTop: '15px', backgroundColor: '#dddddd', color: '#666666' }} onClick={handleLocalizacao} >Buscar</ButtonSalvar>
                    <Maps address={localizacao ? localizacao : "ouro fino, mg"} />
                </Container>
            </div>
        </>
    )
})

export default Localizacao