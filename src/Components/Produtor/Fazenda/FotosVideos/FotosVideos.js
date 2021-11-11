import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import styles from './FotosVideos.module.css'
import DropZone from './DropZone/DropZone'

const FotosVideos = observer(PROPS => {

    return(
        <>
            <DropZone/>
        </>
    )
})

export default FotosVideos
