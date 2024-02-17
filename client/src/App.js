import KoH from './deck/king_of_hearts.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={KoH} alt="king_of_hearts" width="200px" length="250px"/>
        <p>
          Test to display playing card.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
