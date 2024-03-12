import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function InfoBar() {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    /* if logged in, return wins losses ties + button to logout
        if logged out, return button to login(useNavigate)
        return button that shows rule set for both scenarios
    */

    function test() {//remove later
        if(token === '') console.log("not logged in")
        else console.log("logged in")
    }
    return (
        <div>
            <button onClick={ () => test()}>Rules</button>
        </div>
    );
}

export default InfoBar;
