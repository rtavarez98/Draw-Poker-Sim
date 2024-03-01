import React, { useState, useEffect, useRef } from 'react';

function Game() {
    const [handP, setHandP] = useState([]);
    const [chipsP, setChipsP] = useState();
    const [betP, setBetP] = useState();
    const [handO, setHandO] = useState([]);//remove or move to make # of opponents variable?
    const [chipsO, setChipsO] = useState();//remove or move to make # of opponents variable?
    const [betO, setBetO] = useState();//remove or move to make # of opponents variable?
    const changeCards = [];
    let winner = useRef();//current value not being displayed

    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

    useEffect(() => { //handEval only works with useEffect since hands are up to date here
        const valP = handEval(handP);
        const valO = handEval(handO);
        if(valP[0] > valO[0]) winner.current = "player wins";
        else if(valP[0] < valO[0]) winner.current = "opponent wins";
        else { //both players have same type of hand
            if(valP[1] > valO[1]) winner.current = "player wins";
            else if(valP[1] < valO[1]) winner.current = "opponent wins";
            else winner.current = "tie";
        }
        console.log(winner.current);//test
    });

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

    /*
    * @param {Object[]} deck - group of playing cards being shuffled
    */
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

    /*
    * @param {Object[]} hand - where the cards are being drawn to
    * @param {Object[]} setHand - useState value used to alter the hand
    * @param {Object[]} deck - where cards are being drawn from
    * @param {number} cardNum - number of cards to be drawn
    */
    function draw(hand, setHand, deck, cardNum) {
        const newCards = [];

        for(var i = 0; i < cardNum; i++) {
            newCards.push(deck[deck.length - 1]);
            deck.pop();
        }

        setHand( [ ...hand, ...newCards ] );
    }

    /*
    * Evaluates a hand's value by using the following hierarchy...
    *   8: Straight Flush
    *   7: Four of a Kind
    *   6: Full House
    *   5: Flush
    *   4: Straight
    *   3: Three of a Kind
    *   2: Two Pair
    *   1: One Pair
    *   0: High Card
    *
    * @param {Object[]} hand - group of cards to be evaluated
    * @return {number[]} whose first element indicates the hand type and the second element indicates the highest valued card
    */
    function handEval(hand) {
        const handStraight = [0,0,0,0,0];
        const dupe = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        let highCard = -1;
        let dupeMax = 0;
        let dupeMaxTwo = -1;
        let flush = true, straight = true;

        for(var i = 0; i < hand.length; i++) {
            handStraight[i] = hand[i].val;
            dupe[hand[i].val - 1]++;
            if(flush && i < hand.length - 1 && hand[i].suit !== hand[i + 1].suit) flush = false; //simplify?
            if(hand[i].val > highCard) highCard = hand[i].val;
        }

        for(var j = 0; j < dupe.length; j++) {
            if(dupe[j] > 0 && dupe[j] >= dupeMax) dupeMaxTwo = dupeMax;
            if(dupe[j] > 1) {
                dupeMax = Math.max(dupeMax, dupe[j]);
                highCard = j + 1;
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
        if(flush === true && straight === true) return [8, highCard];
        if(dupeMax === 4) return [7, highCard];
        if(dupeMaxTwo === 2 && dupeMax === 3) return [6, highCard];
        if(flush === true) return [5, highCard];
        if(straight === true) return [4, highCard];
        if(dupeMax === 3) return [3, highCard];
        if(dupeMaxTwo === 2 && dupeMax === 2) return [2, highCard];
        if(dupeMax === 2) return [1, highCard];
        return [0, highCard];
    }

    /*
    * Changes out a specified amount of cards from a hand
    *
    * @param {Object[]} hand - group of cards to be altered
    * @param {Object[]} setHand - useState value used to alter the hand
    * @param {number[]} changeCards - amount of cards to be swapped out
    */
    function change(hand, setHand, changeCards) {//hide button after use
        changeCards.sort( (a, b) => {return a - b});

        let j = 0;
        let handNew = hand.map( (e, index) => {
            if(index === changeCards[j]) {
                e = deck[deck.length - 1];
                deck.pop();
                j++;
            }
            return e;
        });

        setHand(handNew);
    }

    function bet(ante, setAnte, newAnte) {//min bet is 100
        setAnte(ante + newAnte);
    }

    function poker() {
        /*Everyone gets five cards with two players posting the small blind and the big blind.
        There’s a round of betting after the initial deal, then everyone discards however many cards they want (starting with the small blind and moving clockwise).
        Each player gets replacement cards. Then there’s another round of betting.
        Finally, each player who hasn’t folded goes to showdown and the best five card poker hand wins (using traditional poker hand rankings).*/
        createDeck();
        shuffle(deck);

        setChipsP(5000);
        setChipsO(5000);

        setBetP(0);
        setBetO(0);

        //player by default is dealt five cards
        draw(handP, setHandP, deck, 5)

        //opponent(s) are dealt five cards
        draw(handO, setHandO, deck, 5);

        //first betting round
        //opponent calls
        bet(0, setBetO, 100);

        //opponent changes cards
        //await player input

        //second betting round
        //await player input

        //showdown
        //placeholder for evaluating the winner
        document.getElementById("gameResult").hidden = false;
    }

    return (//might have to change the key in the map; occasional bug adding a card to the hand when changing cards
        <div className="pokerTable">
            <header className="App-header">
                <p>Player Chips: {chipsP}</p>
                <p>Bet: {betP}</p>
                <div id="handPlayer">
                    Player Hand
                    {handP.map((e, index) => (
                        <input onClick={() => changeCards.push(index)} type="image" key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <p>Opponent Chips: {chipsO}</p>
                <p>Bet: {betO}</p>
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
                <button onClick={() => change(handP, setHandP, changeCards)}>
                    Change Cards
                </button>
            </div>
            <div id="gameResult" hidden={true}>
                {winner.current}
            </div>
        </div>
  );
}

export default Game;
