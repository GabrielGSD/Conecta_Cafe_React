import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { observer } from "mobx-react";
import styles from './EtiquetaPequena.module.css'
import { ReactComponent as Logo } from '../../../../../Assets/logo_black.svg';
import { Form } from "react-bootstrap";
import RequestQrCode from "./GeneratedQrCode";

class ComponentToPrintHere extends React.Component {
    render() {
        // {/* Inserir o endpoint da tela da fazenda na URL do QR code*/}

        var endpoint = this.props.endpoint ? this.props.endpoint : "Insira o endpoint aqui"
        var color = this.props.color ? this.props.color : '#0000ff';
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#ffffff';

        return (
            <>
                <div className={styles.body} style={{ color: backgroundColor, backgroundColor: color }}>
                    <Logo className={styles.logo} style={{ fill: color }} />
                    <div className={styles.qr}>
                        <RequestQrCode endpoint={endpoint} color={backgroundColor} backgroundColor={color} />
                    </div>
                    <Form.Label className={styles.text} style={{ color: `${backgroundColor} !important`, backgroundColor: color }}>Escaneie e saiba mais</Form.Label>
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
            <button className={styles.saveButton} onClick={handlePrint} >Download Litle</button>
        </div>
    );
};

export default EtiquetaPequena