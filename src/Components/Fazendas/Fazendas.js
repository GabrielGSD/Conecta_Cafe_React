import { React, useState, useEffect } from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../Select/Select';
import { FARMER_GET_ALL, COFFEE_GET_ALL } from '../../Api/api';
import imgFazenda from '../../Assets/fazendaT.jpg'
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg'
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

var cafes_filtro = []
function Fazendas() {
  const navigate = useNavigate();

  const [fazendas, setFazendas] = useState(null);
  const [fazendasFilter, setFazendasFilter] = useState(null);
  const [cafes, setCafes] = useState(null);


  const [torra, setTorra] = useState("");
  const [especial, setEspecial] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];
  const [processo, setProcesso] = useState("");
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const especiais = ['Tudo', 'Comum', 'Especial'];
  const photo = { src: imgFazenda, title: "Teste" }

  useEffect(() => {
    async function fetchGrower() {
      const { url, options } = FARMER_GET_ALL();
      const response = await fetch(url, options);
      const json = await response.json();
      setFazendas(json.data)
      setFazendasFilter(json.data)
    }
    fetchGrower()
  }, [])

  useEffect(() => {
    async function fetchCoffee() {
      const { url, options } = COFFEE_GET_ALL();
      const response = await fetch(url, options);
      const json = await response.json();
      // setCafes(json.data.coffee)

      if (especial === "" || especial === "Tudo") {
        cafes_filtro = []
        console.log("Tudo")
        json.data.forEach((i) => {
          if (i !== undefined) {
            cafes_filtro.push(i.farmId)
          }
        })
      }

      if (especial === 'Especial') {
        console.log("Especial")
        cafes_filtro = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.special !== null) {
              cafes_filtro.push(i.farmId)
            }
          }
        })
      }

      if (especial === 'Comum') {
        console.log("Comum")
        cafes_filtro = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.special === null) {
              cafes_filtro.push(i.farmId)
              // cafes_filtro = [...new Set(cafes_filtro)]
            }
          }
        })
      }
      // console.log(cafes_filtro)
      if (fazendas !== null) {
        setFazendasFilter(fazendas.filter(item => cafes_filtro.includes(item.id) === true))
      }
    }

    fetchCoffee();
  }, [especial]);


  const Card = observer(props => {
    return (
      <>
        <div className={styles.card} key={props.fazenda}>
          <img src={photo.src} alt={photo.title} />
          <div className={styles.info}>
            <h1 className={styles.nome}>{props.fazenda.farm_name}</h1>
            {props.fazenda.address && <h2 className={styles.regiao}>{props.fazenda.address.city} - {props.fazenda.address.uf}</h2>}
            <h2 className={`${styles.regiao} ${styles.animeTop}`} onClick={() => { navigate(`/fazendas/${props.fazenda.id}`) }}>Ver mais <ArrowIcon /></h2>
          </div>
        </div>
      </>
    )
  })

  return (
    <>
      <div className={`bgGray center`}>
        <div className="boxContainer">
          <div className="center">
            <h1 className="title">Fazendas</h1>
          </div>
          <div className="navBarCont">
            <Select type={especial} setType={setEspecial} options={especiais} def="Tipo" />
            <Select type={torra} setType={setTorra} options={torras} def="Torra" />
            <Select type={processo} setType={setProcesso} options={processos} def="Processamento" />
            {/* <input type="range" class="form-range"  max='5000' value={altitude} onChange={altitude => setAltitude(altitude)}/> */}
          </div>
          <div className="container-scroll list-grid">
            {fazendasFilter &&
              <>
                {fazendasFilter.map((fazenda) => (
                  <>
                    <Card fazenda={fazenda} />
                  </>
                ))}
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Fazendas
