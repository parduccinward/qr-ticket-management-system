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
    <Navbar/>
    <div className="parties">
        <h2>Lista de Fiestas</h2>
        {parties?.length
        ?(
            <ul>
                {parties.map((party, i) => <li key={i}>{party?.name}</li>)}
            </ul>
        ): <p>No hay fiestas por mostrar</p>
        }
    </div>
    </>
  )
}
export default Parties;