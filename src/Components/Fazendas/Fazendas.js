import {React, useState} from 'react'
import styles from './Fazenda.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

function Fazendas() {
  const [torra, setTorra] = useState("");
  const torras = ['Clara', 'Média', 'Escura'];

  return (
    <div className={`bgGray center ${styles.header}`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className={styles.title}>Fazendas</h1>
        </div>
        <div>
        <Form.Group controlId="formBasicSelect">
          <Form.Control
            className={styles.formControl}
            as="select"
            value={torra}
            onChange={e => {
              console.log(e.target.value);
              setTorra(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>Torra</option>
            {torras.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </Form.Control>
        </Form.Group>
        </div>
      </div>
    </div>
  )
}

export default Fazendas
