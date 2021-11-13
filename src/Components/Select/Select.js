import { React } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from './Select.module.css';
import { Input } from '../Form/Input/Input';

const Select = ({ onlyView, type, setType, options, def }) => {
  return (
    <Form.Group controlId="formBasicSelect" >
      {
        onlyView
          ?
          <Input type="text" value={type} />
          :
          <Form.Control
            className={styles.formControl}
            as="select"
            value={type}
            disabled={onlyView}
            onChange={e => {
              setType(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>{def}</option>
            {options.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </Form.Control>
      }
    </Form.Group>
  );
};

export default Select

const SelectCafe = ({ onlyView, type, setType, options, def, label, name }) => {
  return (
    <Form.Group>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {
        onlyView
          ?
          <Input type="text" value={type} />
          :
          <Form.Control
            id={name}
            name={name}
            className={styles.select}
            as="select"
            value={type}
            disabled={onlyView}
            onChange={e => {
              setType(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>{def}</option>
            {options.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </Form.Control>
      }
    </Form.Group>
  );
};

export {
  Select,
  SelectCafe
}
