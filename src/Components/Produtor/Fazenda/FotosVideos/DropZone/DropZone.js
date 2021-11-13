import iconImagess from '../../../../../Assets/ion_images.png'
import styles from './DropZone.module.css'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useDropzone } from 'react-dropzone'
import { storage } from './Firebase'


const DropZone = observer(({ urls_midia }) => {
    const iconImages = { src: iconImagess, title: "icon" }
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (url !== '') {
            console.log(typeof urls_midia)
            // urls_midia.push(url)
            console.log(urls_midia)
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

    return (
        <>
            <div className={styles.container}>
                <img className={styles.icon} src={iconImages.src} alt={''} />
                <div onChange={handleChange} {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className={styles.text}>Arraste ou Click para adicionar uma foto / vídeo</p>
                    <button className={styles.searchButton}>Buscar</button>
                </div>
            </div>
            <br />
            <br />
            <br />
        </>
    );
})

export default DropZone