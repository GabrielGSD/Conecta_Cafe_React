import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../Assets/logo_white.svg';
import { UserContext } from '../../Context/UserContext';

function Header() {

  const { login, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Logo />
        
        <p style={{ color: '#f31', margin: '1rem 0' }}> {login} </p>
        <div className={styles.container}>
          <Link to="/">
            Home
          </Link>
          <Link to="/fazendas">
            {login ? ( "Outras Fazendas" ) : ("Fazendas")}
          </Link>

          {login ? (
            <>
              <Link to="/conta/fazenda" style={{borderLeft: ' 1.5px solid #fff', paddingLeft: '25px'}}>
                Fazenda
              </Link>
              <Link to="/conta/cafe">
                Café
              </Link>
              <div className={styles.auth} style={{paddingLeft: '15px'}}>
                <Link to="/login" onClick={userLogout}>
                  SAIR
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.auth}>
              <Link to="/login">
                Entrar
              </Link>
              <Link to="/cadastro">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
