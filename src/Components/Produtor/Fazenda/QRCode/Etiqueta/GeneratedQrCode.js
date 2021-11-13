import React, { useState, useRef } from 'react'
import { useReactToPrint } from "react-to-print"
import QRcode from 'qrcode.react'
import { observer } from 'mobx-react';
import styles from './EtiquetaGrande.module.css'

const QRgenerator = observer(props => {
  const { endpoint, color, backgroundColor, size } = props
  const [qr] = useState(endpoint);
  return (
    <div>
      {
        qr ?
          <QRcode
            id="myqr"
            value={qr}
            size={size ? size : 50}
            includeMargin={false}
            fgColor={color ? color : '#000'}
            bgColor={backgroundColor ? backgroundColor : '#fff'}
          />
          :
          <p><font size="1">QR code <br /> em anda- <br />mento</font></p>
      }
    </div>
  );
})

export default QRgenerator


class QRCodeToPrint extends React.Component {
  render() {

    var endpoint = this.props.endpoint
    var size = this.props.size


    return (
      <div>
        <QRcode
          id="myqr"
          value={endpoint}
          size={size ? size : 50}
          includeMargin={false}
          fgColor={'#000'}
          bgColor={'#fff'}
        />

      </div>
    )
  }
}

export const QRgeneratorDownload = props => {
  const { endpoint, size } = props
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <QRCodeToPrint ref={componentRef} endpoint={endpoint} size={size} />
      <button className={styles.saveButton} onClick={handlePrint} >Download</button>
    </div>
  );
};
