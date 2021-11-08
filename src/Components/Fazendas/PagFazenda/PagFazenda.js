import styles  from './PagFazenda.module.css';
import React from 'react'
import { FARM_GET } from '../../../Api/api'; 

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
              <img className="d-block w-100 h-100" style={{objectFit: 'cover'}} src={photoSel} alt="Image One" />
              <div className={styles.btnGroup}>
                <h1 onClick={ handleNext }>Next</h1>
                <h1 onClick={ handleBack }>Back</h1>
              </div>
            </div>
            <div><h1>{fazenda.farm_name}</h1></div>
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
