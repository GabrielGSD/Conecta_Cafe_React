import iconImagess from '../../../../../Assets/ion_images.png'
import styles from './DropZone.module.css'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useDropzone } from 'react-dropzone'
import { storage } from './Firebase'


const DropZone = observer(props => {
    const iconImages = { src: iconImagess, title: "icon" }
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        console.log(image)
        if (image.name != null) {
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
                            console.log(url)
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
                console.log("Here")
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