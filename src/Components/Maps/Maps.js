import { Map, GoogleApiWrapper } from 'google-maps-react';

const REACT_APP_API_KEY_MAPS = `${process.env.REACT_APP_API_KEY_MAPS || "API-KEY NOT FOUND!"}`
// const REACT_APP_API_KEY_MAPS = `{"API-KEY NOT FOUND!"}`

const Maps = props => {
    console.log(REACT_APP_API_KEY_MAPS)
    
    const containerStyle = {
        width: '25%',
        height: '35%',
    }

    return (
        <>
            <Map google={window.google} zoom={12} containerStyle={containerStyle} />
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: (REACT_APP_API_KEY_MAPS)
})(Maps)