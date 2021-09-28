import { Map, GoogleApiWrapper } from 'google-maps-react';

const REACT_APP_API_KEY_MAPS = `${process.env.REACT_APP_API_KEY_MAPS || "API-KEY NOT FOUND!"}`

const Maps = props => {
  const containerStyle = {
    width: '25%',
    height: '30%',
  }

  return (
    <>
      <Map google={window.google} zoom={12}
        containerStyle={containerStyle}>
      </Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: (REACT_APP_API_KEY_MAPS)
})(Maps)

// export default GoogleApiWrapper({
//   apiKey: (REACT_APP_API_KEY_MAPS)
// })(Maps)


// const containerStyle = {
//   position: 'relative',
//   width: '25%',
//   height: '40%',
// }

// class Maps extends Component {
//   render() {
//     return (
//       <>
//         <Template>
//           <Map google={this.props.google} zoom={12}
//             containerStyle={containerStyle}>

//           </Map>
//         </Template>
//       </>
//     );
//   }
// }


// export default GoogleApiWrapper({
//   apiKey: (REACT_APP_API_KEY_MAPS)
// })(Maps)
