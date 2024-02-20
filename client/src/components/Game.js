//import './App.css';
import React, { useState, useEffect } from 'react';

function Game() {
    //const [];

    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"];

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

    //shuffle
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

    const handP = [];

    function draw(hand, deck) {
        hand.push(deck[deck.length - 1]);
        deck.pop();
        console.log(hand[hand.length - 1]);//test
    }

    //poker

    return ( //a player draws 2 - 5 cards
        <div className="App">
            <header className="App-header">
                <img src={require("../deck/queen_of_hearts.png")} alt="card" width="200px" length="250px"/>
                <p>
                </p>
                <button onClick={() => draw(handP, deck)}>
                    Draw A Card
                </button>
            </header>
        </div>
  );
}

export default Game;
