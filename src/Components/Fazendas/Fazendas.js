import { React, useState, useEffect } from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import {Form} from "react-bootstrap";
import Select from '../Select/Select';
import API from '../../Services/Api.js';
import imgFazenda from '../../Assets/fazendaT.jpg'
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg'

function Fazendas() {
  const [torra, setTorra] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];
  const [processo, setProcesso] = useState("");
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const teste = ['A', 'S', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  // const [altitude, setAltitude] = useState();
  const photo = { src: imgFazenda, title: "Teste" }


  const [user, setUser] = useState();

  useEffect(() => {
    API
      .get("/farm/c43ecfab-69f0-46bd-aa38-4af3796350cf")
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className={`bgGray center ${styles.header}`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className={styles.title}>Fazendas</h1>
        </div>
        <div className={styles.filterBar}>
          <Select type={torra} setType={setTorra} options={torras} def="Torra" />
          <Select type={processo} setType={setProcesso} options={processos} def="Processamento" />
          {/* <input type="range" class="form-range"  max='5000' value={altitude} onChange={altitude => setAltitude(altitude)}/> */}
        </div>
        <div className="container-scroll">
          {teste.map((card) => (
            <div className={styles.card} key={card}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.info}>
                {/* <h1 className={styles.nome}>Fazenda Paraiso</h1>
                <h2 className={styles.regiao}>Sul de Minas - Ouro Fino</h2>
                <h2 className={`${styles.regiao} ${styles.animeTop}`}>Ver mais <ArrowIcon /></h2> */}
                <h1 className={styles.nome}> {user?.data.farm_name}</h1>
                <h2 className={styles.regiao}>{user?.data.address.city}</h2>
                <h2 className={`${styles.regiao} ${styles.animeTop}`}>Ver mais <ArrowIcon /></h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fazendas
