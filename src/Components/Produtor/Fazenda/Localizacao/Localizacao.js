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

const Localizacao = observer(() => {
    const endereco = useForm();
    const [latitude, setLatitude] = useState('-22.2797829')
    const [longitude, setLongitude] = useState('-46.3722224')
    const [localizacao, setLocalizacao] = useState('Ouro Fino, MG')

    const [street, setStreet] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [uf, setUF] = useState('')


    // "address": {
    //     "street": "Rua dos Pinheiros, Taguá",
    //     "district": "Delcides Teles",
    //     "city": "Ouro Fino",
    //     "country": "Brasil",
    //     "uf": "MG"
    //   },

    // Rua: Maria Joaquina, 185, Crisólia, Ouro Fino, MG
    useEffect(() => {
        setLocalizacao(endereco.value)
    }, [endereco.value])

    const handleLocalizacao = (event) => {
        event.preventDefault()

        if (endereco.value) {
            const URL_DA_REQUISICAO = API_GEOLOCATION_GOOGLE + 'address=' + localizacao + '&key=' + REACT_APP_API_KEY

            if (localizacao === endereco.value) {
                fetch(URL_DA_REQUISICAO).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.status === 'OK') {
                            setLatitude(responseJson.results[0].geometry.location.lat);
                            setLongitude(responseJson.results[0].geometry.location.lng);

                            for (let i = 0; i < responseJson.results[0].address_components.length; i++) {
                                // console.log(responseJson.results[0].address_components[i].types[0])
                                if (responseJson.results[0].address_components[i].types[0] === "street_number") {
                                    setStreetNumber(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "route") {
                                    setStreet(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "administrative_area_level_4") {
                                    setDistrict(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "administrative_area_level_2") {
                                    setCity(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "administrative_area_level_1") {
                                    setUF(responseJson.results[0].address_components[i].short_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "country") {
                                    setCountry(responseJson.results[0].address_components[i].long_name)
                                }
                            }
                        }
                    })


            }
        } else {
            console.log("Nenhum endereço inserido!!!")
        }
        console.log("street " + street)
        console.log("streetNumber " + streetNumber)
        console.log("district " + district)
        console.log("city " + city)
        console.log("uf " + uf)
        console.log("country " + country)
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