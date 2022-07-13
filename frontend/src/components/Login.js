import {useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const[username, setUser] = useState("");
    const[password, setPwd] = useState("");
    const[errMsg, setErrMsg] = useState("");
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg("");
    },[username,password])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username, password}),
                {
                    headers: { "Content-type": "application/json"},
                    withCredentials: true
                }
                );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const token = response?.data?.token;
            setAuth({username, password, token});
            setUser("");
            setPwd("");
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Servidor sin respuesta');
            } else if (err.response?.status === 400) {
                setErrMsg('Usuario o contraseña incorrectos');
            } else {
                setErrMsg('Login fallido');
            }
            errRef.current.focus();
        }
    }

    return(
        <>
        {success ? (
            <section class="login-container">
                <h1>Te encuentras autenticado!</h1>
                <br />
                <p>
                    {/* <a href="#">Ir al Panel</a> */}
                </p>
            </section>
        ) : (
        <section class="login-container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inti Raymi Admin</h1>
            <form class="login-form"onSubmit={handleSubmit}>
                <label class="login-label" htmlFor="username">Usuario:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                />
                <label class="login-label" htmlFor="password">Contraseña:</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button class="login-btn">Ingresar</button>
            </form>
        </section>
        )}
        </>
    )
}
export default Login;