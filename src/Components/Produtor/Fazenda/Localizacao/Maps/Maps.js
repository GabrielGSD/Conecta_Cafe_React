import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from "react";
import styles from '../../Fazenda.module.css';

const API_GEOLOCATION_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?'
const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`

// Criar uma função para coletar os dados de endereço do backend e manter no padrão abaixo
// const ADDRESS = 'address=%20rua%20maria%20joaquina,%20185,%20crisolia,%20mg'

const Maps = observer(props => {
    const { address } = props
    const URL_DA_REQUISICAO = API_GEOLOCATION_GOOGLE + 'address=' + address + '&key=' + REACT_APP_API_KEY
    console.log(URL_DA_REQUISICAO)

    const [lat, setLat] = useState('-22.2797829')
    const [long, setLong] = useState('-46.3722224')

    useEffect(() => {
        fetch(URL_DA_REQUISICAO).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'OK') {
                    setLat(responseJson.results[0].geometry.location.lat);
                    setLong(responseJson.results[0].geometry.location.lng);
                }
            })
    }, [address])

    useEffect(() => {
        console.log(lat)
        console.log(long)
    }, [lat, long])

    const containerStyle = {
        width: '25%',
        height: '35%',
    }

    return (
        <>
            <div className={styles.containerMaps}>
                <Map
                    google={window.google}
                    initialCenter={{
                        lat: lat,
                        lng: long
                    }}
                    zoom={16}
                    containerStyle={containerStyle} >
                    <Marker
                        name={'NomeFazenda'} // Nome que virá do Backend
                        position={{
                            lat: lat,
                            lng: long
                        }}
                    />
                </Map>
            </div>
        </>
    );
})

export default GoogleApiWrapper({
    apiKey: (REACT_APP_API_KEY)
})(Maps)