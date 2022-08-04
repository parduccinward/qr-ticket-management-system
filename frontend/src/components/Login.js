import {useRef, useState, useEffect} from "react";
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Login.css";

import axios from "../api/axios";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromAdmin = location.state?.from?.pathname || "/dashboard";
    const fromSecurity = location.state?.from?.pathname || "/qr";

    const userRef = useRef();
    const errRef = useRef();

    const[username, setUser] = useState("");
    const[password, setPwd] = useState("");
    const[errMsg, setErrMsg] = useState("");

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
            const accessToken = response?.data?.accessToken;
            const roleResponse = response?.data?.role;
            const role = [];
            role[0]=roleResponse;
            setAuth({username, password, role, accessToken});
            setUser("");
            setPwd("");
            if(roleResponse===5150){
                navigate(fromAdmin, { replace: true });
            }else if(roleResponse===2001){
                navigate(fromSecurity, { replace: true });
            }
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
        <div className="login-center">
        <section className="login-container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <form className="login-form"onSubmit={handleSubmit}>
                <label className="login-label" htmlFor="username">Usuario:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                    />
                <label className="login-label" htmlFor="password">Contraseña:</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                    />
                <button className="login-btn">Ingresar</button>
            </form>
        </section>
        </div>
        </>
    )
}
export default Login;