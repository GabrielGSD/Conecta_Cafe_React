import React from 'react'
import styles from './Alert.module.css';
import { ReactComponent as Check } from '../../Assets/Check.svg'
import { ReactComponent as Erro } from '../../Assets/Error.svg'

const Popup = ({type, msg}) => {
  return (
    (type === 'success') 
    ? 
    (
      <div className={`${styles.alert} ${styles.alertSuccess}`}>
        <Check />
        <p>
          {msg}
        </p>
      </div>
    )
    :
    (
      <div className={`${styles.alert} ${styles.alertError}`}>
        <Erro />
        <p>
          {msg}
        </p>
      </div>
    )
  );
};
export default Popup;
