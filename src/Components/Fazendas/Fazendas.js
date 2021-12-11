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
  const [tipos6e7, setTipos6e7] = useState(['']);
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

      if (especial === "" || especial === "Tudo") {
        filtro_especial = []
        // console.log("Tudo")
        json.data.forEach((i) => {
          if (i !== undefined) {
            filtro_especial.push(i.farmId)
          }
        })
      }

      if (especial === 'Especial') {
        // console.log("Especial")
        filtro_especial = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.special !== null) {
              filtro_especial.push(i.farmId)
            }
          }
        })
      }

      if (especial === 'Comum') {
        // console.log("Comum")
        filtro_especial = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.special === null) {
              filtro_especial.push(i.farmId)
            }
          }
        })
      }

      if (processo === "" || processo === "Tudo") {
        filtro_processo = []
        // console.log("Tudo")
        json.data.forEach((i) => {
          if (i !== undefined) {
            filtro_processo.push(i.farmId)
          }
        })
      }

      if (processo === 'Terreiro') {
        // console.log("Terreiro")
        filtro_processo = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.process === "Terreiro") {
              filtro_processo.push(i.farmId)
            }
          }
        })
      }

      if (processo === 'Terreiro suspenso') {
        // console.log("Terreiro suspenso")
        filtro_processo = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.process === "Terreiro suspenso") {
              filtro_processo.push(i.farmId)
            }
          }
        })
      }

      if (processo === 'Estufa') {
        // console.log("Estufa")
        filtro_processo = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.process === "Estufa") {
              filtro_processo.push(i.farmId)
            }
          }
        })
      }

      if (processo === 'Secagem automática') {
        // console.log("Secagem automática")
        filtro_processo = []
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.process === "Secagem automática") {
              filtro_processo.push(i.farmId)
            }
          }
        })
      }

      if (tipo === "" || tipo === "Tudo") {
        filtro_tipo = []
        setFiltroVisivel(false)
        json.data.forEach((i) => {
          if (i !== undefined) {

            filtro_tipo.push(i.farmId)
          }
        })
      }

      if (tipo === "Arábica - Tipo 6") {
        console.log("Arábica - Tipo 6")
        filtro_tipo = []
        setFiltroVisivel(true)
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.variety === "Arábica ") {
              setTipos6e7(["Mundo Novo", "Bourbon", "Laurina", "Catuaí", "Acaiá", "Topázio", "Icatu", "Caturra"])
              console.log(i.species === tipo6e7 && tipo6e7 !== "")
              if (i.species === tipo6e7 && tipo6e7 !== ""){
                filtro_tipo.push(i.farmId)
              }
            }
          }
        })
      }

      if (tipo === "Robusta (Conilon) - Tipo 7") {
        console.log("Robusta (Conilon) - Tipo 7")
        filtro_tipo = []
        setFiltroVisivel(true)
        json.data.forEach((i) => {
          if (i !== undefined) {
            if (i.variety === "Robusta (Conilon)") {
              setTipos6e7(['Conilon'])
              filtro_tipo.push(i.farmId)
            }
          }
        })
      }

      console.log(filtro_tipo)

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
