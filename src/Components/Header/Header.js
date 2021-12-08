import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../Assets/logo_white.svg';
import { UserContext } from '../../Context/UserContext';
import useMedia from '../../Hooks/useMedia';

function Header() {
  
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { login, userLogout } = React.useContext(UserContext);
  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);


  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Logo />

        {mobile && (
          <button
            aria-label="Menu"
            className={`${styles.mobileButton} ${
              mobileMenu && styles.mobileButtonActive
            }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          ></button>
        )}

        {mobileMenu && mobile ? (
            <div className={styles.mobileMenu}>
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
                <>
                  <Link to="/login">
                    Entrar
                  </Link>
                  <Link to="/cadastro">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          ) : (
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
          )}
      </nav>
    </header>
  );
}

export default Header;
