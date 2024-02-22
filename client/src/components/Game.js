//import './App.css';
import React, { useState, useEffect } from 'react';

function Game() {
    const [handP, setHandP] = useState([]);

    const deck = [];
    const handO = []; //remove or move to make # of opponents variable?
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

    /*useEffect(() => {
       console.log("test");
    });*/

    createDeck();
    shuffle(deck);

    function createDeck() {
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 13; j++) {
                let val;
                if(j >= 9) val = 10; //remove?
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

    function shuffle(deck) {
        let dLength = deck.length;
        let temp;

        for(var i = 0; i < 52; i++) {
            let rand = Math.floor(Math.random() * dLength);
            temp = deck[rand];
            deck[rand] = deck[i];
            deck[i] = temp;
        }
    }


    function draw(hand, deck) {//change to be generally applicable
        setHandP( [ ...handP, deck[deck.length - 1] ] );
        deck.pop();
    }

    /*function showHand(hand) { //not working first time
                       for(var j = 0; j < handP.length; j++) {//test
                            console.log(handP[j]);
                        }
        const handPlayer = document.getElementById('handPlayer');
        for(var i = handP.length - 1; i < handP.length; i++) { //remove loop?
            const img = document.createElement('img');
            img.src = require("../deck/" + handP[i].name + "_of_" + handP[i].suit + "s.png");
            handPlayer.appendChild(img);
        }

    }*/

    function poker() {

        //opponent(s) by default are dealt five cards

        //player by default is dealt five cards

        //options to change cards(up to three) / bet(call, raise, fold)

        /* Hand Hierarchy:
            Straight Flush
            Full House
            Flush
            Straight
            Three of a Kind
            Two Pair
            High Card
        */

    }

    return (//might have to change the key in the map
        <div className="pokerTable">
            <header className="App-header">
                <div id="handPlayer">Your Hand</div>
                <div>
                    {handP.map((e, index) => (
                        <img key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <button onClick={() => draw(handP, deck)}>
                    Draw A Card
                </button>
            </header>
        </div>
  );
}
                //<div>{handP}</div>
export default Game;
