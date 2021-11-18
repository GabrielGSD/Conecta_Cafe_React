import styles from './PagFazenda.module.css';
import React from 'react'
import { FARM_GET } from '../../../Api/api';
import { ReactComponent as ArrowIcon } from '../../../Assets/ArrowFaz.svg'
import { Col, Row } from 'react-bootstrap';
import { ReactComponent as EmailIcon } from '../../../Assets/emailIcon.svg'
import { ReactComponent as FacebookIcon } from '../../../Assets/facebookIcon.svg'
import { ReactComponent as InstagramIcon } from '../../../Assets/instagramIcon.svg'
import { ReactComponent as LinkedinIcon } from '../../../Assets/linkedinIcon.svg'
import { ReactComponent as PhoneIcon } from '../../../Assets/phoneIcon.svg'
import { ReactComponent as TwitterIcon } from '../../../Assets/twitterIcon.svg'
import { ReactComponent as YoutubeIcon } from '../../../Assets/youtubeIcon.svg'
import { ReactComponent as WppIcon } from '../../../Assets/wppIcon.svg'
import Localizacao from '../../Produtor/Fazenda/Localizacao/Localizacao';

function PagFazenda() {

  React.useEffect(() => {
    async function fetchFarm() {
      const { url, options } = FARM_GET(getId());
      const response = await fetch(url, options);
      const json = await response.json();
      setFazenda(json.data)
      setCoffeeSel(json.data.coffee)
      // console.log(json.data)
    }
    fetchFarm();
  }, []);

  const [fazenda, setFazenda] = React.useState(null);
  const fotos = [
    'http://s2.glbimg.com/P6Nn4AXYPq-K1Xek4cCKyONYYyA=/e.glbimg.com/og/ed/f/original/2014/01/15/cafe.jpg',
    'https://verticemt.com.br/wp-content/uploads/2020/09/lake-constance-sheep-pasture-sheep-blue-158179.jpeg"',
  ];
  let photoIndex = 0;
  const [photoSel, setPhotoSel] = React.useState(fotos[0]);

  const handleNext = () => { (photoIndex < fotos.length - 1) && photoIndex++; setPhotoSel(fotos[photoIndex]); };
  const handleBack = () => { (photoIndex > 0) && photoIndex--; setPhotoSel(fotos[photoIndex]) };

  let cafeIndex = 0;
  const [coffeeSel, setCoffeeSel] = React.useState(null);
  const handlCoffeeeBack = () => { (cafeIndex < fazenda.coffee.length - 1) && cafeIndex++; setCoffeeSel(fazenda.coffee[cafeIndex]); console.log(cafeIndex) };
  const handleCoffeeNext = () => { (cafeIndex > 0) && cafeIndex--; setCoffeeSel(fazenda.coffee[cafeIndex]); console.log(cafeIndex) };

  function getId() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    return id
  }

  return (
    <>
      {fazenda && (
        <div style={{ overflow: "hidden" }} >
          <section className={styles.blackbg}>
            <div className={styles.carousel}>
              <img className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={photoSel} alt="Imagem da fazenda" />
              <div className={styles.btnGroup}>
                <a className={styles.btnCarousel} onClick={handleBack}>
                  <ArrowIcon />
                </a>
                <a className={styles.btnCarousel} onClick={handleNext}>
                  <ArrowIcon style={{ transform: 'rotate(-90deg)' }} />
                </a>
              </div>
            </div>
            <div className={styles.infos}>
              <h1 className={styles.nomeFaz}>{fazenda.farm_name}</h1>
              <p className={styles.infosFaz}><b>Produtor:</b> {fazenda.coffeeGrower.name}</p>
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
              <ArrowIcon className={styles.arrowDown} />
            </div>
          </section>

          <section className={styles.cafeSection}>
            <Row style={{ minHeight: '70vh' }}>
              <Col sm={4} className={`${styles.cafeBg}`} >
                <h1
                  className="title"
                  style={{ fontSize: 'calc(3.5rem + 1.5vw)', display: 'inline-block', maxHeight: 'calc(3.8rem + 1.5vw)', marginTop: '-8vh' }}
                >
                  Café
                </h1>
              </Col>

              <Col sm={8} className={styles.carouselCafe}>

                <a className={styles.btnCarouselCafe} style={{ left: 'calc(3.5vw + 10px)' }} onClick={handlCoffeeeBack}>
                  <ArrowIcon />
                </a>
                <a className={styles.btnCarouselCafe} style={{ right: 'calc(3.5vw + 10px)' }} onClick={handleCoffeeNext}>
                  <ArrowIcon style={{ transform: 'rotate(-90deg)' }} />
                </a>

                {coffeeSel &&
                  <div style={{ minWidth: '80%' }}>
                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Espécie:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].species}</p></Col>
                    </Row>

                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Variedade:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].variety}</p></Col>
                    </Row>

                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Altitude:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].altitude}</p></Col>
                    </Row>

                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Processo:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].process}</p></Col>
                    </Row>

                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Safra:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].harvest}</p></Col>
                    </Row>

                    <Row className={styles.dadoCafe}>
                      <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Valor da safra:</b></p></Col>
                      <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].harvestValue}</p></Col>
                    </Row>

                    {coffeeSel.special && <>
                      <Row className={styles.dadoCafe}>
                        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Acidez:</b></p></Col>
                        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.acidity}</p></Col>
                      </Row>

                      <Row className={styles.dadoCafe}>
                        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Aroma:</b></p></Col>
                        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.aroma}</p></Col>
                      </Row>

                      <Row className={styles.dadoCafe}>
                        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Corpo:</b></p></Col>
                        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.body}</p></Col>
                      </Row>

                      <Row className={styles.dadoCafe}>
                        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Finalização:</b></p></Col>
                        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.completion}</p></Col>
                      </Row>

                      <Row className={styles.dadoCafe}>
                        <Col sm={3} xs={5}><p className={styles.infosCafe}><b>Sabor:</b></p></Col>
                        <Col sm={9} xs={7}><p className={styles.infosCafe}>{fazenda.coffee[cafeIndex].special.flavor}</p></Col>
                      </Row>
                    </>}
                  </div>
                }
              </Col>
            </Row>
          </section>

          <section>
            <Row className={styles.localSection}>
              <Col sm={7}>
                <br />
                <br />
                <br />
                <br />
                <Localizacao
                  street={fazenda.address.street}
                  streetNumber={fazenda.address.address_number}
                  district={fazenda.address.district}
                  city={fazenda.address.city}
                  uf={fazenda.address.uf}
                  country={fazenda.address.country}
                  onlyMaps={true} />
              </Col>
              <Col sm={5} className={`${styles.localBg}`} >
                <h1
                  className="title"
                  style={{ fontSize: 'calc(2.5rem + 1.5vw)', display: 'inline-block', maxHeight: 'calc(3.8rem + 1.5vw)', marginTop: '-8vh' }}
                >
                  Localização
                </h1>
              </Col>
            </Row>
          </section>

          <section>
            <Row className={`${styles.blackbg} `} style={{ height: '35vh', margin: '0' }} >
              <Col sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1
                  className="title"
                  style={{ fontSize: 'calc(2.5rem + 1.5vw)', display: 'inline-block', maxHeight: 'calc(3.8rem + 1.5vw)', margin: '0' }}
                >
                  Contato
                </h1>
              </Col>
              <Col sm={8} className={styles.contactGroup}>
                <div>
                  <a className={styles.contact} style={{ marginRight: '10px' }}><PhoneIcon />{fazenda.contact.phone}</a>

                  <a className={styles.contact} style={{ marginRight: '10px' }}><EmailIcon />{fazenda.contact.contact_email}</a>
                </div>

                <div>
                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://api.whatsapp.com/send?phone=55${fazenda.contact.whatsApp}`}
                  >
                    <WppIcon />
                  </a>

                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={fazenda.contact.facebook}
                  >
                    <FacebookIcon />
                  </a>

                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={fazenda.contact.instagram}
                  >
                    <InstagramIcon />
                  </a>

                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={fazenda.contact.twitter}
                  >
                    <TwitterIcon />
                  </a>

                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={fazenda.contact.linkedin}
                  >
                    <LinkedinIcon />
                  </a>

                  <a
                    className={styles.contact}
                    target="_blank"
                    rel="noreferrer"
                    href={fazenda.contact.youtube}
                  >
                    <YoutubeIcon />
                  </a>
                </div>
              </Col>
            </Row>
          </section>
        </div>
      )}
    </>
  )
}

export default PagFazenda
