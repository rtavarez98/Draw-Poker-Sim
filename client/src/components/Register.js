import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <div>
            <input onChange={e => setUsername(e)} placeholder="Username"/>
            <input onChange={e => setPassword(e)} placeholder="Password"/>
            <input onChange={() => console.log("test")} placeholder="Confirm Password"/>
            <button onClick={() => console.log("replace with a route to game pg")}>Register</button>
        </div>
  );
}

export default Register;
