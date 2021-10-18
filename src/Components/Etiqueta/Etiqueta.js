import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from './Etiqueta.module.css';
// import logo from '../../Assets/logo_white.svg'
import API from '../../Services/Api.js';
import RequestQrCode from "../../Services/RequestQrCode";


// const photo = { src: logo, title: "Teste" }
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
        dataFarm()
        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <tr className={styles.tableBorder}>
                        <th>
                            <div>
                            <img className={styles.a} />
                            </div>
                            <br />
                            <div className={styles.regionCoffee}>
                                {localStorage.getItem('farm_name')}
                                <br />
                                {localStorage.getItem('farm_city')} - {localStorage.getItem('farm_uf')}
                            </div>
                        </th>
                        <th className={styles.tableBorder}>
                            <div className={styles.typeCoffee}>
                                <ul>
                                    Variedade: {localStorage.getItem('farm_variety')}
                                    <br />
                                    Secagem: {localStorage.getItem('farm_process')}
                                    <br />
                                    Altitude: {localStorage.getItem('farm_altitude')}
                                    <br />
                                    Safra: {localStorage.getItem('farm_harvest')}
                                </ul>
                            </div>
                            <div>
                                {
                                    localStorage.getItem('farm_special') ?
                                    <div className={styles.specialCoffee}>
                                            Corpo:
                                            <br />
                                            Doçura:
                                            <br />
                                            Acidez:
                                            <br />
                                        </div>
                                        :
                                        null
                                    }
                            </div>
                        </th>
                        <th className={styles.tableBorder}>
                            {/* <div className={styles.contact}>
                                Telefone: {localStorage.getItem('farm_contact')}
                                <br />
                                Email: {localStorage.getItem('farm_contact_email')}
                            </div> */}

                            {/* Inserir o endpoint da tela da fazenda na URL do QR code*/}
                            <RequestQrCode />
                            {/* <img className={styles.qrCodeCoffee} src={localStorage.getItem('qr_code')} alt={""} /> */}
                        </th>
                    </tr>
                </table>



            </div>
        );
    }
}

const Etiqueta = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} />
            <button className={styles.saveButton} onClick={handlePrint}>Baixar Etiqueta</button>
        </div>
    );
};

export default Etiqueta