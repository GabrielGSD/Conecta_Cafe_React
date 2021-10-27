import {React} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from './Select.module.css';

const Select = ({ type, setType, options, def }) => {
  return (
    <Form.Group controlId="formBasicSelect" >
      <Form.Control
        className={styles.formControl}
        as="select"
        value={type}
        onChange={e => {
          console.log(e.target.value);
          setType(e.target.value);
        }}
      >
        <option value="" disabled selected hidden>{def}</option>
        {options.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default Select

const SelectCafe = ({ type, setType, options, def, label, name }) => {
  return (
    <Form.Group controlId="formBasicSelect" >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Form.Control
        id={name}
        name={name}
        className={styles.select}
        as="select"
        value={type}
        onChange={e => {
          console.log(e.target.value);
          setType(e.target.value);
        }}
      >
        <option value="" disabled selected hidden>{def}</option>
        {options.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export {
  Select,
  SelectCafe
}
