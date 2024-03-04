import React, { useState, useEffect, useRef } from 'react';// remove some?
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Draw Poker Simulator</h1>
            <button onClick={() => navigate('/Login')}>Login</button>
            <button onClick={() => navigate('/Game')}>Play as a Guest</button>
        </div>
  );
}

export default Home;
