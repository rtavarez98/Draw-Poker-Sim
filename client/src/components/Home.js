import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-green-800">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-[36px] mt-[180px] mb-[70px]">Draw Poker Simulator</h1>
                <div className="flex flex-col">
                    <button className="border rounded bg-black text-white mb-[28px] px-[40px] py-[10px]" onClick={() => navigate('/Login')}>Login</button>
                    <button className="border rounded bg-black text-white px-[40px] py-[10px]" onClick={() => navigate('/Game')}>Play as a Guest</button>
                </div>
            </div>
        </div>
  );
}

export default Home;
