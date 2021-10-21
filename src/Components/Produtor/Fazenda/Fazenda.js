import React from 'react'
import useFetch from '../../../Hooks/useFetch';
import { USER_GET } from '../../../Api/api';
import { ButtonNavFazenda } from '../../Button/Button';

function Fazenda() {

  const { data, loading, error, request } = useFetch();
  

  React.useEffect(() => {
    async function fetchGrower() {
      const { url, options } = USER_GET(localStorage.getItem("token"));
      const { response, json } = await request(url, options);
      console.log(json.data.farm[0])
    }
    fetchGrower();
  }, [request]);

  return (
    <div className={`bgGray center`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className="title">Fazenda</h1>
        </div>
        <div className="navBarCont">
          <ButtonNavFazenda>Sobre</ButtonNavFazenda>
          <ButtonNavFazenda>Fotos/Vídeos</ButtonNavFazenda>
          <ButtonNavFazenda>Localização</ButtonNavFazenda>
          <ButtonNavFazenda>Contato</ButtonNavFazenda>
          <ButtonNavFazenda>QRCode</ButtonNavFazenda>
        </div>
        <div className="container-scroll">

        </div>
      </div>
    </div>
  )
}

export default Fazenda
