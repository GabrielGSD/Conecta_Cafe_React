import React from 'react'
import styles from './Fazenda.module.css';
import useFetch from '../../../Hooks/useFetch';
import { USER_GET } from '../../../Api/api';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../Context/UserContext';
import { ButtonNavFazenda, ButtonSalvar } from '../../Button/Button';
import Sobre from './Sobre/Sobre';
import Contato from './Contato/Contato';
import Dropzone from '../../DropZone/DropZone';
import Maps from '../../Maps/Maps';
import QRgenerator from '../../Etiqueta/GeneratedQrCode';

function Fazenda() {

  const nome = useForm();
  const historia = useForm();
  const inseticidas = useForm();
  const fertilizantes = useForm();

  const telefone = useForm();
  const email = useForm();
  const linkedin = useForm();
  const facebook = useForm();
  const instagram = useForm();
  const twitter = useForm();
  const youtube = useForm();
  const watsapp = useForm();


  const { data, loading, error, request } = useFetch();
  const [sel, setSel] = React.useState("sobre");
  const { farmCreate, farmEdit } = React.useContext(UserContext);


  async function handleSubmit(event) {
    event.preventDefault();
    var body = {
      farm_name: nome.value,
      history: historia.value,
      insecticides: inseticidas.value,
      fertilizers: fertilizantes.value,
      contact: {
        phone: telefone.value,
        contact_email: email.value,
        insecticides: linkedin.value,
        facebook: facebook.value,
        instagran: instagram.value,
        twitter: twitter.value,
        youtube: youtube.value,
        watsapp: watsapp.value,
      }
    };
    if (data.data.farm[0]) {
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
    
    telefone.setValue(r.contact.phone);
    email.setValue(r.contact.contact_email);
    linkedin.setValue(r.contact.contact.insecticides);
    facebook.setValue(r.contact.facebook);
    instagram.setValue(r.contact.instagran);
    twitter.setValue(r.contact.twitter);
    youtube.setValue(r.contact.youtube);
    watsapp.setValue(r.contact.watsapp);
  }

  React.useEffect(() => {
    async function fetchGrower() {
      const { url, options } = USER_GET(localStorage.getItem("token"));
      const { response, json } = await request(url, options);

      if (json.data.farm[0]) {
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
          <ButtonNavFazenda onClick={() => { setSel("sobre") }}>Sobre</ButtonNavFazenda>
          <ButtonNavFazenda onClick={() => { setSel("midia") }}>Fotos/Vídeos</ButtonNavFazenda>
          <ButtonNavFazenda onClick={() => { setSel("local") }}>Localização</ButtonNavFazenda>
          <ButtonNavFazenda onClick={() => { setSel("contato") }}>Contato</ButtonNavFazenda>
          <ButtonNavFazenda onClick={() => { setSel("qrcode") }}>QRCode</ButtonNavFazenda>
        </div>

        {sel === "sobre" && <Sobre nome={nome} historia={historia} inseticidas={inseticidas} fertilizantes={fertilizantes} />}
        {sel === "midia" && <Dropzone />}
        {sel === "local" && <Maps />}
        {sel === "contato" && <Contato telefone={telefone} email={email} linkedin={linkedin} facebook={facebook} instagram={instagram} twitter={twitter} youtube={youtube} watsapp={watsapp} />}
        {sel === "qrcode" && <QRgenerator endpoint={'Em andamento'}/>}

        <ButtonSalvar onClick={handleSubmit}>Salvar</ButtonSalvar>
      </div>
    </div>
  )
}

export default Fazenda
