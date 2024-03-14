import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function InfoBar() {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const {wins} = useContext(UserContext);
    const {losses} = useContext(UserContext);
    const {ties} = useContext(UserContext);

    //const {userId} = useContext(UserContext);
    /* if logged in, return wins losses ties + button to logout
        if logged out, return button to login(useNavigate)
        return button that shows rule set for both scenarios
    */
//w+l+t values returning undefined
    function test() {//remove later
        if(token === '') console.log("not logged in");
        else console.log("Wins: " + wins + " Losses: " + losses + " Ties: " + ties);
    }

    /*if(token === '') return component for guest
    else return component for user*/
    return (//change border style
        <div className="text-white border-[6px] border-x border-t border-yellow-950 bg-yellow-900">
            <button onClick={ () => test()}>Rules</button>
        </div>
    );
}

export default InfoBar;
