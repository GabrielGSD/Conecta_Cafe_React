import { React, useState, useEffect } from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../Select/Select';
import { FARMER_GET_ALL } from '../../Api/api';
import imgFazenda from '../../Assets/fazendaT.jpg'
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg'
import { useNavigate } from 'react-router';

function Fazendas() {
  const navigate = useNavigate();

  const [fazendas, setFazendas] = useState(null);

  const [torra, setTorra] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];
  const [processo, setProcesso] = useState("");
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const photo = { src: imgFazenda, title: "Teste" }

  useEffect(() => {
    async function fetchGrower() {
      const { url, options } = FARMER_GET_ALL();
      const response = await fetch(url, options);
      const json = await response.json();
      setFazendas(json.data)
    }
    fetchGrower();
  }, [torra, processo]);

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
          {fazendas && 
            <>
              {fazendas.map((fazenda) => (
                <div className={styles.card} key={fazenda}>
                  <img src={photo.src} alt={photo.title} />
                  <div className={styles.info}>
                    <h1 className={styles.nome}>{fazenda.farm_name}</h1>
                    {fazenda.address && <h2 className={styles.regiao}>{fazenda.address.city} - {fazenda.address.uf}</h2>}
                    <h2 className={`${styles.regiao} ${styles.animeTop}`} onClick={()=> { navigate(`/fazendas/${fazenda.id}`) }}>Ver mais <ArrowIcon /></h2>
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Fazendas
