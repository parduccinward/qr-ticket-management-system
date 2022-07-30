import {React, useState} from 'react'
import axios from "../api/axios"
import {useNavigate, useParams} from "react-router-dom";
import "./ClientForm.css";

const ClientForm = () => {

    const {id} = useParams();
    let navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [client, setClient] = useState({
        name:"",
        last_name:"",
        phone:"",
        gender:"",
        payment_url:"",
        instagram:"",
    })

    const {name, last_name, phone, gender, instagram} = client;
    const onInputChange = e =>{
        setClient({...client, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", client.name);
        formData.append("last_name", client.last_name);
        formData.append("phone", client.phone);
        formData.append("gender", client.gender);
        formData.append("payment_url", selectedFile);
        formData.append("instagram", client.instagram);
        console.log(formData);
        await axios.post(`/api/clients/${id}`,formData).then((res) => {
            alert("File Upload success");
          })
          .catch((err) => alert("File Upload Error"));
        navigate("/");
    }
  return (
    <div className="form-layout">
        <div className="client-form-container">
            <div className="client-form-image"></div>
            <div className="client-form-registration">
                <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
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
                            <option defaultValue={gender}>Hombre</option>
                            <option defaultValue={gender}>Mujer</option>
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
                                name="payment_url"
                                value={undefined}
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                required/>
                            <span>Subir captura de pago*</span>
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