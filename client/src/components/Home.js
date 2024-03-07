import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-green-800">
            <h1 className="text-white">Draw Poker Simulator</h1>
            <button className="border rounded bg-black text-white" onClick={() => navigate('/Login')}>Login</button>
            <button className="border rounded bg-black text-white" onClick={() => navigate('/Game')}>Play as a Guest</button>
        </div>
  );
}

export default Home;
