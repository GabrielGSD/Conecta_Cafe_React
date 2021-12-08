import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from './EtiquetaPequena.module.css'
import { ReactComponent as Logo } from '../../../../../Assets/logo_black.svg';
import RequestQrCode from "./GeneratedQrCode";
import { ButtonSalvar } from '../../../../Button/Button';

class ComponentToPrintHere extends React.Component {
    render() {
        // {/* Inserir o endpoint da tela da fazenda na URL do QR code*/}

        var endpoint = this.props.endpoint ? this.props.endpoint : "Insira o endpoint aqui"
        var color = this.props.color ? this.props.color : '#0000ff';
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#ffffff';

        return (
            <>
                <div className={styles.body} style={{ color: backgroundColor, backgroundColor: color }}>
                    {/* <Logo className={styles.logo} styles={{ fill: `${color} !important` }} /> */}
                    <div>
                        <Logo className={styles.logo} style={{ fill: backgroundColor }} stroke={backgroundColor} />
                        {/* <Logo className={styles.logo} stroke={backgroundColor} fill={`>*{color: ${backgroundColor}`}> </Logo> */}
                    </div>

                    <div className={styles.qr}>
                        <RequestQrCode endpoint={endpoint} color={backgroundColor} backgroundColor={color} />
                    </div>

                    <div>
                        <h2 className={styles.text} style={{ color: backgroundColor }}>Escaneie e saiba mais</h2>
                    </div>
                </div>
            </>
        )
    }
}

const EtiquetaPequena = props => {
    const { endpoint, color, backgroundColor } = props
    const componentRefP = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRefP.current,
    });

    return (
        <div>
            <ComponentToPrintHere ref={componentRefP} endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
            <ButtonSalvar style={{ backgroundColor: '#828D9F', margin: '100px 10px' }} onClick={handlePrint} >
                Download
            </ButtonSalvar>
        </div>
    );
};

export default EtiquetaPequena