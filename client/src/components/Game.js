import React, { useState, useEffect } from 'react';

function Game() {
    const [handP, setHandP] = useState([]);
    const [handO, setHandO] = useState([]);//remove or move to make # of opponents variable?

    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

    useEffect(() => { //handEval only works with useEffect since hands are up to date here
        if(handEval(handP) > handEval(handO)) console.log("player wins");//change to display on screen
        else if(handEval(handP) < handEval(handO)) console.log("opponent wins");
        else console.log("tie");
    });

    createDeck();
    shuffle(deck);

    function createDeck() {
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 13; j++) {
                let val = j + 1;

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

    function draw(hand, setHand, deck, cardNum) {
        const newCards = [];

        for(var i = 0; i < cardNum; i++) {
            newCards.push(deck[deck.length - 1]);
            deck.pop();
        }

        setHand( [ ...hand, ...newCards ] );
    }

    function handEval(hand) {
        let highCard = {
            name: "Unknown",
            val: -1,
            suit: "Unknown"
        };

        for(var i = 0; i < hand.length; i++) {
            if(hand[i].val > highCard.val) highCard = hand[i];
        }

        return highCard.val;
    }

    function poker() {
        /*Everyone gets five cards with two players posting the small blind and the big blind.
        There’s a round of betting after the initial deal, then everyone discards however many cards they want (starting with the small blind and moving clockwise).
        Each player gets replacement cards. Then there’s another round of betting.
        Finally, each player who hasn’t folded goes to showdown and the best five card poker hand wins (using traditional poker hand rankings).*/

        //player by default is dealt five cards
        draw(handP, setHandP, deck, 5);

        //opponent(s) are dealt five cards
        draw(handO, setHandO, deck, 5);

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

        //placeholder for evaluating the winner
    }

    return (//might have to change the key in the map
        <div className="pokerTable">
            <header className="App-header">
                <div id="handPlayer">
                    Player Hand
                    {handP.map((e, index) => (
                        <img key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <div id="handOpponent">
                    Opponent Hand
                    {handO.map((e, index) => (
                        <img key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <button onClick={() => poker()}>
                    Start The Game
                </button>
            </header>
        </div>
  );
}

export default Game;
