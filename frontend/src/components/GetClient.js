import React from 'react'
import {useParams} from "react-router-dom";

const GetClient = () => {
    const {id} = useParams();
  return (
    <div>Cliente #{id}</div>
  )
}
export default GetClient;
