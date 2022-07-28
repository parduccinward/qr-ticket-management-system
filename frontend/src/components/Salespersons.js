import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import * as FiIcons from 'react-icons/fi';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "./Navbar";
import "./pages.css";

const Salespersons = () => {
    const[salespersons, setSalespersons] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSalespersons = async () => {
            try {
                const response = await axiosPrivate.get("/api/salespersons",{
                    signal:controller.signal
                });
                isMounted && setSalespersons(response.data)
            } catch (err) {
                if(!err.code === 'ERR_CANCELED'){
                    console.log(err)
                }
            }
        }
        
        
        getSalespersons();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
    
    const getSalesperson = async () => {
        const result = await axiosPrivate.get("/api/salespersons");
        setSalespersons(result.data);
    }

    const deleteSalesperson = async id => {
        const deleteConfirm = window.confirm('Estas seguro de querer eliminar este registro?');
        if(deleteConfirm){
            await axiosPrivate.delete(`/api/salespersons/${id}`);
            getSalesperson();
        }
    }

    function copy(text){
        navigator.clipboard.writeText(text)
        alert("URL copiado!");
      }
  return (
    <>
    <div className="layout-container">
      <Navbar/>
      <div className= "salesperson-table">
            <div className="salesperson-first-line">
                <h1>Relacionadores</h1>
                <Link to="./add"className="btn btn-success">Agregar Relacionador</Link>
            </div>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">URL de Venta</th>
                    <th scope="col">Fiesta</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                {salespersons?.map((data,index)=>(
                       <tr>
                           <th scope="row">{index+1}</th>
                           <td>{data.name}</td>
                           <td>{data.last_name}</td>
                           <td>{data.phone}</td>
                           <td className="salesperson-url"onClick={() => copy(data.sale_url)}>{data.sale_url}<FiIcons.FiCopy/></td>
                           <td>{data.party_id}</td>
                           <td>
                               <Link to={`./edit/${data.salesperson_id}`} className="btn btn-primary m-2">Editar</Link>
                               <button className="btn btn-danger m-2" onClick={() => deleteSalesperson(data.salesperson_id)}>Eliminar</button>
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
export default Salespersons;