import React from 'react'
import styles from '../Cafe.module.css';
import { ReactComponent as QRCode } from '../../../../Assets/QRCode.svg';
import { ReactComponent as Edit } from '../../../../Assets/Edit.svg';
import { ReactComponent as Delet } from '../../../../Assets/Del.svg';
import {ReactComponent as More} from '../../../../Assets/more.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Card({ especie, variedade }) {
  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.especie}>{ especie }</h1>
        <h1 className={styles.variedade}>{ variedade }</h1>
        <div>
          <div className={styles.btnGroup}>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">QRCode</Tooltip>}>
              <div className={styles.btnCircle}>
                <QRCode />
              </div>
            </OverlayTrigger>
            
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
              <div className={styles.btnCircle}>
                <Edit />
              </div>
            </OverlayTrigger>
            
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Excluir</Tooltip>}>
              <div className={styles.btnCircle}>
                <Delet />
              </div>
            </OverlayTrigger>
            
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Ver mais</Tooltip>}>
              <div className={styles.btnCircle}>
                <More />
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
