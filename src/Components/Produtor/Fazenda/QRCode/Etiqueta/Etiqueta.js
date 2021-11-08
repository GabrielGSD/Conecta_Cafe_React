import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from './Etiqueta.module.css';
import API from '../../../../../Services/Api.js';
import RequestQrCode from "./GeneratedQrCode";
import { ReactComponent as Logo } from '../../../../../Assets/logo_black.svg';

const dataFarm = props => {

    API.get("/farm/c43ecfab-69f0-46bd-aa38-4af3796350cf")
        .then((response) => {
            localStorage.setItem('farm_name', response.data.data.farm_name);
            localStorage.setItem('farm_city', response.data.data.address.city);
            localStorage.setItem('farm_uf', response.data.data.address.uf);
            localStorage.setItem('farm_contact', response.data.data.contact.phone);
            localStorage.setItem('farm_contact_email', response.data.data.contact.contact_email);
            localStorage.setItem('farm_variety', response.data.data.coffee[0].variety);
            localStorage.setItem('farm_harvest', response.data.data.coffee[0].harvest);
            localStorage.setItem('farm_process', response.data.data.coffee[0].process);
            localStorage.setItem('farm_altitude', response.data.data.coffee[0].altitude);
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
}

class ComponentToPrint extends React.Component {
    render() {
        // dataFarm()
        // {/* Inserir o endpoint da tela da fazenda na URL do QR code*/}

        var endpoint = this.props.endpoint ? this.props.endpoint : "Insira o endpoint aqui"
        var color = this.props.color ? this.props.color : '#0000ff';
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#ffffff';

        return (
            <div>
                <div className={styles.container}>
                    <table className={styles.table} style={
                        {
                            color: color,
                            backgroundColor: backgroundColor
                        }
                    }>
                        <table className={styles.table1}>
                            <tr>
                                <th className={styles.larguraMaior}>
                                    <div className={styles.regionCoffee}>
                                        {localStorage.getItem('farm_name')}
                                        <br />
                                        {localStorage.getItem('farm_city')} - {localStorage.getItem('farm_uf')}
                                    </div>
                                </th>
                                <th >
                                    <div className={styles.produtor}>
                                        Produtor:
                                        <br />
                                        Gabriel de Souza Daniel
                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table2}>
                            <tr>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Espécie:
                                        <br />
                                        100% arábica
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Variedade:
                                        <br />
                                        Catuaí vermelho
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Altitude:
                                        <br />
                                        1200m
                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table2}>
                            <tr>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Processo:
                                        <br />
                                        Natural
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Safra:
                                        <br />
                                        2021
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Valor da Safra:
                                        <br />
                                        R$ 1.500,00
                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table3}>
                            <tr>
                                <th className={styles.larguraMenor1}>
                                    <div >
                                        Aroma:
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Intenso de frutas maduras

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table3}>
                            <tr>
                                <th className={styles.larguraMenor1}>
                                    <div >
                                        Sabor:
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Jaca, Banana, Cajá - manga e acidez de maracujá

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table3}>
                            <tr>
                                <th className={styles.larguraMenor1}>
                                    <div >
                                        Finalização:
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Longa, picante e muito doce

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table3}>
                            <tr>
                                <th className={styles.larguraMenor1}>
                                    <div >
                                        Acidez:
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Leve, cítrica prazerosa

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table4} cellspacing="">
                            <tr>
                                <th className={styles.larguraMenor2}>
                                    <div >
                                        Corpo:
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Extremamente alta

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table4}>
                            <tr>
                                <th className={styles.larguraMenor2}>
                                    <div >
                                        Licoroso
                                        <br />
                                    </div>
                                </th>
                                <th>
                                    <div >
                                        Extremamente alta

                                    </div>
                                </th>
                            </tr>
                        </table>
                        <Logo className={styles.logo} />
                        <div className={styles.qrcode}>
                            <RequestQrCode endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
                        </div>
                    </table>
                </div>
            </div>
        );
    }
}

const Etiqueta = props => {
    const { endpoint, color, backgroundColor } = props
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
            <button className={styles.saveButton} onClick={handlePrint} >Baixar Etiqueta</button>
        </div>
    );
};

export default Etiqueta