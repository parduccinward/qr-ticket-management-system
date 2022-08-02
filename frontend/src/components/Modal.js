import React from 'react'
import "./Modal.css";
import {QRCodeSVG} from 'qrcode.react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Modal({closeModal, clientId}) {

    const axiosPrivate = useAxiosPrivate();
    const onClick = async () =>{
        await axiosPrivate.get(`/api/clients/qr/${clientId.qr_code}`);
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
                <QRCodeSVG value={"http://localhost:3000/qr/"+clientId.qr_code} />
            </div>
            <div className="footer">
                <button onClick={() => onClick()}>Descargar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal