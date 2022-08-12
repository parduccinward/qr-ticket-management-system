import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "./Navbar";
import "./pages.css";
import * as dayjs from 'dayjs'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from './Modal';


const Clients = () => {
    const[openModal, setOpenModal] = useState(false);
    const[client, setClient] = useState();
    const[clients, setClients] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getClients = async () => {
            try {
                const response = await axiosPrivate.get("/api/clients",{
                    signal:controller.signal
                });
                isMounted && setClients(response.data)
            } catch (err) {
                if(!err.code === 'ERR_CANCELED'){
                    console.log(err)
                }
            }
        }
        
        
        getClients();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
    
    const getClient = async () => {
        const result = await axiosPrivate.get("/api/clients");
        setClients(result.data);
    }

    const deleteClient = async id => {
        const deleteConfirm = window.confirm('Are you sure you want to delete this record?');
        if(deleteConfirm){
            await axiosPrivate.delete(`/api/clients/${id}`);
            getClient();
        }
    }

    function copy(text){
        navigator.clipboard.writeText(text)
        alert("URL copiado!");
    }
    
  return (
    <>
    {openModal && <Modal closeModal={setOpenModal} clientId={client} />}
    <div className="layout-container">
      <Navbar/>
      <div className= "client-table">
            <div className="client-first-line">
                <h1>Clients</h1>
            </div>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Payment URL</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Salesperson</th>
                    <th scope="col">Payment Date</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {clients?.map((data,index)=>(
                       <tr>
                           <th scope="row">{index+1}</th>
                           <td>{data.name}</td>
                           <td>{data.last_name}</td>
                           <td>{data.phone}</td>
                           <td>{data.gender}</td>
                           <td className="payment-url" onClick={() => copy(data.payment_url)}>{data.payment_url}</td>
                           <td>{data.instagram}</td>
                           <td>{data.salesperson_name}</td>
                           <td>{dayjs(data.created_at).format("DD/MMMM/YYYY")}</td>
                           <td>
                               <button className="btn btn-link m-2" onClick={() => {setOpenModal(true);setClient(data)}}><i class="bi bi-qr-code bi-7x"></i></button>
                               <Link to={`./edit/${data.client_id}`} className="btn btn-primary m-2">Edit</Link>
                               <button className="btn btn-danger m-2" onClick={() => deleteClient(data.client_id)}>Delete</button>
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
export default Clients;