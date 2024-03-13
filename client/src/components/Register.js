import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function Register() {
    const navigate = useNavigate();
    const {registerCall} = useContext(UserContext);
    const [accountData, setAccountData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();
        let res = await registerCall(accountData)
        .then(navigate("/Game"));
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
