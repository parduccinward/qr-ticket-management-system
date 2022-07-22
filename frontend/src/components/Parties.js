import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
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

  return (
    <>
    <div className="layout-container">
        <Navbar/>
        <div className= "party-table">
            <div className="party-first-line">
                <h1>Fiestas</h1>
                <Link to="./add"className="btn btn-success">Agregar Fiesta</Link>
            </div>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Inicio de Venta</th>
                    <th scope="col">Fin de Venta</th>
                    <th scope="col">Fecha de fiesta</th>
                    <th scope="col">Url banner</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                {parties?.map((data,index)=>(
                       <tr>
                           <th scope="row">{index+1}</th>
                           <td>{data.name}</td>
                           <td>{dayjs(data.sale_start_date).format("DD/MM/YYYY")}</td>
                           <td>{dayjs(data.sale_end_date).format("DD/MM/YYYY")}</td>
                           <td>{dayjs(data.party_date).format("DD/MM/YYYY")}</td>
                           <td>{data.banner_url}</td>
                           <td>
                               <Link to="#" className="btn btn-primary m-2">Ver</Link>
                               <Link to="#" className="btn btn-primary m-2">Editar</Link>
                               <Link to="#" className="btn btn-danger m-2">Eliminar</Link>
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