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
    const { onlyView } = props

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

    useEffect(() => {
        async function fetchGrower() {
            const { url, options } = COFFEES_GET(data.data.id);
            const { response, json } = await request(url, options);
            getFarm(data.data.id)
            setReload("")
        }
        fetchGrower()
        fillInputs()
    }, [show, reload]);

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
        coffeeEdit(data.data.coffee[0].id, body);
        setReload("A")
    }
        handleClose()
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
        setVariedade(data.data.coffee[0].variety)
        setEspecie(data.data.coffee[0].species)
        altitude.setValue(data.data.coffee[0].altitude)
        processo.setValue(data.data.coffee[0].process)
        safra.setValue(data.data.coffee[0].harvest)
        valor.setValue(data.data.coffee[0].harvestValue)
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