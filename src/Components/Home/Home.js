import React from 'react';
import styles from './Home.module.css';
import { ButtonAcc } from '../Button/Button'
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();

  function loadCadastro() {
    navigate('/cadastro');
  }

  return (
    <>
    <div className='bgBlack'>
      <div className={styles.coffeeBG}>
        <div className={styles.infoBanner}> 
          <h1 className={styles.title}>Sua nova maneira de comercializar café</h1>
          <p className={styles.desc}>Pela nossa plataforma, voce pode negociar sua produção, com transparência, agilidade e segurança que o mercado merece.</p>
          <ButtonAcc style={{width: '200px', marginTop: '150px'}} onClick={loadCadastro}> Conhecer Agora </ButtonAcc>
        </div>
        <div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
