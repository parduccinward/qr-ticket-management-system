import {React, useState, useEffect} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate, useParams} from "react-router-dom";
import "./pages.css";


const EditClient = () => {
    let navigate = useNavigate();
    const {id} = useParams();
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

    useEffect(() => {
        const loadClient = async () =>{
            const result = await axiosPrivate.get(`/api/clients/${id}`);
            setClient(result.data[0]);
        }
        loadClient();
    },[]);

    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.put(`/api/clients/${id}`,client);
        navigate("/clients");
    }

    return(
        <>
        <div className="layout-container">
        <Navbar/>
        <div className="content-container">
            
            <div className="add-client-container">
                <h2 className="text-center mb-4">Edit Client</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="salesperson_name">Client Name</label>
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
                        <label htmlFor="gender">Gender</label>
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
                        <label htmlFor="payment_url">Payment URL</label>
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
                    <button className="btn btn-primary btn-block">Update Client</button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default EditClient;