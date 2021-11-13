import React from 'react'
import useFetch from '../../../Hooks/useFetch';
import { USER_GET } from '../../../Api/api';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../Context/UserContext';
import { ButtonNavFazenda, ButtonSalvar } from '../../Button/Button';
import Sobre from './Sobre/Sobre';
import Contato from './Contato/Contato';
import Localizacao from './Localizacao/Localizacao';
import FotosVideos from './FotosVideos/FotosVideos';
import QRCode from './QRCode/QRCode';

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
  const whatsApp = useForm();
  
  var urls_midia = []

  const street = useForm();
  // const streetNumber = useForm();
  const district = useForm();
  const city = useForm();
  const country = useForm();
  const uf = useForm();

  const { data, loading, error, request } = useFetch();
  const [sel, setSel] = React.useState("sobre");
  const { farmCreate, farmEdit } = React.useContext(UserContext);


  async function handleSubmit(event) {
    event.preventDefault();
    var body = {
      // variavel do BD : variavel declarado no useForm()
      farm_name: nome.value,
      history: historia.value,
      insecticides: inseticidas.value,
      fertilizers: fertilizantes.value,
    };
    
    if (telefone.value !== "") {
      var contact = {
        phone: telefone.value,
        contact_email: email.value,
        linkedIn: linkedin.value,
        facebook: facebook.value,
        instagram: instagram.value,
        twitter: twitter.value,
        youTube: youtube.value,
        whatsApp: whatsApp.value,
      }
      body['contact'] = contact;
    }

    if (city.value !== "") {
      var address = {
        street: street.value,
        // streetNumber: streetNumber.value,
        district: district.value,
        city: city.value,
        country: country.value,
        uf: uf.value
      }
      body['address'] = address;
    }

    // if(medias.value !== []){
    //   var medias = urls_midia
    // }

    if (data.data.farm.length > 0) {
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
    
    // urls_midia.setValue(r.medias)


    if (r.contact) {
      telefone.setValue(r.contact.phone);
      email.setValue(r.contact.contact_email);
      linkedin.setValue(r.contact.linkedIn);
      facebook.setValue(r.contact.facebook);
      instagram.setValue(r.contact.instagram);
      twitter.setValue(r.contact.twitter);
      youtube.setValue(r.contact.youTube);
      whatsApp.setValue(r.contact.whatsApp);
    }

    if (r.address) {
      street.setValue(r.address.street);
      // streetNumber.setValue(r.address.streetNumber);
      district.setValue(r.address.district);
      city.setValue(r.address.city);
      country.setValue(r.address.country);
      uf.setValue(r.address.uf);
    }
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
        {sel === "midia" && <FotosVideos />}
        {sel === "local" && <Localizacao nome={nome} street={street} district={district} city={city} country={country} uf={uf} />}
        {sel === "contato" && <Contato telefone={telefone} email={email} linkedin={linkedin} facebook={facebook} instagram={instagram} twitter={twitter} youtube={youtube} whatsApp={whatsApp} />}
        {sel === "qrcode" && <QRCode />}


        <ButtonSalvar onClick={handleSubmit} >Salvar</ButtonSalvar>
      </div>
    </div>
  )
}

export default Fazenda
