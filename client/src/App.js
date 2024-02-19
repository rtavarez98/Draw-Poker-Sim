import KoH from './deck/king_of_hearts.png';
import './App.css';

function App() {

    let rand = Math.random() * 10;

    return (
        <div className="App">
            <header className="App-header">
                <img src={KoH} alt="king_of_hearts" width="200px" length="250px"/>
                <p id="rand">
                    Random Number: {rand}
                </p>
            </header>
        </div>
  );
}

export default App;
