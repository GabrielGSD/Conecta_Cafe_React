import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { Input } from '../../../Form/Input/Input';
import { Container, Row } from 'react-bootstrap';
import styles from '../Fazenda.module.css';
import Maps from './Maps/Maps'
import { ButtonSalvar } from '../../../Button/Button';
import useForm from '../../../../Hooks/useForm';


const API_GEOLOCATION_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?'
const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`

const Localizacao = observer(props => {
    const endereco = useForm();
    const [latitude, setLatitude] = useState('-22.2797829')
    const [longitude, setLongitude] = useState('-46.3722224')
    const [localizacao, setLocalizacao] = useState('Ouro Fino, MG')

    const URL_DA_REQUISICAO = API_GEOLOCATION_GOOGLE + 'address=' + localizacao + '&key=' + REACT_APP_API_KEY

    // Rua: Maria Joaquina, 185, Crisólia, Ouro Fino, MG
    const handleLocalizacao = (event) => {
        event.preventDefault()

        if (endereco.value) {
            setLocalizacao(endereco.value)

            if (localizacao == endereco.value) {
                fetch(URL_DA_REQUISICAO).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.status === 'OK') {
                            setLatitude(responseJson.results[0].geometry.location.lat);
                            setLongitude(responseJson.results[0].geometry.location.lng);
                        }
                    })

                console.log(URL_DA_REQUISICAO)
                console.log(latitude)
                console.log(longitude)
            }
        } else {
            console.log("Nenhum endereço inserido!!!")
        }
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
                    <Maps latitude={latitude} longitude={longitude} />
                </Container>
            </div>
        </>
    )
})

export default Localizacao