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
        var fazenda = this.props.fazenda ? this.props.fazenda : {};

        return (
            <>
                <div>
                    {cafe.special !== null ?
                        <div className={styles.container} style={{ color: color, backgroundColor: backgroundColor }}>
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
                                            <div className={styles.regionCoffee} style={{ color: color, backgroundColor: backgroundColor }}>
                                                {localStorage.getItem('farm_name')}
                                                <br />
                                                {localStorage.getItem('farm_city')} - {localStorage.getItem('farm_uf')}
                                            </div>
                                        </th>
                                        <th >
                                            <div className={styles.produtor} style={{ color: color, backgroundColor: backgroundColor }}>
                                                Produtor:
                                                <br />
                                                {fazenda.coffeeGrower.name}
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table2} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Espécie:
                                                <br />
                                                {cafe.species}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Variedade:
                                                <br />
                                                {cafe.variety}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
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
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Processo:
                                                <br />
                                                {cafe.process}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Safra:
                                                <br />
                                                {cafe.harvest}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
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
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Aroma:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.aroma}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table3} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMenor1}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Sabor:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.flavor}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table3} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMenor1}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Finalização:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.completion}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table3} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMenor1}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Acidez:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.acidity}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table4} cellspacing="" style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMenor2}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Corpo:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.body}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table4} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMenor2}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Doçura:
                                                <br />
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                {cafe.special.sweetness}

                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <Logo id={`logo${cafe.id}`} className={styles.logo} stroke={color}>
                                </Logo>
                                <div className={styles.qrcode}>
                                    <RequestQrCode endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
                                </div>

                            </table>
                        </div>
                        :
                        <div className={styles.container} style={{ color: color, backgroundColor: backgroundColor, height: '260px', marginTop: '75px', marginBlockEnd: '90px' }}>
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
                                            <div className={styles.regionCoffee} style={{ color: color, backgroundColor: backgroundColor }}>
                                                {localStorage.getItem('farm_name')}
                                                <br />
                                                {localStorage.getItem('farm_city')} - {localStorage.getItem('farm_uf')}
                                            </div>
                                        </th>
                                        <th >
                                            <div className={styles.produtor} style={{ color: color, backgroundColor: backgroundColor }}>
                                                <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                    Produtor:
                                                    <br />
                                                    {fazenda.coffeeGrower.name}
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table2} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Espécie:
                                                <br />
                                                {cafe.species}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Variedade:
                                                <br />
                                                {cafe.variety}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
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
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Processo:
                                                <br />
                                                {cafe.process}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Safra:
                                                <br />
                                                {cafe.harvest}
                                            </div>
                                        </th>
                                        <th className={styles.larguraMedia}>
                                            <div style={{ color: color, backgroundColor: backgroundColor }}>
                                                Valor da Safra:
                                                <br />
                                                R$ {cafe.harvestValue},00
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                                <table className={styles.table2} style={{ borderColor: color }}>
                                    <tr>
                                        <th className={styles.larguraMaior}>
                                            <Logo id={`logocomum${cafe.id}`} className={styles.logocomum} stroke={color} style={{ width: '80%' }} />
                                        </th>
                                        <th className={styles.larguraMaior}>
                                            <div className={styles.qrcodecomum}>
                                                <RequestQrCode endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                            </table>
                        </div>
                    }
                </div>

            </>
        );
    }
}

const EtiquetaGrande = props => {
    const { endpoint, color, backgroundColor, cafe, fazenda } = props
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} endpoint={endpoint} color={color} backgroundColor={backgroundColor} cafe={cafe} fazenda={fazenda} />
            <ButtonSalvar style={{ backgroundColor: '#828D9F', margin: '50px 200px' }} onClick={handlePrint} >
                Download
            </ButtonSalvar>
        </div>
    );
};

export default EtiquetaGrande