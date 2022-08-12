import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import * as FiIcons from 'react-icons/fi';
import Navbar from "./Navbar";
import "./pages.css";
import * as dayjs from 'dayjs'

const Parties = () => {
    const[parties, setParties] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getParties = async () => {
            try {
                const response = await axiosPrivate.get("/api/parties",{
                    signal:controller.signal
                });
                isMounted && setParties(response.data)
            } catch (err) {
                if(!err.code === 'ERR_CANCELED'){
                    console.log(err)
                }
            }
        }
        
        
        getParties();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
    
    const getParty = async () => {
        const result = await axiosPrivate.get("/api/parties");
        setParties(result.data);
    }

    const deleteParty = async id => {
        const deleteConfirm = window.confirm('Are you sure you want to delete this record?');
        if(deleteConfirm){
            await axiosPrivate.delete(`/api/parties/${id}`);
            getParty();
        }
    }

    function copy(text){
        navigator.clipboard.writeText(text)
        alert("URL copied!");
    }

  return (
    <>
    <div className="layout-container">
        <Navbar/>
        <div className= "party-table">
            <div className="party-first-line">
                <h1>Events</h1>
                <Link to="./add"className="btn btn-success">Add Event</Link>
            </div>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sale Start Date</th>
                    <th scope="col">Sale End Date</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Website URL</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {parties?.map((data,index)=>(
                       <tr>
                           <th scope="row">{index+1}</th>
                           <td>{data.name}</td>
                           <td>{dayjs(data.sale_start_date).format("DD/MMMM/YYYY")}</td>
                           <td>{dayjs(data.sale_end_date).format("DD/MMMM/YYYY")}</td>
                           <td>{dayjs(data.party_date).format("DD/MMMM/YYYY")}</td>
                           <td className="banner-url"onClick={() => copy(data.banner_url)}>{data.banner_url}<FiIcons.FiCopy/></td>
                           <td>
                               <Link to={`./edit/${data.party_id}`} className="btn btn-primary m-2">Edit</Link>
                               <button className="btn btn-danger m-2" onClick={() => deleteParty(data.party_id)}>Delete</button>
                           </td>
                       </tr>
                   ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}
export default Parties;