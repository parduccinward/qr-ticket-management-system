import {React, useState} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import "./pages.css";


const AddSalesperson = () => {
    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [salesperson, setSalesperson] = useState({
        name:"",
        last_name:"",
        phone:"",
        email:"",
        party_id:"",
    })

    const {name, last_name, phone, email, party_id} = salesperson;
    const onInputChange = e =>{
        setSalesperson({...salesperson, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.post("/api/salespersons",salesperson);
        navigate("/salespersons");
    }

    return(
        <>
        <div className="layout-container">
        <Navbar/>
        <div className="content-container">
            
            <div className="add-salesperson-container">
                <h2 className="text-center mb-4">Agregar Relacionador</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="salesperson_name">Nombre de Relacionador</label>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={e => onInputChange(e)}
                            required/>
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
                    <button className="btn btn-primary btn-block">Agregar Relacionador</button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default AddSalesperson;