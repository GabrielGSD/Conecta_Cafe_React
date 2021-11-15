import React, { Icon } from "react";
import QRCode from "qrcode.react";
import { ButtonSalvar } from '../../../../Button/Button';

function QRCodeFazenda({ nome, endpoint, size }) {

  const qrRef = React.useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();

    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `QRcode_${nome.value}_.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrCode = (
    <QRCode
      size={size}
      value={endpoint || "Aqui"}
      bgColor="white"
      fgColor="black"
    />
  );

  return (
    <>
      <div ref={qrRef}>
        {qrCode}
      </div>

      <br />

      <ButtonSalvar style={{ backgroundColor: '#828D9F', margin: '0 40px' }} onClick={downloadQRCode} >
        Download
      </ButtonSalvar>
    </>
  )
}

export default QRCodeFazenda