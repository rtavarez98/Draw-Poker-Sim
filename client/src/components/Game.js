//import KoH from './deck/king_of_hearts.png';
//import './App.css';
//import Deck from './Deck';

function Game() {
    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"];

    function createDeck() {
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 13; j++) {
                let val;
                if(j >= 9) val = 10;
                else val = j + 1;

                let card = {
                    name: names[j],
                    val: val,
                    suit: suits[i]
                };

                deck.push(card);
            }
        }
    }

    //let rand = Math.random() * 10;

    //shuffle

    //draw

    //poker

    return (
        <div className="App">
            <header className="App-header">
                <img width="200px" length="250px"/>
                <p id="deck">
                    Random Number: {deck.length}
                </p>
                <button onClick={() => createDeck()}>
                    Test Deck Creation
                </button>
            </header>
        </div>
  );
}

export default Game;
