import React, { useState } from 'react'
import QRcode from 'qrcode.react'

const QRgenerator = props => {
  const { endpoint } = props
  const [qr] = useState(endpoint);

  return (
    <div>
      {
        qr ?
          <QRcode
            id="myqr"
            value={qr}
            size={50}
            includeMargin={false}
          // bgColor={"#ffdcb5"}
          /> :
          <p><font size="1">QR code <br /> em anda- <br />mento</font></p>
      }
    </div>
  );
}

export default QRgenerator