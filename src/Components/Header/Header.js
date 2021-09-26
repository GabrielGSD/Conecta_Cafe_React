import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../Assets/logo_white.svg';

function Header() {

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Logo />
        <div className={styles.container}>
          <Link to="/">
            Home
          </Link>
          <Link to="/fazendas">
            Fazendas
          </Link>
          <div className={styles.auth}>
            <Link to="/login">
              Entrar
            </Link>
            <Link to="/cadastro">
              Cadastrar
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
