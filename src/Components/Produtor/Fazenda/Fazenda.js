import React from 'react'
import styles from './Fazenda.module.css';
import useFetch from '../../../Hooks/useFetch';
import { USER_GET } from '../../../Api/api';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../Context/UserContext';
import { ButtonNavFazenda, ButtonSalvar } from '../../Button/Button';
import Sobre from './Sobre/Sobre';

function Fazenda() {

  const nome = useForm();
  const historia = useForm();
  const inseticidas = useForm();
  const fertilizantes = useForm();

  const { data, loading, error, request } = useFetch();
  const [teste, setTeste] = React.useState("sobre");
  const { farmCreate, farmEdit } = React.useContext(UserContext);


  async function handleSubmit(event) {
    event.preventDefault();
    var body = {
      farm_name: nome.value,
      history: historia.value,
      insecticides: inseticidas.value,
      fertilizers: fertilizantes.value
    };
    if(data.data.farm[0]) {
      farmEdit(data.data.farm[0].id, body);
    }
    else {
      farmCreate(body);
    }
  }

  async function setInputs(r) {
    nome.setValue(r.farm_name);
    historia.setValue(r.history);
    inseticidas.setValue(r.insecticides);
    fertilizantes.setValue(r.fertilizers);
  }
  
  React.useEffect(() => {
    async function fetchGrower() {
      const { url, options } = USER_GET(localStorage.getItem("token"));
      const { response, json } = await request(url, options);

      if(json.data.farm[0]) {
        await setInputs(json.data.farm[0]);
      }
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
          <ButtonNavFazenda onClick={()=> {setTeste("sobre")}}>Sobre</ButtonNavFazenda>
          <ButtonNavFazenda onClick={()=> {setTeste("midia")}}>Fotos/Vídeos</ButtonNavFazenda>
          <ButtonNavFazenda onClick={()=> {setTeste("local")}}>Localização</ButtonNavFazenda>
          <ButtonNavFazenda onClick={()=> {setTeste("contato")}}>Contato</ButtonNavFazenda>
          <ButtonNavFazenda onClick={()=> {setTeste("qrcode")}}>QRCode</ButtonNavFazenda>
        </div>
        
        {teste === "sobre" && <Sobre nome={nome} historia={historia} inseticidas={inseticidas} fertilizantes={fertilizantes} />}

        <ButtonSalvar onClick={handleSubmit}>Salvar</ButtonSalvar>
      </div>
    </div>
  )
}

export default Fazenda
