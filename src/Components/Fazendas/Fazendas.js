import { React, useState, useEffect } from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../Select/Select';
import { FARMER_GET_ALL, COFFEE_GET_ALL } from '../../Api/api';
import imgFazenda from '../../Assets/fazendaT.jpg'
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg'
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

var filtro_especial = []
var filtro_processo = []
var filtro_tipo = []

function Fazendas() {
  const navigate = useNavigate();

  const [fazendas, setFazendas] = useState(null);
  const [fazendasFilter, setFazendasFilter] = useState(null);


  const [especial, setEspecial] = useState("");
  const [processo, setProcesso] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipo6e7, setTipo6e7] = useState("");
  const [tipos6e7, setTipos6e7] = useState([]);
  const processos = ['Tudo', 'Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const especiais = ['Tudo', 'Comum', 'Especial'];
  const tipos = ['Tudo', 'Arábica - Tipo 6', 'Robusta (Conilon) - Tipo 7'];
  const photo = { src: imgFazenda, title: "Teste" }
  const [filtro_visivel, setFiltroVisivel] = useState(false)

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

      // Filtro para cafés especiais
      filtro_especial = []
      json.data.forEach((i) => {
        if (i !== undefined) {
          if (especial === "" || especial === "Tudo") {
            filtro_especial.push(i.farmId)
          }
          else if (i.special === null && especial === "Comum") {
            filtro_especial.push(i.farmId)
          }
          else if (i.special !== null && especial === "Especial") {
            filtro_especial.push(i.farmId)
          }
        }
      })

      // Filtro para processos de secagem do grão
      filtro_processo = []
      json.data.forEach((i) => {
        if (i !== undefined) {
          if (processo === "" || processo === "Tudo") {
            filtro_processo.push(i.farmId)
          }
          else if (i.process === "Terreiro" && processo === "Terreiro") {
            filtro_processo.push(i.farmId)
          }
          else if (i.process === "Terreiro suspenso" && processo === "Terreiro suspenso") {
            filtro_processo.push(i.farmId)
          }
          else if (i.process === "Estufa" && processo === "Estufa") {
            filtro_processo.push(i.farmId)
          }
          else if (i.process === "Secagem automática" && processo === "Secagem automática") {
            filtro_processo.push(i.farmId)
          }
        }
      })


      // Filtro para qualidade da bebida do grão Tipo 6 (Arábica) e Tipo 7 (Conilon)
      filtro_tipo = []
      setFiltroVisivel(false)
      if (tipo === "Arábica - Tipo 6" || tipo === "Robusta (Conilon) - Tipo 7") {
        setFiltroVisivel(true)
      }
      json.data.forEach((i) => {
        if (i !== undefined) {
          if (tipo === "" || tipo === "Tudo") {
            filtro_tipo.push(i.farmId)
          }
          else if (i.variety === "Arábica " && tipo === "Arábica - Tipo 6") {
            setTipos6e7(["Tudo", "Mundo Novo", "Bourbon", "Laurina", "Catuaí", "Acaiá", "Topázio", "Icatu", "Caturra"])
            if (i.species === tipo6e7 && tipo6e7 !== "") {
              filtro_tipo.push(i.farmId)
            }
            // else if (tipo6e7 === "" || tipo6e7 === "Tudo") {
            else if (tipo6e7 === "" || tipo6e7 === "Tudo" || tipo6e7 === "Conilon") {
              filtro_tipo.push(i.farmId)
            }
          }
          else if (i.variety === "Robusta (Conilon)" && tipo === "Robusta (Conilon) - Tipo 7") {
            setTipos6e7(['Tudo', 'Conilon'])
            // if (i.species === tipo6e7 && tipo6e7 !== "") {
            if (tipo6e7 !== "") {
              filtro_tipo.push(i.farmId)
            }
            else if (tipo6e7 === "" || tipo6e7 === "Tudo") {
              filtro_tipo.push(i.farmId)
            }
          }
        }
      })

      if (fazendas !== null) {
        setFazendasFilter(fazendas.filter(item => (filtro_especial.includes(item.id) === true) &&
          filtro_processo.includes(item.id) === true &&
          filtro_tipo.includes(item.id) === true))
      }
    }
    fetchCoffee();
  }, [especial, processo, tipo, tipo6e7]);


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
            <Select type={processo} setType={setProcesso} options={processos} def="Processamento" />
            <Select type={tipo} setType={setTipo} options={tipos} def="Tipo Bebida" />
            {
              filtro_visivel ?
                <>
                  <Select type={tipo6e7} setType={setTipo6e7} options={tipos6e7} def="Espécie" />
                </>
                :
                <></>
            }

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
