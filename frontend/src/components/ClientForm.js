import {React, useState} from 'react'
import axios from "../api/axios"
import {useNavigate, useParams} from "react-router-dom";
import "./ClientForm.css";

const ClientForm = () => {

    const {id} = useParams();
    let navigate = useNavigate();
    const [client, setClient] = useState({
        name:"",
        last_name:"",
        phone:"",
        gender:"",
        payment_url:"",
        instagram:"",
    })

    const {name, last_name, phone, gender, payment_url, instagram} = client;
    const onInputChange = e =>{
        setClient({...client, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        console.log(client);
        await axios.post(`/api/clients/${id}`,client);
        navigate("/");
    }
  return (
    <div className="form-layout">
        <div className="client-form-container">
            <div className="client-form-image"></div>
            <div className="client-form-registration">
                <form onSubmit={e => onSubmit(e)}>
                    <h2 className="client-form-title">Registro Inti Raymi</h2>
                    <p>
                        <input
                            type="text"
                            id="salesperson_name"
                            className="client-form-input"
                            placeholder="Nombre*"
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="last_name"
                            className="client-form-input"
                            placeholder="Apellido*"
                            name="last_name"
                            value={last_name}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="phone"
                            className="client-form-input"
                            placeholder="Telefono*"
                            name="phone"
                            value={phone}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="instagram"
                            className="client-form-input"
                            placeholder="Instagram"
                            name="instagram"
                            value={instagram}
                            onChange={e => onInputChange(e)}
                            />
                    </p>
                    <div className="form-last-line">
                        <select name="gender" id="gender" onChange={e => onInputChange(e)}required>
                            <option defaultValue="" disabled selected>Genero*</option>
                            <option defaultValue={gender}>Masculino</option>
                            <option defaultValue={gender}>Femenino</option>
                            <option defaultValue={gender}>No binario</option>
                            <option defaultValue={gender}>Transgénero</option>
                            <option defaultValue={gender}>Intersexual</option>
                            <option defaultValue={gender}>Prefiero no decirlo</option>
                        </select>
                        <p className="payment-container">
                        <label className="myLabel">
                            <input
                                type="file"
                                id="payment_url"
                                className="client-form-input"
                                placeholder="Captura de pago*"
                                name="payment_url"
                                value={payment_url}
                                onChange={e => onInputChange(e)}
                                required/>
                            <span>Subir captura de pago</span>
                        </label>
                        </p>
                    </div>
                <button className="form-button">Enviar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ClientForm