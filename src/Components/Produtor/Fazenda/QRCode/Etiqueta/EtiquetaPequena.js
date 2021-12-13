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
        var cafe = this.props.cafe

        return (
            <>
                <div className={styles.body} style={{ color: color, backgroundColor: backgroundColor, borderColor: color}}>
                    <div>
                        <Logo id={`logopequena${cafe.id}`} className={styles.logo} style={{ fill: color }} stroke={color} />
                    </div>

                    <div className={styles.qr}>
                        <RequestQrCode endpoint={endpoint} color={color} backgroundColor={backgroundColor} />
                    </div>

                    <div>
                        <h2 className={styles.text} style={{ color: color }}>Escaneie e saiba mais</h2>
                    </div>
                </div>
            </>
        )
    }
}

const EtiquetaPequena = props => {
    const { endpoint, color, backgroundColor, cafe } = props
    const componentRefP = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRefP.current,
    });

    return (
        <div>
            <ComponentToPrintHere ref={componentRefP} endpoint={endpoint} color={color} backgroundColor={backgroundColor} cafe={cafe}/>
            <ButtonSalvar style={{ backgroundColor: '#828D9F', margin: '100px 10px' }} onClick={handlePrint} >
                Download
            </ButtonSalvar>
        </div>
    );
};

export default EtiquetaPequena