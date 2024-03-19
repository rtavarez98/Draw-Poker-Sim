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

    const [userId, setUserId] = useState( () => {
        if(!window.localStorage.getItem('userId')) return '';
        else return window.localStorage.getItem('userId');
    });

    let [wins, setWins] = useState( () => {
        if(!window.localStorage.getItem('wins')) return '';
        else return window.localStorage.getItem('wins');
    });

    let [losses, setLosses] = useState( () => {
        if(!window.localStorage.getItem('losses')) return '';
        else return window.localStorage.getItem('losses');
    });

    let [ties, setTies] = useState( () => {
        if(!window.localStorage.getItem('ties')) return '';
        else return window.localStorage.getItem('ties');
    });

    useEffect(() => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userId', userId);
        window.localStorage.setItem('wins', wins);
        window.localStorage.setItem('losses', losses);
        window.localStorage.setItem('ties', ties);
    },[token, userId, wins, losses, ties]);

    const loginCall = async (loginData) => {
        try{
            let res = await axios.get("http://localhost:5000/", { params: {//replace localhost w/ something else
                username: loginData.username,
                password: loginData.password
            }})
            .catch(error => console.log('wrong username or password'));

            if(typeof res !== "undefined") {
                setToken(res.data.token);
                setUserId(res.data.userId);
                setWins(res.data.wins);
                setLosses(res.data.losses);
                setTies(res.data.ties);
            }
        } catch(err) {
            console.error(err);
        }

    };

    const registerCall = async (accountData) => {
        try {
            let res = await axios.post("http://localhost:5000/newAcc", {//replace localhost w/ something else
                username: accountData.username,
                password: accountData.password
            })
            .catch(error => console.log('wrong username already in use'));

            if(typeof res !== "undefined") {
                setToken(res.data.token);
                setUserId(res.data.userId);
                setWins(res.data.wins);
                setLosses(res.data.losses);
                setTies(res.data.ties);
            }
        } catch(err) {
            console.error(err);
        }
    };

    const winCall = async (accountData) => {
        try{
            let res = await axios.patch("http://localhost:5000/win", {
                userId: userId
            })
            .then(() => setWins(parseInt(wins) + 1));
        } catch(err) {
            console.error(err);
        }
    }

    const lossCall = async (accountData) => {
        try{
            let res = await axios.patch("http://localhost:5000/loss", {
                userId: userId
            })
            .then(() => setLosses(parseInt(losses) + 1));
        } catch(err) {
            console.error(err);
        }
    }

    const tieCall = async (accountData) => {
        try{
            let res = await axios.patch("http://localhost:5000/tie", {
                userId: userId
            })
            .then(() => setTies(parseInt(ties) + 1));
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{token, loginCall, registerCall, winCall, lossCall, tieCall, userId, wins, losses, ties}}>
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
