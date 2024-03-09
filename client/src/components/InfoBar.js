import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InfoBar() {
    const navigate = useNavigate();
    /* if logged in, return wins losses ties
        if logged out, return button to login(useNavigate)
        return button that shows rule set for both scenarios
    */
    return (
        <div>
            <button>Rules</button>
        </div>
    );
}

export default InfoBar;
