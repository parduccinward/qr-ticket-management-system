import React, {useState} from 'react'
import "./Login.css";
import axios from "../api/axios";
import ModalQR from './ModalQR';

const ScanQR = () => {
  const[openModal, setOpenModal] = useState(false);
  const[clientData, setClientData] = useState("")
  const[decodedCode, setDecodedCode] = useState("");

  const copyToInput = async () =>{
    const decodedQR = await navigator.clipboard.readText();
    setDecodedCode(decodedQR);
  }

  const validateQR = async (e) => {
    try { 
      const response = await axios.post("/api/clients/validateQR",
        JSON.stringify({decodedCode}),
        {
            headers: { "Content-type": "application/json"},
            withCredentials: true
        }
        );
      setClientData(response.data);
      setOpenModal(true);
    } catch (err) {
      console.error(err.message)
      alert("Invalid QR!");
      setDecodedCode("");
    }
  }

  return (
    <>
    {openModal && <ModalQR closeModal={setOpenModal} clientData={clientData} />}
    <div className="login-center">
        <section className="login-container">
            <div className="decoded-qr-code">
              <h1>Validate QR Ticket</h1>
              <h5>Copy the code extracted from the QR:</h5>
              <input
                  type="text"
                  id="qr_code"
                  name="name"
                  value={decodedCode}
                  readonly="readOnly"
                  disabled/>
              <button className="btn btn-success"onClick={ () => copyToInput()}>Paste text</button>
            </div>
            <button id="validate-qr"className="btn btn-success" onClick={ () => validateQR()}>Validate Ticket</button>
      </section>
    </div>
    </>
  )
}
export default ScanQR;
