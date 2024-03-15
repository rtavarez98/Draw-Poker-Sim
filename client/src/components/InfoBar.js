import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function InfoBar() {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const {wins} = useContext(UserContext);
    const {losses} = useContext(UserContext);
    const {ties} = useContext(UserContext);

    /* if logged in, return wins losses ties + button to logout
        if logged out, return button to login(useNavigate)
        return button that shows rule set for both scenarios
    */

    function logout() {
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('userId', '');
        window.localStorage.setItem('wins', '');
        window.localStorage.setItem('losses', '');
        window.localStorage.setItem('ties', '');
        window.location.reload();
    }

    if(token === '') { //pulling the last w+l+t values before updating
        return ( //logged out
            <div className="text-white border-[6px] border-x border-t border-yellow-950 bg-yellow-900">
                <button className="border rounded" onClick={() => navigate('/Login')}>Login</button>
            </div>
        );
    }
    else return ( //logged in
            <div className="flex flex-row text-white border-[6px] border-x border-t border-yellow-950 bg-yellow-900">
                <p className="pl-[20px] pr-[10px]">Wins: {wins}</p>
                <p className="pr-[10px]">Losses: {losses}</p>
                <p className="pr-[10px]">Ties: {ties}</p>
                <button className="border rounded" onClick={() => logout()}>Logout</button>
            </div>
    );
}

export default InfoBar;
