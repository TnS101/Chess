const Board = require("./models/board");
const Player = require('./models/player');
const Card = require('./models/card');
const Trigger = require('./models/trigger');
const Condition = require('./models/condition');

const drawCondition = new Condition('Draw', 'Health', '=', 1);
const deathCondition = new Condition('Death');

const trigger = new Trigger(drawCondition, 'Draw', 1);
const deathTrigger = new Trigger(deathCondition, 'FromDeck', 1, 'Place', 0, 'Card1');

const effectCard = new Card('ToDraw', 1, 'Effect', trigger, 0, 0, 0, 0);
const card1 = new Card('Card1', 1, 1, undefined, 1, 1, 1, 1);
const card2 = new Card('Card1', 1, 1, undefined, 1, 1, 1, 1);
const card3 = new Card('Card3', 1, 1, deathTrigger, 1, 1, 1, 0);

const deck = [effectCard, card1, card2, card3];
const deck2 = [card1, card3, card2];

const player1 = new Player('Pesho', deck, 1, 5, true, 5, false, 1, 1, 1, 1);
const player2 = new Player('To6o', deck2, 1, 5, false, 5, false, 1, 1, 1, 1);

player1.draw(1);
console.log(player1.hand);

player1.placeCard('Card1', 4);

player2.field.push(card3);

player1.attack('Card1', 0, player2);

console.log(player1.field);
console.log(player2.field);