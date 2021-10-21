import styles from './LoadPhotoVideo.module.css';
import { useState } from 'react';
import { storage } from './Firebase'

const LoadPhotoVideo = () => {
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handheUpload = () => {
        const upload = storage.ref(`images/${image.name}`).put(image)

        upload.on(
            'state  _changed',
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

    console.log("Image: " + image)

    return (
        <>
            <div className={styles.container}>
                Arraste ou Click para adicionar uma foto / vídeo
                <input className={styles.input} type='file' onChange={handleChange} />
                <div type='file' onChange={handleChange} />
                <br />
                {/* <button className={styles.saveButton}> </button> */}
                <button className={styles.saveButton} onClick={handheUpload}>Upload</button>
                <br />
                <img scr={url || "http://via.placeholder.com/100x120"} alt="firebase-image" />
                <progress value={progress} max="100" />
            </div>
        </>
    )
}

export default LoadPhotoVideo