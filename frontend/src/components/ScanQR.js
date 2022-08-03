import React, {useState} from 'react'
import "./Login.css";
import axios from "../api/axios";

const ScanQR = () => {

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
      console.log(response)
      setDecodedCode("");
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
    <div className="login-center">
        <section className="login-container">
            <div className="decoded-qr-code">
              <h1>Validar Entrada QR</h1>
              <h5>Copia el codigo extraido del QR:</h5>
              <input
                  type="text"
                  id="qr_code"
                  name="name"
                  value={decodedCode}
                  readonly="readOnly"
                  disabled/>
              <button className="btn btn-success"onClick={ () => copyToInput()}>Pegar texto</button>
            </div>
            <button id="validate-qr"className="btn btn-success" onClick={ () => validateQR()}>Validar Entrada</button>
      </section>
    </div>
    </>
  )
}
export default ScanQR;
