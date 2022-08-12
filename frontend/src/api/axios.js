import axios from "axios";

let BASE_URL;

if(process.env.NODE_ENV === "production"){
    BASE_URL = 'https://qr-tms.herokuapp.com/';
}else{
    BASE_URL = 'http://localhost:4000';
}

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json"},
    withCredentials: true
});