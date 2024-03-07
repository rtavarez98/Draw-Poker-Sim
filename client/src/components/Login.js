import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async e => {//replace localhost w/ something else
        e.preventDefault();
        axios.get("http://localhost:5000/", { params: {
            username: loginData.username,
            password: loginData.password
        }})
        .then(res => console.log(res.data));
        //.then(navigate("/Game"));//add some sort of buffer later
        //validate login
    };

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={e => setLoginData({...loginData, username: e.target.value})} placeholder="Username"/>
            <input onChange={e => setLoginData({...loginData, password: e.target.value})} placeholder="Password"/>
            <button type="submit">Login</button>
            <button onClick={() => navigate('/Register')}>"Don't have an account?"</button>
        </form>
  );
}

export default Login;
