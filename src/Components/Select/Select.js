import {React} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const Select = ({ type, setType, options }) => {
  return (
    <Form.Group controlId="formBasicSelect">
      <Form.Control
        as="select"
        value={type}
        onChange={e => {
          console.log(options)
          setType(e.target.value);
        }}
      >
        <option value="Dictamen">Dictamen</option>
        <option value="A">A</option>
      </Form.Control> 
    </Form.Group>
  );
};

export default Select
