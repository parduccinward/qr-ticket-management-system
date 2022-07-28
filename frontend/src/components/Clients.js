import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "./Navbar";
import "./pages.css";

const Clients = () => {
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
        const deleteConfirm = window.confirm('Estas seguro de querer eliminar este registro?');
        if(deleteConfirm){
            await axiosPrivate.delete(`/api/clients/${id}`);
            getClient();
        }
    }
  return (
    <>
    <div className="layout-container">
      <Navbar/>
      <div className= "client-table">
            <div className="client-first-line">
                <h1>Clientes</h1>
                <Link to="./add"className="btn btn-success">Agregar Cliente</Link>
            </div>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Genero</th>
                    <th scope="col">URL de Pago</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Fiesta</th>
                    <th scope="col">Relacionador</th>
                    <th scope="col">Accion</th>
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
                           <td>{data.payment_url}</td>
                           <td>{data.instagram}</td>
                           <td>{data.party_id}</td>
                           <td>{data.salesperson_id}</td>
                           <td>
                               <Link to={`./edit/${data.client_id}`} className="btn btn-primary m-2">Editar</Link>
                               <button className="btn btn-danger m-2" onClick={() => deleteClient(data.client_id)}>Eliminar</button>
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