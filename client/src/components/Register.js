import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async e => {//replace localhost w/ something else
        e.preventDefault();
        axios.post("http://localhost:5000/newAcc", {
            username: accountData.username,
            password: accountData.password
        })
        .then(navigate("/Game"));//add some sort of buffer later
    };

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={e => setAccountData({...accountData, username: e.target.value})} placeholder="Username"/>
            <input onChange={e => setAccountData({...accountData, password: e.target.value})} placeholder="Password"/>
            <input onChange={() => console.log("test")} placeholder="Confirm Password"/>
            <button type="submit">Register</button>
        </form>
  );
}

export default Register;
