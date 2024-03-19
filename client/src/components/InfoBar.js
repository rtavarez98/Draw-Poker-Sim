import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function InfoBar() {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const {wins} = useContext(UserContext);
    const {losses} = useContext(UserContext);
    const {ties} = useContext(UserContext);

    /*
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

    if(token === '') {
        return ( //logged out
            <div className="h-[46px] text-white border-[6px] border-x border-t border-yellow-950 bg-yellow-900">
                <button className="border rounded px-[30px] py-[6px] bg-blue-900" onClick={() => navigate('/Login')}>Login</button>
            </div>
        );
    }
    else return ( //logged in
            <div className="flex flex-row h-[46px] text-white border-[6px] border-x border-t border-yellow-950 bg-yellow-900">
                <p className="pt-[5px] pl-[20px] pr-[10px]">Wins: {wins}</p>
                <p className="pt-[5px] pr-[10px]">Losses: {losses}</p>
                <p className="pt-[5px] pr-[10px]">Ties: {ties}</p>
                <button className="border rounded px-[30px] py-[6px] bg-red-900" onClick={() => logout()}>Logout</button>
            </div>
    );
}

export default InfoBar;
