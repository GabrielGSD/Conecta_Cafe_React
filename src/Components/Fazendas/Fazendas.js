import {React, useState} from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form} from "react-bootstrap";
import Select from '../Select/Select';
import imgFazenda from '../../Assets/fazendaT.jpg'

function Fazendas() {
  const [torra, setTorra] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];
  const [processo, setProcesso] = useState("");
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const [altitude, setAltitude] = useState();
  const photo = {src: imgFazenda, title:"Teste"}

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
        <div className={styles.card}>
          <img src={photo.src} alt={photo.title} />
          <div className={styles.info}>
            <h1 className={styles.nome}>Fazenda Paraiso</h1>
            <h2 className={styles.regiao}>Sul de Minas - Ouro Fino</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fazendas
