import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import UserContext from './UserContext';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import Game from './pages/gamePage';

function App() {
    const [token, setToken] = useState( () => {
        if(!window.localStorage.getItem('token')) return '';
        else return window.localStorage.getItem('token');
    });

    //add loggedIn value?

    //use useEffect to assign all values to localStorage w/ 'window.localStorage.setItem'
    useEffect(() => {
        window.localStorage.setItem('token', token);
    },[token]);

    //move axios calls for logging in + signing in here? (async?)
    //use useContext so login + register pages can access below

    const loginCall = async (loginData) => {
        try{
            let res = await axios.get("http://localhost:5000/", { params: {
                username: loginData.username,
                password: loginData.password
            }})
            .catch(error => console.log('wrong username or password'));

            if(typeof res !== "undefined") {
                setToken(res.data.token);
            }
        } catch(err) {
            console.error(err);
        }

    };

    const registerCall = async (accountData) => {
        try {
            let res = await axios.post("http://localhost:5000/newAcc", {
                username: accountData.username,
                password: accountData.password
            })
            .catch(error => console.log('wrong username already in use'));

            if(typeof res !== "undefined") {
                setToken(res.data.token);
            }
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <BrowserRouter>
            <UserContext.Provider value={{token, loginCall, registerCall}}>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/Game" element={<Game />}/>
                    <Route path="/Login" element={<Login />}/>
                    <Route path="/Register" element={<Register />}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
  );
}

export default App;
