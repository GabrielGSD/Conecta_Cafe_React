import React from 'react'
import styles from '../Cafe.module.css';
import { ReactComponent as Etiqueta } from '../../../../Assets/Etiqueta.svg';
import { ReactComponent as Edit } from '../../../../Assets/Edit.svg';
import { ReactComponent as Delet } from '../../../../Assets/Del.svg';
import { ReactComponent as More } from '../../../../Assets/more.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import EtiquetaPersonalizada from '../../Fazenda/QRCode/EtiquetasPersonalizadas';
import ModalEditMore from './ModalEditMore';
import Modalremove from './ModalRemove';

function Card(cafe, fazenda) {

  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.especie}>{cafe.species}</h1>
        <h1 className={styles.variedade}>{cafe.variety}</h1>
        <div>
          <div className={styles.btnGroup}>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled" >Etiqueta</Tooltip>}>
              <div className={styles.btnCircle}>
                <>
                  <Etiqueta />
                  <Tooltip id="tooltip-disabled" >
                    <EtiquetaPersonalizada cafe={cafe} fazenda={fazenda}/>
                  </Tooltip>
                </>
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
              <div className={styles.btnCircle}>
                <>
                  <Edit />
                  <Tooltip id="tooltip-disabled" >
                    <ModalEditMore onlyView={false} />
                  </Tooltip>
                </>
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Excluir</Tooltip>}>
              <div className={styles.btnCircle}>
                <>
                  <Delet />
                  <Tooltip id="tooltip-disabled" >
                    <Modalremove cafe={cafe}/>
                  </Tooltip>
                </>
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Ver mais</Tooltip>}>
              <div className={styles.btnCircle}>
                <>
                  <More />
                  <Tooltip id="tooltip-disabled" >
                    <ModalEditMore onlyView={true} />
                  </Tooltip>
                </>
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
