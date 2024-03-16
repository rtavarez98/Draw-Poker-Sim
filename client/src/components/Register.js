import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function Register() {
    const navigate = useNavigate();
    const {registerCall} = useContext(UserContext);
    const [accountData, setAccountData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async e => {//replace alert with an error that's caught and displayed on screen?
        e.preventDefault();

        if(accountData.password !== accountData.confirmPassword) alert("Passwords do not match");
        else {
            let res = await registerCall(accountData)
            .then(navigate("/Game"));
        }
    };

    return (
        <form className="h-screen bg-green-800" onSubmit={handleSubmit}>
            <div className="flex items-center flex-col">
                <h1 className="text-white text-[30px] mt-[120px] mb-[50px]">Register</h1>
                <div className="flex flex-col border rounded bg-black px-[30px] py-[30px]">
                    <input className="rounded mb-[10px] px-[5px] py-[5px]" onChange={e => setAccountData({...accountData, username: e.target.value})} placeholder="Username" required/>
                    <input className="rounded mb-[10px] px-[5px] py-[5px]" onChange={e => setAccountData({...accountData, password: e.target.value})} placeholder="Password" required/>
                    <input className="rounded mb-[22px] px-[5px] py-[5px]" onChange={e => setAccountData({...accountData, confirmPassword: e.target.value})} placeholder="Confirm Password" required/>
                    <button className="border rounded text-white bg-blue-900" type="submit">Create a new Account</button>
                </div>
            </div>
        </form>
  );
}

export default Register;
