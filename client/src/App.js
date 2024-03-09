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

    //move axios calls for logging in + signing in here? (async?)
    //use useContext so login + register pages can access below

    const loginCall = async (loginData) => {
        /*await axios.get("http://localhost:5000/", { params: {
            username: loginData.username,
            password: loginData.password
        }})*/
        //if account found, assign values like in useEffect
    };

    const registerCall = async (accountData) => {
        /*await axios.post("http://localhost:5000/newAcc", {
            username: accountData.username,
            password: accountData.password
        })*/
    };

    return (
        <BrowserRouter>
            <UserContext.Provider value={{loginCall, registerCall}}>
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
//<useContext.Provider value={{accountData, loginCall, registerCall}}>
export default App;
