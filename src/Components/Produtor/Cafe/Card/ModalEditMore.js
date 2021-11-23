import React, { useEffect } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { ButtonAcc } from '../../../Button/Button';
import { Modal, Button } from 'react-bootstrap';
import useForm from '../../../../Hooks/useForm';
import useFetch from '../../../../Hooks/useFetch';
import CafeCont from './../CafeCont/CafeCont';
import Especial from './../Especial/Especial';
import { COFFEES_GET } from '../../../../Api/api';
import { observer } from 'mobx-react';

const ModalEditMore = observer(props => {
    const { onlyView, cafe } = props

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

    const { data, coffeeEdit, getFarm } = React.useContext(UserContext)
    const { request } = useFetch()
    const [show, setShow] = React.useState(false)
    const [reload, setReload] = React.useState("")

    const handleClose = () => { clearInputs(); setShow(false) }
    const handleShow = () => { fillInputs(); setShow(true) }

    const especialClose = () => setEspecial(false);

    async function handleSubmit(event) {
        if (!onlyView){
        event.preventDefault();
        var body = {
            variety: variedade,
            species: especie,
            altitude: parseInt(altitude.value),
            process: processo.value,
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
        coffeeEdit(cafe.id, body);
        setReload("A")
    }
        handleClose()
        window.location.reload(true);
    }

    function clearInputs() {
        setVariedade("")
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

    function fillInputs() {
        setVariedade(cafe.variety)
        setEspecie(cafe.species)
        altitude.setValue(cafe.altitude)
        processo.setValue(cafe.process)
        safra.setValue(cafe.harvest)
        valor.setValue(cafe.harvestValue)
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
            <Button onClick={handleShow}> </Button>
            <Modal className="modal" show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header>
                    <Modal.Title style={{ fontWeight: 'bold', color: "#4f4e4e" }}>{onlyView ? "Dados do café" : "Editar Café"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!especial ?
                        <CafeCont onlyView={onlyView} variedade={variedade} setVariedade={setVariedade} variedades={variedades} especie={especie} setEspecie={setEspecie} arrRobusta={arrRobusta} arrArabica={arrArabica} altitude={altitude} processo={processo} safra={safra} valor={valor} setEspecial={setEspecial} />
                        :
                        <Especial onlyView={onlyView} aroma={aroma} sabor={sabor} finalizacao={finalizacao} acidez={acidez} corpo={corpo} docura={docura} />
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
                        {onlyView? "Fechar" : "Salvar"}
                    </ButtonAcc>
                </Modal.Footer>
            </Modal>
        </>
    )
})

export default ModalEditMore