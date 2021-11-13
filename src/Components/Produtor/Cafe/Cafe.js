import React from 'react';
import { UserContext } from '../../../Context/UserContext';
import { ButtonSalvar, ButtonAcc } from '../../Button/Button';
import { Modal, } from 'react-bootstrap';
import Card from './Card/Card';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import CafeCont from './CafeCont/CafeCont';
import Especial from './Especial/Especial';
import { COFFEES_GET } from '../../../Api/api';
import styles  from './Cafe.module.css';

function Cafe() {

  const [variedade, setVariedade] = React.useState("");
  const variedades = ['Arábica ', 'Robusta (Conilon)'];
  const [especie, setEspecie] = React.useState("");
  const arrRobusta = ["Conilon"];
  const arrArabica = ["Mundo Novo", "Bourbon", "Laurina", "Catuaí", "Acaiá", "Topázio", "Icatu", "Caturra"];
  const altitude = useForm("number");
  const processo = useForm();
  const safra = useForm("number");
  const valor = useForm("number");
  const [especial, setEspecial] = React.useState(false);

  // Café especial
  const aroma = useForm();
  const sabor = useForm();
  const finalizacao = useForm();
  const acidez = useForm();
  const corpo = useForm();
  const docura = useForm();

  const { data, coffeeCreate, getFarm } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const [show, setShow] = React.useState(false);
  const [cafes, setCafes] = React.useState();
  const [reload, setReload] = React.useState("");

  const handleClose = () => { clearInputs(); setShow(false) }
  const handleShow = () => setShow(true);

  const especialClose = () => setEspecial(false);

  React.useEffect(() => {
    async function fetchGrower() {
      const { url, options } = COFFEES_GET(data.data.id);
      const { response, json } = await request(url, options);
      getFarm(data.data.id)
      console.log(data.data.coffee)
      setReload("")
    }
    fetchGrower();
  }, [request, reload]);

  async function handleSubmit(event) {
    event.preventDefault();
    var body = {
      variety: variedade,
      species: especie,
      altitude: parseInt(altitude.value),
      process: processo.value,
      harvest: parseInt(safra.value),
      harvestValue: parseInt(valor.value),
    };
    if(especial) {
      body['special'] = {
        aroma: aroma.value,
        flavor: sabor.value,
        completion: finalizacao.value,
        acidity: acidez.value,
        body: corpo.value,
        sweetness: docura.value
      }
    }
    coffeeCreate(data.data.id, body);
    setReload("A")
    handleClose()
  }

  function clearInputs(){
    setVariedade("")
    setEspecie("")
    setEspecie("")
    setEspecie("")
    setEspecie("")
    altitude.setValue()
    processo.setValue("") 
    safra.setValue("")
    valor.setValue("")
    setEspecial(false)
    aroma.setValue(null)
    sabor.setValue(null)
    finalizacao.setValue(null)
    acidez.setValue(null)
    corpo.setValue(null)
    docura.setValue(null)
  }
  
  return (
    <div className={`bgGray center`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className="title">Café</h1>
        </div>
        <div className="container-scroll list-grid" style={{ margin: ' 0px auto'}}>
          {data.data.coffee.map((cafes) => (
            <Card especie={cafes} variedade={cafes.variety} {...cafes} />
          ))}
        </div>

        <Modal className="modalAdesivo" show={show} onHide={handleClose} animation={false} centered>
          <Modal.Header>
            <Modal.Title style={{fontWeight: 'bold', color: "#4f4e4e"}}>Adicionar Café</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!especial ? 
              <CafeCont variedade={variedade} setVariedade={setVariedade} variedades={variedades} especie={especie} setEspecie={setEspecie} arrRobusta={arrRobusta} arrArabica={arrArabica} altitude={altitude} processo={processo} safra={safra} valor={valor} setEspecial={setEspecial}  />
            : 
              <Especial aroma={aroma} sabor={sabor} finalizacao={finalizacao} acidez={acidez} corpo={corpo} docura={docura}  />
            }
          </Modal.Body>
          <Modal.Footer style={{justifyContent: "center"}}>
            {especial &&
              <ButtonAcc 
                style={{width: '80px', height: '35px', fontWeight: 'normal', padding: '0', background: 'transparent', border: '1px solid #C2C2C2', color: '#8C8C8C'}}
                onClick={especialClose}
              >
                Voltar
              </ButtonAcc>
            }
            <ButtonAcc 
              style={{width: '80px', height: '35px', fontWeight: 'normal', padding: '0'}}
              onClick={handleSubmit}
            >
              Salvar
            </ButtonAcc>
          </Modal.Footer>
        </Modal>

        <ButtonSalvar style={{width: '130px', marginTop: '35px'}}  onClick={handleShow}> Adicionar café</ButtonSalvar>
      </div>
    </div>
  )
}

export default Cafe
