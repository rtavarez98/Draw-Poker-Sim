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
        let res = await loginCall(loginData)
        .then(navigate("/Game"));
    };

    return (
        <form className=" h-screen bg-green-800 " onSubmit={handleSubmit}>
            <div className="flex items-center flex-col ">
                <h1 className="text-white text-[30px] mt-[120px] mb-[50px]">Login</h1>
                <div className="flex flex-col border rounded bg-black px-[30px] py-[30px]">
                    <input className="mb-[10px]" onChange={e => setLoginData({...loginData, username: e.target.value})} placeholder="Username"/>
                    <input className="mb-[22px]" onChange={e => setLoginData({...loginData, password: e.target.value})} placeholder="Password"/>
                    <button className="text-white" type="submit">Login</button>
                    <button className="text-white" onClick={() => navigate('/Register')}>"Don't have an account?"</button>
                </div>
            </div>
        </form>
  );
}

export default Login;
