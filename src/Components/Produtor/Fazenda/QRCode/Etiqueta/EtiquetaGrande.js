import React, { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import styles from './EtiquetaGrande.module.css'
import RequestQrCode from "./GeneratedQrCode"
import { ReactComponent as Logo } from '../../../../../Assets/logo_black.svg'
import { ButtonSalvar } from '../../../../Button/Button';


class ComponentToPrint extends React.Component {
    render() {
        // {/* Inserir o endpoint da tela da fazenda na URL do QR code*/}

        var endpoint = this.props.endpoint ? this.props.endpoint : "Insira o endpoint aqui"
        var color = this.props.color ? this.props.color : '#0000ff';
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#ffffff';
        var cafe = this.props.cafe ? this.props.cafe : {};

        return (
            <div>
                <div className={styles.container}>
                    <table className={styles.table} style={
                        {
                            color: color,
                            backgroundColor: backgroundColor,
                            borderColor: color
                        }
                    }>
                        <table className={styles.table1} style={{ borderColor: color }}>
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
                        <table className={styles.table2} style={{ borderColor: color }}>
                            <tr>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Espécie:
                                        <br />
                                        {cafe.species}
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Variedade:
                                        <br />
                                        {cafe.variety}
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Altitude:
                                        <br />
                                        {cafe.altitude}
                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table2} style={{ borderColor: color }}>
                            <tr>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Processo:
                                        <br />
                                        {cafe.process}
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Safra:
                                        <br />
                                        {cafe.harvest}
                                    </div>
                                </th>
                                <th className={styles.larguraMedia}>
                                    <div>
                                        Valor da Safra:
                                        <br />
                                        R$ {cafe.harvestValue},00
                                    </div>
                                </th>
                            </tr>
                        </table>
                        <table className={styles.table3} style={{ borderColor: color }}>
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
                        <table className={styles.table3} style={{ borderColor: color }}>
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
                        <table className={styles.table3} style={{ borderColor: color }}>
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
                        <table className={styles.table3} style={{ borderColor: color }}>
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
                        <table className={styles.table4} cellspacing="" style={{ borderColor: color }}>
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
                        <table className={styles.table4} style={{ borderColor: color }}>
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
                        <Logo className={styles.logo}>
                            <svg>
                                <style>
                                    {`.logo > *{ fill: ${color}}`}
                                </style>
                            </svg>
                        </Logo>
                        <div className={styles.qrcode}>
                            <RequestQrCode endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
                        </div>
                    </table>
                </div>
            </div>
        );
    }
}

const EtiquetaGrande = props => {
    const { endpoint, color, backgroundColor, cafe } = props
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} endpoint={endpoint} color={color} backgroundColor={backgroundColor} cafe={cafe} />
            <ButtonSalvar style={{ backgroundColor: '#828D9F', margin: '50px 200px' }} onClick={handlePrint} >
                Download
            </ButtonSalvar>
        </div>
    );
};

export default EtiquetaGrande