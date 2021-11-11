import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { observer } from 'mobx-react-lite';
import React from "react";
import styles from '../../Fazenda.module.css';


const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`

const Maps = observer(props => {
    const { latitude, longitude } = props

    const containerStyle = {
        width: '25%',
        height: '35%',
    }

    return (
        <>
            <div className={styles.containerMaps}>
                <Map
                    google={window.google}
                    center={{
                        lat: latitude,
                        lng: longitude
                    }}
                    zoom={17}
                    containerStyle={containerStyle} >
                    <Marker
                        name={'NomeFazenda'} // Nome que virá do Backend
                        position={{
                            lat: latitude,
                            lng: longitude
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