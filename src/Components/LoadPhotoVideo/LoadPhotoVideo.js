import styles from './LoadPhotoVideo.module.css';
import { useState } from 'react';
import { storage } from './Firebase'
import iconImagess from '../../Assets/ion_images.png';

const LoadPhotoVideo = () => {
    const iconImages = { src: iconImagess, title: "icon" }
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)


    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
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

    console.log("Image: " + image)

    return (
        <>
            <div className={styles.container}>
                <input type='file' onChange={handleChange}/>
                <button onClick={handleUpload}> Upload </button>
            </div>
        </>
    )
}

export default LoadPhotoVideo



// return (
//     <>
//         <div className={styles.container}>
//             <div className={styles.container1}>
//                 <label for='selecao-arquivo' onChange={handleChange}>
//                 <img className={styles.icon} src={iconImages.src} />
//                     Arraste ou Click para adicionar uma foto / vídeo
//                 </label>
//                 <input id='selecao-arquivo' type='file' />
//                 <br />
//                 <button className={styles.uploadButton} onClick={handheUpload}>Upload</button>
//                 <br />
//                 {/* <img scr={url || "http://via.placeholder.com/300x300"} alt="firebase-image" />
//                 <progress value={progress} max="100" /> */}
//             </div>
//         </div>
//     </>
// )