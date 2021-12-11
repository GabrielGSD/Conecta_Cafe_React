import React, { useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { ButtonSalvar, ButtonAcc } from '../../Button/Button';
import { Modal, } from 'react-bootstrap';
import Card from './Card/Card';
import useForm from '../../../Hooks/useForm';
import CafeCont from './CafeCont/CafeCont';
import Especial from './Especial/Especial';

function Cafe() {

  const [variedade, setVariedade] = React.useState("");
  const [processo, setProcesso] = React.useState("");
  const variedades = ['Arábica ', 'Robusta (Conilon)'];
  const processos = ['Terreiro', 'Estufa', 'Terreiro suspenso', 'Secagem automática'];
  const [especie, setEspecie] = React.useState("");
  const arrRobusta = ["Conilon"];
  const arrArabica = ["Mundo Novo", "Bourbon", "Laurina", "Catuaí", "Acaiá", "Topázio", "Icatu", "Caturra"];
  const altitude = useForm("number");
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
  const [show, setShow] = React.useState(false);
  const [reload, setReload] = React.useState(0);

  const handleClose = () => { clearInputs(); setShow(false) }
  const handleShow = () => setShow(true);

  const especialClose = () => setEspecial(false);
  
  useEffect(() => {
    function fetchGrower() {
      if (data && reload>0) {
        getFarm(data.data.id)
      }
    }
    fetchGrower();
  }, [reload]);

  async function handleSubmit() {
    var body = {
      variety: variedade,
      species: especie,
      altitude: parseInt(altitude.value),
      process: processo,
      harvest: parseInt(safra.value),
      harvestValue: parseInt(valor.value),
    };
    if (especial) {
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
    console.log(reload)
    setReload(reload+1)
    console.log(reload)
    handleClose()
  }

  function clearInputs() {
    setVariedade("")
    setProcesso("")
    setEspecie("")
    altitude.setValue()
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

    <>
      {
        data ?

          <div className={`bgGray center`}>
            <div className="boxContainer">
              <div className="center">
                <h1 className="title">Café</h1>
              </div>
              <div className="container-scroll list-grid" style={{ margin: ' 0px auto' }}>
                {data.data.coffee.map((cafes) => (
                  <Card fazenda={data.data} id={cafes.id} especie={cafes} variedade={cafes.variety} processo={processo} key={cafes.id} {...cafes} />
                ))}
              </div>

              <Modal className="modal" show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header>
                  <Modal.Title style={{ fontWeight: 'bold', color: "#4f4e4e" }}>Adicionar Café</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {!especial ?
                    <CafeCont variedade={variedade} setVariedade={setVariedade} variedades={variedades} setProcesso={setProcesso} processos={processos} especie={especie} setEspecie={setEspecie} arrRobusta={arrRobusta} arrArabica={arrArabica} altitude={altitude} processo={processo} safra={safra} valor={valor} setEspecial={setEspecial} />
                    :
                    <Especial aroma={aroma} sabor={sabor} finalizacao={finalizacao} acidez={acidez} corpo={corpo} docura={docura} />
                  }
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                  {especial &&
                    <ButtonAcc
                      style={{ width: '80px', height: '35px', fontWeight: 'normal', padding: '0', background: 'transparent', border: '1px solid #C2C2C2', color: '#8C8C8C' }}
                      onClick={especialClose}
                    >
                      Voltar
                    </ButtonAcc>
                  }
                  <ButtonAcc
                    style={{ width: '80px', height: '35px', fontWeight: 'normal', padding: '0' }}
                    onClick={handleSubmit}
                  >
                    Salvar
                  </ButtonAcc>
                </Modal.Footer>
              </Modal>

              <ButtonSalvar style={{ width: '130px', marginTop: '35px' }} onClick={handleShow}> Adicionar café</ButtonSalvar>
            </div>
          </div>
          :
          <>
          </>
      }
    </>
  )
}

export default Cafe
