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

function Card(cafe, cafeID) {

  const handleClickEtiqueta = props => {
      return (
      <EtiquetaPersonalizada />
    )
  }

  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.especie}>{cafe.species}</h1>
        <h1 className={styles.variedade}>{cafe.variety}</h1>
        <div>
          <div className={styles.btnGroup}>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled" onClick={handleClickEtiqueta}>Etiqueta</Tooltip>}>
              <div className={styles.btnCircle}>
                <>
                  <Etiqueta />
                  <EtiquetaPersonalizada />
                </>
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
              <div className={styles.btnCircle}>
                <Edit />
                <ModalEditMore onlyView={false} />
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Excluir</Tooltip>}>
              <div className={styles.btnCircle}>
                <Delet />
                <Modalremove id={cafe.id}/>
              </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Ver mais</Tooltip>}>
              <div className={styles.btnCircle}>
                {/* <More onClick={() => { console.log(cafe) }} /> */}
                <More />
                <ModalEditMore onlyView={true} />
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
