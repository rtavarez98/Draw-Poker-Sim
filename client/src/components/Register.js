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

    const handleSubmit = async e => {//replace localhost w/ something else
        e.preventDefault();
        let res = await registerCall(accountData);//test
        //.then(navigate("/Game"));//add some sort of buffer later
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
