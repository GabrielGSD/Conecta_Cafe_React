import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import iconImagess from '../../../../Assets/ion_images.png'
import styles from './FotosVideos.module.css'
import stylesTitle from '../Fazenda.module.css'
import { useDropzone } from 'react-dropzone'
import { storage } from './DropZone/Firebase'
import { ReactComponent as Delet } from '../../../../Assets/Del.svg';
import { UserContext } from '../../../../Context/UserContext';



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
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        if (image) {
            const upload = storage.ref(`images/${image.name}`).put(image)

            upload.on(
                'state_changed',
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url)
                            // console.log(url)
                        })
                }
            )
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setTimeout(() => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })))
                handleUpload()
            }, 1000)
        }
    });

    const handleMidiaDelete = ((item) => {
        midias = midias.filter(value => value !== item)
        
        if (dataFarm.medias !== midias) {
            console.log("aqui")
            dataFarm.medias = midias
            farmEdit(dataFarm.id, dataFarm)
        }
    })

    return (
        <>
            <h1 className={stylesTitle.subTitle}>Fotos / Vídeos</h1>
            <div className="container-scroll list-grid" style={{ margin: ' 15px auto' }}>
                <div className={styles.container} style={{ margin: ' 0px auto' }}>
                    <img className={styles.icon} src={iconImages.src} alt={''} />
                    <div onChange={handleChange} {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className={styles.text}>Arraste ou Click para adicionar uma foto / vídeo</p>
                        <button className={styles.searchButton}>Buscar</button>
                    </div>
                </div>
                {
                    midias ?
                        <>
                            {
                                midias.map((item => (
                                    <div className={styles.card} key={item}>
                                        <img src={item} />
                                        <button className={styles.btn} onClick={() => { handleMidiaDelete(item) }}><Delet /></button>
                                        {/* <button><Delet /></button> */}
                                    </div>
                                )))
                            }
                        </>
                        :
                        <>
                        </>
                }
            </div>
            <br />
            <br />
            <br />
        </>
    );
})

export default FotosVideos
