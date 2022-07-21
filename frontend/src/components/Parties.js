import {useState, useEffect} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "./Navbar";
import "./pages.css";

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
            <h2>Lista de Fiestas</h2>
            {parties?.length
            ?(
                <ul>
                    {parties.map((party, i) => <li key={i}>{party?.name}</li>)}
                </ul>
            ): <p>No hay fiestas por mostrar</p>
            }
            <table className="table">   
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}
export default Parties;