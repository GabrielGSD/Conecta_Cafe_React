import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { Input } from '../../../Form/Input/Input';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../Fazenda.module.css';
import Maps from './Maps/Maps'
import { ButtonSalvar } from '../../../Button/Button';
import useForm from '../../../../Hooks/useForm';


const API_GEOLOCATION_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?'
const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`

const Localizacao = observer(({ nome, street, streetNumber, district, city, uf, country, onlyMaps }) => {
    const endereco = useForm();
    const [latitude, setLatitude] = useState('-22.2571437')
    const [longitude, setLongitude] = useState('-45.6966806')
    const [localizacao, setLocalizacao] = useState('')

    const [streetResp, setStreet] = useState('')
    const [streetNumberResp, setStreetNumber] = useState('')
    const [districtyResp, setDistrict] = useState('')
    const [cityResp, setCity] = useState('')
    const [countryResp, setCountry] = useState('')
    const [ufResp, setUF] = useState('')

    // Rua: Maria Joaquina, 185, Crisólia, Ouro Fino, MG
    useEffect(() => {
        setLocalizacao(endereco.value)
    }, [endereco.value])

    useEffect(() => {
        if ((streetResp && streetNumberResp && districtyResp && cityResp && countryResp && ufResp) !== '') {
            sendDataLocation()
        } else {
            // console.log(streetResp + " | " + streetNumberResp + " | " + districtyResp + " | " + cityResp + " | " + ufResp + " | " + countryResp + "\n")
            console.log("Insira todos da localização na busca")
        }
    }, [streetResp, streetNumberResp, districtyResp, cityResp, ufResp, countryResp])

    useEffect(() => {
        if ((street && streetNumber && district && city && uf && country) !== '') {
            endereco.setValue(street.value + ", " + streetNumber.value + ", " + district.value + ", " + city.value + ", " + uf.value + ", " + country.value)

            const URL_DA_REQUISICAO = API_GEOLOCATION_GOOGLE + 'address=' + street.value + "," + streetNumber.value + "," + district.value + "," + city.value + "," + uf.value + "," + country.value + '&key=' + REACT_APP_API_KEY

            fetch(URL_DA_REQUISICAO).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status === 'OK') {
                        setLatitude(responseJson.results[0].geometry.location.lat);
                        setLongitude(responseJson.results[0].geometry.location.lng);
                    }
                })
        }
    }, [])

    const sendDataLocation = () => {
        // console.log(streetResp + " | " + streetNumberResp + " | " + districtyResp + " | " + cityResp + " | " + ufResp + " | " + countryResp + "\n")

        street.setValue(streetResp)
        streetNumber.setValue(streetNumberResp)
        district.setValue(districtyResp)
        city.setValue(cityResp)
        country.setValue(countryResp)
        uf.setValue(ufResp)

    }

    const handleLocation = (event) => {
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
                                if (responseJson.results[0].address_components[i].types[0] === "street_number") {
                                    setStreetNumber(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "route" ||
                                    responseJson.results[0].address_components[i].types[0] === "locality") {
                                    setStreet(responseJson.results[0].address_components[i].long_name)
                                }
                                else if (responseJson.results[0].address_components[i].types[0] === "administrative_area_level_4" ||
                                    responseJson.results[0].address_components[i].types[1] === "sublocality" ||
                                    responseJson.results[0].address_components[i].types[2] === "sublocality_level_1") {
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
    }

    return (
        <>
            {
                onlyMaps ?
                    <>
                        <Maps nameFarm={nome} latitude={latitude} longitude={longitude} />
                    </>
                    :
                    <>
                        <h1 className={styles.subTitle}>Localização</h1>
                        <div className="container-scroll" style={{ marginTop: ' 15px', marginBottom: "0px" }}>
                            <Container>
                                <Row>
                                    <Col xs={10}>
                                        <Input label="Endereço" type="text" name="endereco" placeholder="Entre com seu endereco (Rua, N°, Bairro, Cidade, UF)" show={false} {...endereco} />
                                    </Col>
                                    <Col xs={2}>
                                        <ButtonSalvar style={{ width: '130px', marginTop: '15%', backgroundColor: '#dddddd', color: '#666666' }} onClick={handleLocation} >Buscar</ButtonSalvar>
                                    </Col>
                                </Row>
                                <Row>
                                    <Maps nameFarm={nome} latitude={latitude} longitude={longitude} />
                                </Row>
                            </Container>
                        </div>
                    </>
            }
        </>
    )
})

export default Localizacao