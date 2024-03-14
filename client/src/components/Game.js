import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from './../UserContext';

function Game() {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const {winCall} = useContext(UserContext);
    const {lossCall} = useContext(UserContext);
    const {tieCall} = useContext(UserContext);

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

    useEffect(() => {
        const valP = handEval(handP);
        const valO = handEval(handO);
        if(fold) winner.current = "opponent wins";
        else{
             if(valP[0] > valO[0]) {
                winner.current = "player wins";
             }
             else if(valP[0] < valO[0]) {
                winner.current = "opponent wins";
             }
             else { //both players have same type of hand
                 if(valP[1] > valO[1]) {
                    winner.current = "player wins";
                 }
                 else if(valP[1] < valO[1]) {
                    winner.current = "opponent wins";
                 }
                 else {
                    winner.current = "tie";
                 }
             }
        }

        console.log(winner.current);//test
    },[handP, handO, fold]);

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
        document.getElementById("startBtn").classList.add('collapse');
        document.getElementById("gameInfo").classList.remove('invisible');

        setChipsP(5000);
        setBetP(0);

        draw(handP, setHandP, deck, 5)
        draw(handO, setHandO, deck, 5);

        //first betting round
        //opponent calls
        bet(0, setBetO, 100, 5000, setChipsO);

        //opponent changes cards
    }

    async function pokerTurn() {
        //player input triggers method
        turns++;

        //opponent calls, raises or folds

        //showdown
        if(turns >= 2) {
            document.getElementById("gameOptions").classList.add('invisible');
            document.getElementById("gameResult").classList.remove('invisible');

            if(token !== '') {
                if(winner.current === "opponent wins") {
                    let res = await lossCall();//test
                }
                else if(winner.current === "player wins") {
                    let res = await winCall();//test
                }
                else {
                    let res = await tieCall();//test
                }
            }

        }
    }

    /*might have to change the key in the map;
    occasional visual bug on change cards;
     move div onClick=pokerTurn() to occur only on button click;
     raise not working correctly*/
    return (
        <div className="flex flex-col items-center h-screen bg-green-800 text-white">
            <button id="startBtn" className="border rounded bg-black px-[40px] py-[10px] mt-[260px]" onClick={() => poker()}>Start the Game</button>
            <div id="gameInfo" className="invisible flex items-center flex-col" >

                <div className="flex flex-col items-center border bg-red-900">
                    <h1>Opponent</h1>
                    <div className="flex bg-black px-[40px]">
                        <p className="pr-[10px]">Chips: {chipsO}</p>
                        <p>Bet: {betO}</p>
                    </div>
                </div>
                <div id="handOpponent">
                    {handO.map((e, index) => (
                        <input type="image" key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <div className="flex flex-col items-center border bg-red-900">
                    <h1>Player</h1>
                    <div className="flex bg-black px-[40px]">
                        <p className="pr-[10px]">Chips: {chipsP}</p>
                        <p>Bet: {betP}</p>
                    </div>
                </div>
                <div id="handPlayer">
                    {handP.map((e, index) => (
                        <input onClick={() => changeCards.push(index)} type="image" key={e.name} src={require("../deck/" + e.name + "_of_" + e.suit + "s.png")} alt="card" width="200px" length="250px"/>
                    ))}
                </div>

                <div id="gameOptions" className="flex flex-col text-white" onClick={() => pokerTurn()}>
                    <button className="border rounded bg-black" onClick={() => bet(betP, setBetP, betO - betP, chipsP, setChipsP)}>
                        Call
                    </button>
                    <button className="border rounded bg-black" onClick={() => bet(betP, setBetP, betNum, chipsP, setChipsP)}>
                        Raise
                    </button>
                    <input type="number" className="border rounded bg-black" onChange={e => setBetNum(e)} placeholder="Enter Bet Amount"></input>
                    <button className="border rounded bg-black" onClick={() => setFold(true)}>
                        Fold
                    </button>
                    <button id="changeBtn" className="border rounded bg-black" onClick={() => change(handP, setHandP, changeCards)}>
                        Change Cards
                    </button>
                </div>
                <div id="gameResult" className="invisible">
                    {winner.current}
                    <button onClick={() => navigate('/')}>Exit</button>
                </div>
            </div>
        </div>
  );
}

export default Game;
