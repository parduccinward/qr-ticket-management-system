import {React, useState} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import "./pages.css";


const AddParty = () => {
    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [party, setParty] = useState({
        name:"",
        sale_start_date:"",
        sale_end_date:"",
        party_date:"",
        banner_url:"",
    })

    const {name, sale_start_date, sale_end_date, party_date, banner_url} = party;
    const onInputChange = e =>{
        setParty({...party, [e.target.name]:e.target.value});
    }

    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.post("/api/parties",party);
        navigate("/parties");
    }

    return(
        <>
        <div className="layout-container">
        <Navbar/>
        <div className="content-container">
            
            <div className="add-party-container">
                <h2 className="text-center mb-4">Add Event</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="party_name">Event Name</label>
                            <input
                                type="text"
                                id="party_name"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                                required/>
                        </p>
                        <p>
                            <label htmlFor="sale_start_date">Sale Start Date</label>
                            <input
                                type="date"
                                id="sale_start_date"
                                className="form-control"
                                name="sale_start_date"
                                value={sale_start_date}
                                onChange={e => onInputChange(e)}
                                required/>
                        </p>
                    </section>
                    <p>
                        <label htmlFor="sale_end_date">Sale End Date</label>
                        <input
                            type="date"
                            id="sale_end_date"
                            className="form-control"
                            name="sale_end_date"
                            value={sale_end_date}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="party_date">Event Date</label>
                        <input
                            type="date"
                            id="party_date"
                            className="form-control"
                            name="party_date"
                            value={party_date}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <p>
                        <label htmlFor="banner_url">Website URL</label>
                        <input
                            type="text"
                            id="banner_url"
                            className="form-control"
                            placeholder="shorturl.at/bnV79"
                            name="banner_url"
                            value={banner_url}
                            onChange={e => onInputChange(e)}
                            required/>
                    </p>
                    <button className="btn btn-primary btn-block">Add Event</button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default AddParty;