import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';//swap 'components' to 'pages'
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';

function App() {

    let rand = Math.random() * 10;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Game" element={<Game />}/>
                <Route path="/Login" element={<Login />}/>
                <Route path="/Register" element={<Register />}/>
            </Routes>
        </BrowserRouter>

  );
}

export default App;
