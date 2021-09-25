import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../Assets/usuario.svg';

function Header() {

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link to="/" aria-label="Conecta Café - Home">
          <Logo />
        </Link>
        <Link to="/fazendas">
          Fazendas
        </Link>
        <Link to="/login">
          Login
        </Link>
        <Link to="/cadastro">
          Cadastrar
        </Link>
      </nav>
    </header>
  );
}

export default Header;
