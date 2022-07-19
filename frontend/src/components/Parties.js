import {useState, useEffect} from "react";
import axios from "../api/axios";
import Navbar from "./Navbar";
import "./pages.css";
import useRefreshToken from "../hooks/useRefreshToken";

const Parties = () => {
    const[parties, setParties] = useState();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getParties = async () => {
            try {
                const response = await axios.get("/api/parties",{
                    signal:controller.signal
                });
                console.log(response.data);
                isMounted && setParties(response.data)
            } catch (err) {
                console.error(err);
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
        <button onClick={() => refresh()}>Refresh</button>
    </div>
    </>
  )
}
export default Parties;