import {useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import Navbar from "./Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Parties from "../pages/Parties";
import Salespersons from "../pages/Salespersons";
import Clients from "../pages/Clients";
import "./Login.css";
import jwt_decode from "jwt-decode";

import axios from "../api/axios";
const LOGIN_URL = "/api/auth/login";
const REFRESH_URL = "/api/auth/refresh";

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

    const refreshToken = async () => {
        try {
            const res = await axios.post(REFRESH_URL, {token:username.refreshToken});
            setAuth({
                username,
                password,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
            });
        } catch (err) {
            console.log(err);
        }
    }

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        const decodedToken = jwt_decode(username.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["authorization"] = "Bearer " + data.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


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
            const refreshToken = response?.data?.refreshToken;
            setAuth({username, password, accessToken, refreshToken});
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
            <Router>
            <Navbar/>
                <Routes>
                    <Route path="/parties" element={<Parties/>}/>
                    <Route path="/salespersons" element={<Salespersons/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                </Routes>
            </Router>
        ) : (
        <div className="login-center">
        <section className="login-container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inti Raymi Admin</h1>
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
        )}
        </>
    )
}
export default Login;