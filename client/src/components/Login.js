import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function Login() {
    const navigate = useNavigate();
    const {loginCall} = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async e => {//replace localhost w/ something else
        e.preventDefault();
        let res = await loginCall(loginData);
        //.then(navigate("/Game"));
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
