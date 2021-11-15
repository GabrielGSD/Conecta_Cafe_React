import React, { useState } from 'react'
import QRcode from 'qrcode.react'
import { observer } from 'mobx-react';

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