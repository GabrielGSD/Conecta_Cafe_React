import React from 'react';
import styles from './Cafe.module.css';
import { UserContext } from '../../../Context/UserContext';
import { ButtonSalvar } from '../../Button/Button';
import { ReactComponent as QRCode } from '../../../Assets/QRCode.svg';
import { ReactComponent as Edit } from '../../../Assets/Edit.svg';
import { ReactComponent as Delet } from '../../../Assets/Del.svg';
import { style } from 'dom-helpers';

function Cafe() {

  const { data } = React.useContext(UserContext);

  return (
    <div className={`bgGray center`}>
      <div className="boxContainer">
        <div className="center">
          <h1 className="title">Café</h1>
        </div>
        <div className="container-scroll list-grid" style={{ margin: ' 0px auto'}}>
          <div className={styles.card}>
            <h1 className={styles.especie}>Arábica</h1>
            <h1 className={styles.variedade}>Catuaí vermelho</h1>
            <div className={styles.btnGroup}>
              <div className={styles.btnCircle}>
                <QRCode />
              </div>
              <div className={styles.btnCircle}>
                <Edit />
              </div>
              <div className={styles.btnCircle}>
                <Delet />
              </div>
            </div>
          </div>
        </div>
        <ButtonSalvar style={{width: '130px', marginTop: '35px'}}> Adicionar café</ButtonSalvar>
      </div>
    </div>
  )
}

export default Cafe
