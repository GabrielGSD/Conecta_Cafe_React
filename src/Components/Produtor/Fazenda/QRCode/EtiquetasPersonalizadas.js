import React, { useState } from 'react'
import Etiqueta from './Etiqueta/Etiqueta';
import { SketchPicker } from 'react-color'
import { Button } from 'react-bootstrap';
import { observer } from "mobx-react"

const EtiquetaPersonalizada = observer(props => {
    const { endpoint } = props
    const [qr] = useState(endpoint);
    const [color, setColor] = useState('#ff0000')

    const aux = props => {
        return (
            <>
                <SketchPicker
                    color={color}
                    onChangeComplete={(color) => { setColor(color.hex) }}
                />
            </>
        )
    }

    return (
        <>
            <div>
                <Button onClick={aux}> </Button>

                <SketchPicker
                    color={color}
                    onChangeComplete={(color) => { setColor(color.hex) }}
                />

                <div style={{
                    backgroundColor: color,
                    height: '50px',
                    width: '50px',
                    transition: 'ease all 500ms'
                }}>
                    Heloo!!!!
                </div>
                <Etiqueta color={color}/>
            </div>
        </>
    );
})

export default EtiquetaPersonalizada