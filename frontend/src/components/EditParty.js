import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate, useParams} from "react-router-dom";
import * as dayjs from 'dayjs'



const EditParty = () => {
    let navigate = useNavigate();
    const {id} = useParams();
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

    useEffect(() => {
        const loadParty = async () =>{
            const result = await axiosPrivate.get(`/api/parties/${id}`);
            setParty(({name:result.data[0].name,sale_start_date:dateFormat(result.data[0].sale_start_date),sale_end_date:dateFormat(result.data[0].sale_end_date),party_date:dateFormat(result.data[0].party_date),banner_url:result.data[0].banner_url}));
        }
        loadParty();
    },[]);

    const dateFormat = function (data){
        return dayjs(data).format("YYYY-MM-DD");
    }


    const onSubmit = async e =>{
        e.preventDefault();
        await axiosPrivate.put(`/api/parties/${id}`,party);
        navigate("/parties");
    }


    return(
        <>
        <div className="layout-container">
            <Navbar/>
            <div className="content-container">
            <div className="add-party-container">
                <h2 className="text-center mb-4">Editar Fiesta</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <section>
                        <p>
                            <label htmlFor="party_name">Nombre de Fiesta</label>
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
                            <label htmlFor="sale_start_date">Inicio de venta</label>
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
                        <label htmlFor="sale_end_date">Fin de venta</label>
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
                        <label htmlFor="party_date">Fecha fiesta</label>
                        <input
                            type="date"
                            id="party_date"
                            className="form-control"
                            name="party_date"
                            value={party_date}
                            onChange={e => onInputChange(e)}
                            />
                    </p>
                    <p>
                        <label htmlFor="banner_url">URL Banner</label>
                        <input
                            type="text"
                            id="banner_url"
                            className="form-control"
                            placeholder="shorturl.at/bnV79"
                            name="banner_url"
                            value={banner_url}
                            onChange={e => onInputChange(e)}
                            />
                    </p>
                    <button className="btn btn-primary btn-block">Actualizar Fiesta</button>
                </form>
            </div>
            </div>
        </div>
        </>
    )
}

export default EditParty;