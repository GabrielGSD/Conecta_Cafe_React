import React from 'react';
import styles from '../Accounts.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form} from "react-bootstrap";
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';
import Error from '../../Helper/Error';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../Context/UserContext';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../Assets/logo_white.svg';

function Cadastro() {

  const name = useForm();
  const email = useForm("email");
  const senha = useForm("password");
  
  const loading = false;

  // const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && senha.validate()) {
      console.log(email.value, senha.value)
      // userLogin(email.value, senha.value);
    }
  }

  return (
    <div className="bgBlack">
      <div className={styles.teste}>
        <div className="center" style={{padding: '50px'}}>
          <Logo className={styles.logo} />
        </div>

        <div className={styles.box}>
          <div className="center">
            <h1 className="title">Cadastro</h1>
          </div>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Input label="Nome" type="text" name="name" {...name} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Input label="Email" type="text" name="email" {...email} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Input label="Senha" type="password" name="senha" {...senha} />
            </Form.Group>
            {loading ? (
              <Button disabled>Carregando...</Button>
            ) : (
              <Button>Entrar</Button>
            )}
            {/* <Error error={error} /> */}
          </Form>
          <p className="mt-4 mb-5" >Já possui uma conta? 
            <Link to="/login" style={{marginLeft: '5px'}}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro
