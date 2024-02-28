import React, { useState, useEffect } from 'react';

function Game() {
    const [handP, setHandP] = useState([]);
    const [handO, setHandO] = useState([]);//remove or move to make # of opponents variable?

    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

    useEffect(() => { //handEval only works with useEffect since hands are up to date here
        const valP = handEval(handP);
        const valO = handEval(handO);
        console.log(valP + " VS " + valO);//test
        if(valP[0] > valO[0]) console.log("player wins");//change to display on screen
        else if(valP[0] < valO[0]) console.log("opponent wins");
        else { //both players have same type of hand
            if(valP[1] > valO[1])console.log("player wins");
            else if(valP[1] < valO[1]) console.log("opponent wins");
            else console.log("tie");
        }
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
        //return array w/ 1st index indicating type of hand and 2nd index indicating highest val
        /* Hand Hierarchy:
            8: Straight Flush
            7: Four of a Kind
            6: Full House
            5: Flush
            4: Straight
            3: Three of a Kind
            2: Two Pair
            1: One Pair
            0: High Card
        */
        let highCard = {
            name: "Unknown",
            val: -1,
            suit: "Unknown"
        };

        const handStraight = [0,0,0,0,0];
        const dupe = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        let dupeMax = 0;
        let dupeMaxTwo = -1;
        let flush = true;
        let straight = true;

        for(var i = 0; i < hand.length; i++) {
            handStraight[i] = hand[i].val;
            dupe[hand[i].val - 1]++;
            if(flush && i < hand.length - 1 && hand[i].suit !== hand[i + 1].suit) flush = false; //simplify?
            if(hand[i].val > highCard.val) highCard = hand[i];
        }

        for(var j = 0; j < dupe.length; j++) {
            if(dupe[j] > 0 && dupe[j] >= dupeMax) dupeMaxTwo = dupeMax;
            if(dupe[j] > 1) {
                dupeMax = Math.max(dupeMax, dupe[j]);
                highCard.val = j + 1;
            }
        }

        //reorder straight array to lowest to highest, then iterate to determine straight
        handStraight.sort( (a, b) => {return a - b});

        for(var k = 1; k < hand.length; k++) {//bruteforce
            if(handStraight[k] !== handStraight[k - 1] - 1) {
                straight = false;
                break;
            }
        }

        //change to switch statement?
        if(flush === true && straight === true) return [8, highCard.val];
        if(dupeMax === 4) return [7, highCard.val];
        if(dupeMaxTwo === 2 && dupeMax === 3) return [6, highCard.val];
        if(flush === true) return [5, highCard.val];
        if(straight === true) return [4, highCard.val];
        if(dupeMax === 3) return [3, highCard.val];
        if(dupeMaxTwo === 2 && dupeMax === 2) return [2, highCard.val];
        if(dupeMax === 2) return [1, highCard.val];
        return [0, highCard.val];
    }



    function poker() {
        /*Everyone gets five cards with two players posting the small blind and the big blind.
        There’s a round of betting after the initial deal, then everyone discards however many cards they want (starting with the small blind and moving clockwise).
        Each player gets replacement cards. Then there’s another round of betting.
        Finally, each player who hasn’t folded goes to showdown and the best five card poker hand wins (using traditional poker hand rankings).*/

        //player by default is dealt five cards
        draw(handP, setHandP, deck, 5)

        //opponent(s) are dealt five cards
        draw(handO, setHandO, deck, 5);

        //options to change cards(up to three) / bet(call, raise, fold)



        //placeholder for evaluating the winner
    }

    return (//might have to change the key in the map
        <div className="pokerTable">
            <header className="App-header">
                <div id="handPlayer">
                    Player Hand
                    {handP.map((e, index) => (
                        <input type="image" key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <div id="handOpponent">
                    Opponent Hand
                    {handO.map((e, index) => (
                        <input type="image" key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <button onClick={() => poker()}>
                    Start The Game
                </button>
            </header>
            <div id="gameOptions">
                <button onClick={() => console.log("test")}>
                    Call
                </button>
                <button onClick={() => console.log("test")}>
                    Raise
                </button>
                <button onClick={() => console.log("test")}>
                    Fold
                </button>
                <button onClick={() => console.log("test")}>
                    Change Cards
                </button>
            </div>
        </div>
  );
}

export default Game;
