import React from 'react'
import styles from '../Cafe.module.css';
import { ReactComponent as QRCode } from '../../../../Assets/QRCode.svg';
import { ReactComponent as Edit } from '../../../../Assets/Edit.svg';
import { ReactComponent as Delet } from '../../../../Assets/Del.svg';
import {ReactComponent as ArrowIcon} from '../../../../Assets/Arrow.svg'

function Card({ especie, variedade }) {
  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.especie}>{ especie }</h1>
        <h1 className={styles.variedade}>{ variedade }</h1>
        <div>
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

          <div>
            <h2 className={`${styles.variedade} ${styles.animeTop}`} style={{fontSize: "1rem"}}>
              Ver mais 
              <ArrowIcon style={{fill: "#6C6B6B"}} />
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
