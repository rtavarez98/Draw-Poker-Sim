import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <div>
            <input onChange={e => setUsername(e)} placeholder="Username"/>
            <input onChange={e => setPassword(e)} placeholder="Password"/>
            <button onClick={() => console.log("replace with a route to game pg")}>Login</button>
            <button onClick={() => navigate('/Register')}>"Don't have an account?"</button>
        </div>
  );
}

export default Login;
