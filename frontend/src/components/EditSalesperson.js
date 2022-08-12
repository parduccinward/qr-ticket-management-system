import {React, useState, useEffect} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate, useParams} from "react-router-dom";
import "./pages.css";


const EditSalesperson = () => {
    let navigate = useNavigate();
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [salesperson, setSalesperson] = useState({
        name:"",
        last_name:"",
        phone:"",
        email:"",
        sale_url:"",
        party_id:"",
    })

    const {name, last_name, phone, email, sale_url} = salesperson;
    const onInputChange = e =>{
        setSalesperson({...salesperson, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        const loadSalesperson = async () =>{
            const result = await axiosPrivate.get(`/api/salespersons/${id}`);
            setSalesperson(result.data[0]);
        }
        loadSalesperson();
    },[]);

    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.put(`/api/salespersons/${id}`,salesperson);
        navigate("/salespersons");
    }

    return(
        <>
        <div className="layout-container">
        <Navbar/>
        <div className="content-container">
            
            <div className="add-salesperson-container">
                <h2 className="text-center mb-4">Edit Salesperson</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="salesperson_name">Salesperson Name</label>
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
                            <label htmlFor="last_name">Last Name</label>
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
                        <label htmlFor="phone">Phone</label>
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
                        <label htmlFor="sale_url">Payment URL</label>
                        <input
                            type="text"
                            id="sale_url"
                            className="form-control"
                            placeholder="shorturl.at/bnV79"
                            name="sale_url"
                            value={sale_url}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <button className="btn btn-primary btn-block">Update Salesperson</button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default EditSalesperson;