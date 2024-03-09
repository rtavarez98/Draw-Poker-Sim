import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Game() {
    const navigate = useNavigate();
    const [handP, setHandP] = useState([]);
    const [chipsP, setChipsP] = useState();
    const [betP, setBetP] = useState();
    const [betNum, setBetNum] = useState();
    const [fold, setFold] = useState();
    const [handO, setHandO] = useState([]);//remove or move to make # of opponents variable?
    const [chipsO, setChipsO] = useState();//remove or move to make # of opponents variable?
    const [betO, setBetO] = useState();//remove or move to make # of opponents variable?
    const changeCards = [];//limit to five + eliminate duplicates?
    let turns = 0;
    let winner = useRef();//current value not being displayed

    const deck = [];
    const suits = ["heart","diamond","club","spade"];
    const names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

    createDeck();
    shuffle(deck);

    useEffect(() => { //might have to move api calls somewhere else
        const valP = handEval(handP);
        const valO = handEval(handO);
        if(fold) winner.current = "opponent wins";
        else{
             if(valP[0] > valO[0]) {
                winner.current = "player wins";
                //api call
             }
             else if(valP[0] < valO[0]) {
                winner.current = "opponent wins";
                //api call
             }
             else { //both players have same type of hand
                 if(valP[1] > valO[1]) {
                    winner.current = "player wins";
                    //api call
                 }
                 else if(valP[1] < valO[1]) {
                    winner.current = "opponent wins";
                    //api call
                 }
                 else {
                    winner.current = "tie";
                    //api call
                 }
             }
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
        document.getElementById("changeBtn").hidden = true;
    }

    function bet(ante, setAnte, newAnte, chips, setChips) {//min bet should be 100
        setChips(chips - newAnte);
        setAnte(ante + newAnte);
    }

    function poker() {
        /*Everyone gets five cards with two players posting the small blind and the big blind.
        There’s a round of betting after the initial deal, then everyone discards however many cards they want (starting with the small blind and moving clockwise).
        Each player gets replacement cards. Then there’s another round of betting.
        Finally, each player who hasn’t folded goes to showdown and the best five card poker hand wins (using traditional poker hand rankings).*/
        document.getElementById("startBtn").hidden = true;

        setChipsP(5000);
        setBetP(0);

        draw(handP, setHandP, deck, 5)
        draw(handO, setHandO, deck, 5);

        //first betting round
        //opponent calls
        bet(0, setBetO, 100, 5000, setChipsO);

        //opponent changes cards
    }

    function pokerTurn() {
        //player input triggers method
        turns++;

        //opponent calls, raises or folds

        //showdown
        if(turns >= 2) {
            document.getElementById("gameOptions").hidden = true;
            document.getElementById("gameResult").hidden = false;

            //if signed in
            if(winner.current === "opponent wins") {
                axios.patch("http://localhost:5000/loss", {});//test
            }
            else if(winner.current === "player wins") {
                axios.patch("http://localhost:5000/win", {});//test
            }
            else {
                axios.patch("http://localhost:5000/tie", {});//test
            }
        }
    }

    /*might have to change the key in the map;
     occasional bug adding a card to the hand when changing cards;
     move div onClick=pokerTurn() to occur only on button click;
     raise not working correctly*/
    return (
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

                <button id="startBtn" onClick={() => poker()}>
                    Start The Game
                </button>
            </header>
            <div id="gameOptions" onClick={() => pokerTurn()}>
                <button onClick={() => bet(betP, setBetP, betO - betP, chipsP, setChipsP)}>
                    Call
                </button>
                <button onClick={() => bet(betP, setBetP, betNum, chipsP, setChipsP)}>
                    Raise
                </button>
                <input type="number" onChange={e => setBetNum(e)} placeholder="Enter Bet Amount"></input>
                <button onClick={() => setFold(true)}>
                    Fold
                </button>
            </div>
            <button id="changeBtn" onClick={() => change(handP, setHandP, changeCards)}>
                Change Cards
            </button>
            <div id="gameResult" hidden={true}>
                {winner.current}
                <button onClick={() => navigate('/')}>Exit</button>
            </div>
        </div>
  );
}

export default Game;
