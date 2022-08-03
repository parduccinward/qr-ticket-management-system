import React from 'react'
import "./Modal.css";
import {QRCodeSVG} from 'qrcode.react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Modal({closeModal, clientId}) {

    const axiosPrivate = useAxiosPrivate();
    const onClick = async () =>{
        const response = await axiosPrivate.get(`/api/clients/qr/${clientId.qr_code}`,{ responseType: 'blob' });
        if (response.data.error) {
            console.error(response.data.error)
        }
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        const fileName = response.headers['content-disposition'].substring(22, 52);
        fileLink.setAttribute('download', fileName);
        fileLink.setAttribute('target', '_blank');
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
        closeModal(false)
    }

  return (
    <div className="modal-background">
        <div className="modal-container">
            <div className="title-close-btn">
                <button onClick={ () => closeModal(false)}> X </button>
            </div>
            <div className="title">
                <h1>Codigo QR de {clientId.name}</h1>
            </div>
            <div className="body">
                <QRCodeSVG value={clientId.qr_code} />
            </div>
            <div className="footer">
                <button onClick={() => onClick()}>Descargar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal