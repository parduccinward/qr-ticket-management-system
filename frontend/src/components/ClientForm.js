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
        ci:"",
        gender:"",
        payment_url:"",
        instagram:"",
    })

    const {name, last_name, phone, ci, gender, instagram} = client;
    const onInputChange = e =>{
        setClient({...client, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", client.name);
        formData.append("last_name", client.last_name);
        formData.append("phone", client.phone);
        formData.append("ci", client.ci);
        formData.append("gender", client.gender);
        formData.append("payment_url", selectedFile);
        formData.append("instagram", client.instagram);
        await axios.post(`/api/clients/${id}`,formData).then((res) => {
            alert("Image uploaded successfully!");
            navigate("/greetings");
          })
          .catch((err) => alert("Error uploading the image"));
    }
  return (
    <div className="form-layout">
        <div className="client-form-container">
            <div className="client-form-registration">
                <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
                    <h2 className="client-form-title">Register</h2>
                    <p>
                        <input
                            type="text"
                            id="salesperson_name"
                            className="client-form-input"
                            placeholder="Name*"
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
                            placeholder="Last Name*"
                            name="last_name"
                            value={last_name}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="ci"
                            className="client-form-input"
                            placeholder="DNI*"
                            name="ci"
                            value={ci}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="phone"
                            className="client-form-input"
                            placeholder="Phone*"
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
                            <option defaultValue="" disabled selected>Gender*</option>
                            <option defaultValue={gender}>Male</option>
                            <option defaultValue={gender}>Female</option>
                            <option defaultValue={gender}>Non-binary</option>
                            <option defaultValue={gender}>Transgender</option>
                            <option defaultValue={gender}>Intersex</option>
                            <option defaultValue={gender}>I prefer not to say</option>
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
                            <span>Upload Payment*</span>
                        </label>
                        </p>
                    </div>
                <button className="form-button">Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ClientForm