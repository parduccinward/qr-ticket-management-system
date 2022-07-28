import {React, useState} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import "./pages.css";


const AddClient = () => {
    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [client, setClient] = useState({
        name:"",
        last_name:"",
        phone:"",
        gender:"",
        payment_url:"",
        instagram:"",
        party_id:"",
        salesperson_id:""
    })

    const {name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id} = client;
    const onInputChange = e =>{
        setClient({...client, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.post("/api/clients",client);
        navigate("/clients");
    }

    return(
        <>
        <div className="layout-container">
        <Navbar/>
        <div className="content-container">
            
            <div className="add-client-container">
                <h2 className="text-center mb-4">Agregar Cliente</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="salesperson_name">Nombre de Cliente</label>
                            <input
                                type="text"
                                id="salesperson_name"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                                required/>
                        </p>
                        <p>
                            <label htmlFor="last_name">Apellido</label>
                            <input
                                type="text"
                                id="last_name"
                                className="form-control"
                                name="last_name"
                                value={last_name}
                                onChange={e => onInputChange(e)}
                                required/>
                        </p>
                    </section>
                    <p>
                        <label htmlFor="phone">Telefono</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            name="phone"
                            value={phone}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="gender">Genero</label>
                        <input
                            type="text"
                            id="gender"
                            className="form-control"
                            name="gender"
                            value={gender}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="payment_url">URL de Pago</label>
                        <input
                            type="text"
                            id="payment_url"
                            className="form-control"
                            placeholder="shorturl.at/bnV79"
                            name="payment_url"
                            value={payment_url}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            type="text"
                            id="instagram"
                            className="form-control"
                            name="instagram"
                            value={instagram}
                            onChange={e => onInputChange(e)}
                            />
                    </p>
                    <p>
                        <label htmlFor="party_id">Fiesta</label>
                        <input
                            type="number"
                            id="party_id"
                            className="form-control"
                            name="party_id"
                            value={party_id}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="salesperson_id">Relacionador</label>
                        <input
                            type="number"
                            id="salesperson_id"
                            className="form-control"
                            name="salesperson_id"
                            value={salesperson_id}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <button className="btn btn-primary btn-block">Agregar Cliente</button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default AddClient;