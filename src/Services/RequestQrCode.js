import React, { useState } from 'react'
import QRcode from 'qrcode.react'

function QRgenerator() {
    const [qr] = useState('link para carregar a fazenda aqui!');
    
    return (
      <div>
                {
                    qr ?
                    <QRcode 
                        id="myqr"
                        value={qr} 
                        size={100}
                        includeMargin={false}
                        bgColor={"#ffdcb5"}
                    /> :
                    <p>No QR code preview</p>
                }
      </div>
    );
  }
  
  export default QRgenerator;