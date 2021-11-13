import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';
import { observer } from 'mobx-react-lite';
import React from "react";
import styles from '../../Fazenda.module.css';


const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY || "API-KEY NOT FOUND!"}`

const Maps = observer(props => {
    const { nameFarm, latitude, longitude,  } = props

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
                        lat: latitude ? latitude : -22.2571437,
                        lng: longitude ? longitude : -45.6966806
                    }}
                    center={{
                        lat: latitude, 
                        lng: longitude 
                    }}
                    zoom={17}
                    containerStyle={containerStyle} style={{borderRadius: '10%'}}>
                    <Marker
                        name={nameFarm.value} // Nome que virá do Backend
                        position={{
                            lat: latitude,
                            lng: longitude
                        }}
                    />
                    <Circle
                        radius={50}
                        center={{
                            lat: latitude,
                            lng: longitude
                        }}
                        strokeColor='transparent'
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor='#ff0000'
                        fillOpacity={0.2}
                    />
                </Map>
            </div>
        </>
    );
})

export default GoogleApiWrapper({
    apiKey: (REACT_APP_API_KEY)
})(Maps)