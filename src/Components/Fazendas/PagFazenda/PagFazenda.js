import styles  from './PagFazenda.module.css';
import React from 'react'
import { FARM_GET } from '../../../Api/api'; 
import { ReactComponent as ArrowIcon } from '../../../Assets/ArrowFaz.svg'
import { width } from 'dom-helpers';

function PagFazenda() {

  const [fazenda, setFazenda] = React.useState(null);
  const [teste, setTeste] = React.useState(null);
  const fotos = [
    'http://s2.glbimg.com/P6Nn4AXYPq-K1Xek4cCKyONYYyA=/e.glbimg.com/og/ed/f/original/2014/01/15/cafe.jpg', 
    'https://verticemt.com.br/wp-content/uploads/2020/09/lake-constance-sheep-pasture-sheep-blue-158179.jpeg"',
  ];
  let photoIndex = 0;
  const [photoSel, setPhotoSel] = React.useState(fotos[0]);

  const handleNext = () => { (photoIndex < fotos.length - 1) && photoIndex++; setPhotoSel(fotos[photoIndex]) };
  const handleBack = () => { (photoIndex > 0) && photoIndex--; setPhotoSel(fotos[photoIndex]) };
  
  function getId() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    return id
  }
  
  React.useEffect(() => {
    async function fetchFarm() {
      const { url, options } = FARM_GET(getId());
      const response = await fetch(url, options);
      const json = await response.json();
      setFazenda(json.data)
    }
    fetchFarm();
  }, []);


  return (
    <>
      { fazenda && (
        <div style={{overflow: "hidden"}} >
          <section className={styles.blackbg}>
            <div className={styles.carousel}>
              <img className="d-block w-100 h-100" style={{objectFit: 'cover'}} src={photoSel} alt="Imagem da fazenda" />
              <div className={styles.btnGroup}>
                <a className={styles.btnCarousel} onClick={ handleBack }>
                  <ArrowIcon/>
                </a>
                <a className={styles.btnCarousel} onClick={ handleNext }>
                  <ArrowIcon style={{transform: 'rotate(-90deg)'}}/>
                </a>
              </div>
            </div>
            <div className={styles.infos}>
              <h1 className={styles.nomeFaz}>{fazenda.farm_name}</h1>
              <p className={styles.infosFaz}><b>Produtor:</b> {fazenda.farm_name}</p>
              {fazenda.address 
                ? <p className={styles.infosFaz}><b>Cidade:</b> {fazenda.address.city} - {fazenda.address.uf}</p>
                : <p className={styles.infosFaz}><b>Cidade:</b> Ouro Fino - MG </p>
              }
              <p className={styles.infosFaz}><b>História:</b> {fazenda.history}</p>
              <div className={styles.boxInfoGroup}>
                <p className={`${styles.infosFaz} ${styles.boxInfo}`}>
                  <b>Inseticida: </b><br />
                  {fazenda.insecticides}
                </p>
                <p className={`${styles.infosFaz} ${styles.boxInfo}`}>
                  <b>Fertilizante: </b><br />
                  {fazenda.fertilizers}
                </p>
              </div>
              <ArrowIcon className={styles.arrowDown}/>
            </div>
          </section>

          <section className={styles.cafe}>
            <h1>Café</h1>
            <div><h1>{fazenda.farm_name}</h1></div>
          </section>
        </div>
      )}
    </>
  )
}

export default PagFazenda
