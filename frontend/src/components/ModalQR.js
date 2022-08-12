import React from 'react'
import "./Modal.css";
import * as dayjs from 'dayjs'

function ModalQR({closeModal, clientData}) {

  return (
    <div className="modal-background">
        <div className="modal-container">
            <div className="title-close-btn">
                <button onClick={ () => closeModal(false)}> X </button>
            </div>
            <div className="title">
                <h1>Client Data</h1>
            </div>
            <div className="body-client">
            <label htmlFor="first_name">Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={clientData.name}
                    readonly="readOnly"
                    disabled/>
            <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={clientData.last_name}
                    readonly="readOnly"
                    disabled/>
            <label htmlFor="ci">DNI:</label>
                <input
                    type="text"
                    id="ci"
                    name="ci"
                    value={clientData.ci}
                    readonly="readOnly"
                    disabled/>
            <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={clientData.phone}
                    readonly="readOnly"
                    disabled/>
            <label htmlFor="deposit_date">Registration date:</label>
                <input
                    type="text"
                    id="deposit_date"
                    name="deposit_date"
                    value={dayjs(clientData.created_at).format("DD/MMMM/YYYY hh:mm")}
                    readonly="readOnly"
                    disabled/>
            </div>
            <div className="footer">
                <button onClick={ () => closeModal(false)}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default ModalQR;