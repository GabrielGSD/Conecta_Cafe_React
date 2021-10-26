import {React, useState} from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../Select/Select';
import imgFazenda from '../../Assets/fazendaT.jpg'
import {ReactComponent as ArrowIcon} from '../../Assets/Arrow.svg'

function Fazendas() {
  const [torra, setTorra] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];
  const [processo, setProcesso] = useState("");
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const teste = ['A', 'S', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  // const [altitude, setAltitude] = useState();
  const photo = {src: imgFazenda, title:"Teste"}

  return (
    <div className={`bgGray center`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className="title">Fazendas</h1>
        </div>
        <div className="navBarCont">
          <Select type={torra} setType={setTorra} options={torras} def="Torra" />
          <Select type={processo} setType={setProcesso} options={processos} def="Processamento" />
          {/* <input type="range" class="form-range"  max='5000' value={altitude} onChange={altitude => setAltitude(altitude)}/> */}
        </div>
        <div className="container-scroll list-grid">
          {teste.map((card) => (
            <div className={styles.card} key={card}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.info}>
                <h1 className={styles.nome}>Fazenda Paraiso</h1>
                <h2 className={styles.regiao}>Sul de Minas - Ouro Fino</h2>
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
