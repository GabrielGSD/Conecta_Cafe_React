import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { useEffect, useState } from "react";

const API_GEOLOCATION_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?'
const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`


// Criar uma função para coletar os dados de endereço do backend e manter no padrão abaixo
const ADDRESS = 'address=%20rua%20maria%20joaquina,%20185,%20crisolia,%20mg'

const Maps = props => {
    const URL_DA_REQUISICAO = API_GEOLOCATION_GOOGLE + ADDRESS + '&key=' + REACT_APP_API_KEY
    var responseData = ''

    const [dataLoc, setData] = useState('')

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    useEffect(() => {
        fetch(URL_DA_REQUISICAO).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'OK') {
                    setLat(responseJson.results[0].geometry.location.lat);
                    setLong(responseJson.results[0].geometry.location.lng);
                }
            })
    }, [])

    useEffect(() => {
        console.log(lat)
        console.log(long)
    }, [lat])

    console.log("Aqui")

    // Coletar os dados que viram no response e adicioná-los nas variáveis abaixo
    const LATITUDE = -22.2483204
    const LONGITUDE = -46.4105015

    const containerStyle = {
        width: '25%',
        height: '35%',
    }

    return (
        <>
            <Map
                google={window.google}
                initialCenter={{
                    lat: LATITUDE,
                    lng: LONGITUDE
                }}
                zoom={16}
                containerStyle={containerStyle} >
                <Marker
                    name={'NomeFazenda'} // Nome que virá do Backend
                    position={{
                        lat: LATITUDE,
                        lng: LONGITUDE
                    }}
                />
            </Map>
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: (REACT_APP_API_KEY)
})(Maps)