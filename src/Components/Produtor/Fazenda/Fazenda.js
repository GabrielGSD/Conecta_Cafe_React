import React from 'react'
import styles from './Fazenda.module.css';
import useFetch from '../../../Hooks/useFetch';
import { USER_GET } from '../../../Api/api';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../Context/UserContext';
import {Input, TextArea} from '../../Form/Input/Input';
import { ButtonNavFazenda, ButtonSalvar } from '../../Button/Button';

function Fazenda() {

  const nome = useForm();
  const historia = useForm();
  const inseticidas = useForm();
  const fertilizantes = useForm();

  const { data, loading, error, request } = useFetch();
  const { farmCreate } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    farmCreate(historia.value);
  }
  
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
        
        <h1 className={styles.subTitle}>Sobre</h1>
        <div className="container-scroll" style={{ margin: ' 15px 0 0 35px' }}>
          <Input label="Nome" type="text" name="nome" placeholder="Entre com o nome da sua fazenda" show={false} {...nome} />
          <TextArea label="História" type="text" name="historia" placeholder="Conte-nos sobre a história de sua fazenda" show={false} {...historia} />
          <Input label="Inseticidas" type="text" name="inseticidas" placeholder="Entre com os inseticidas utilizados em sua fazenda" show={false} {...inseticidas} />
          <Input label="Fertilizantes" type="text" name="fertilizantes" placeholder="Entre com os fertilizantes utilizados em sua fazenda" show={false} {...fertilizantes} />
        </div>
        <ButtonSalvar onClick={handleSubmit}>Salvar</ButtonSalvar>
      </div>
    </div>
  )
}

export default Fazenda
