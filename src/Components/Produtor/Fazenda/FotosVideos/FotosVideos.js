import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import iconImagess from '../../../../Assets/ion_images.png'
import styles from './FotosVideos.module.css'
import stylesTitle from '../Fazenda.module.css'
// import { useDropzone } from 'react-dropzone'
import { storage } from './DropZone/Firebase'
import { ReactComponent as Delet } from '../../../../Assets/Del.svg';
import { UserContext } from '../../../../Context/UserContext';
import { Modal, Col, Row } from 'react-bootstrap';
import Dropzone from 'react-dropzone'



const FotosVideos = observer(({ id, midia, midias, dataFarm }) => {
    const iconImages = { src: iconImagess, title: "icon" }
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)
    const { farmEdit } = React.useContext(UserContext);

    useEffect(() => {
        if (url !== "") {
            midia.setValue(url)
        }
    }, [url])

    const handleChange = e => {
        if (e !== undefined) {
            console.log(e)
            if (e.target.files[0]) {
                const upload = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0])
                upload.on('state_changed', snapshot => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgress(progress)
                },
                    error => { console.log(error) },
                    () => { storage.ref('images').child(e.target.files[0].name).getDownloadURL().then(url => { setUrl(url) }) }
                )
            }
        }
    }

    const handleChangeDrop = e => {
        if (e !== undefined) {
            const upload = storage.ref(`images/${e.name}`).put(e)
            upload.on('state_changed', snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            }, error => { console.log(error) },
                () => {
                    storage.ref('images').child(e.name).getDownloadURL().then(url => { setUrl(url) })
                }
            )
        }
    }


    const handleMidiaDelete = ((item) => {
        midias = midias.filter(value => value !== item)

        if (dataFarm.medias !== midias) {
            dataFarm.medias = midias
            farmEdit(dataFarm.id, dataFarm)
        }
    })

    return (
        <>
            <h1 className={stylesTitle.subTitle}>Fotos / Vídeos</h1>
            <Row>
                {
                    midias.length !== 0 ?
                        <>
                            <Col xs={4}>
                                <div className={styles.column}>
                                    <Dropzone onDrop={acceptedFiles => handleChangeDrop(acceptedFiles[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className={styles.container} style={{ marginLeft: '40%' }}>
                                                        <img className={styles.icon} src={iconImages.src} alt={''} />
                                                        <input {...getInputProps()} />
                                                        <p className={styles.text}>Arraste ou Click para adicionar uma foto / vídeo</p>
                                                        <button className={styles.searchButton}>Buscar</button>
                                                    </div>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                            </Col>
                            <Col xs={8}>
                                <div className="container-scroll list-grid" style={{ margin: ' 15px auto', maxHeight: '500px' }}>
                                    {
                                        midias.map((item => (
                                            <div className={styles.card} key={item}>
                                                <img src={item} />
                                                <button className={styles.btn} onClick={() => { handleMidiaDelete(item) }}><Delet /></button>
                                                {/* <button><Delet /></button> */}
                                            </div>
                                        )))
                                    }
                                </div>
                            </Col>
                        </>
                        :
                        <>
                            <div className="container-scroll list-grid" style={{ margin: '0px auto' }}>
                                <Col xs={12}>
                                    <div className={styles.column}>
                                        <Dropzone onDrop={acceptedFiles => handleChangeDrop(acceptedFiles[0])}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div className={styles.container} style={{ marginLeft: '11%' }}>
                                                            <img className={styles.icon} src={iconImages.src} alt={''} />
                                                            <input {...getInputProps()} />
                                                            <p className={styles.text}>Arraste ou Click para adicionar uma foto / vídeo</p>
                                                            <button className={styles.searchButton}>Buscar</button>
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                </Col>
                            </div>
                        </>
                }
            </Row>
        </>
    );
})

export default FotosVideos
