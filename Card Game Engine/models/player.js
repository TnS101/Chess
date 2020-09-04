const rng = require('../utilities/rng');

module.exports = class Player {
    constructor(name, deck, startHandSize, maxHandSize, yourTurn, fieldMaxLength, canSwapHand, health, mana, maxHealth, maxMana) {
        if (startHandSize >= maxHandSize) {
            throw new Error(`Starting Hand Size must not be more or equal to the Maximum Hand Size! (${startHandSize} < ${maxHandSize})`);
        }

        this.name = name;
        this.deck = deck;
        this.hand = [];
        this.field = [];

        this.maxHandSize = maxHandSize;
        this.yourTurn = yourTurn;
        this.fieldLength = 0;
        this.fieldMaxLength = fieldMaxLength;
        this.canSwapHand = canSwapHand;

        this.health = health;
        this.mana = mana;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;

        this.draw(startHandSize);
    }

    draw(amount) {
        if (this.deck.length - amount > 0) {
            for (let i = 0; i < amount; i++) {
                if (this.hand.length < this.maxHandSize) {
                    let card = this.deck[rng(0, this.deck.length)];

                    while (card == undefined) {
                        card = this.deck[rng(0, this.deck.length)];
                    }

                    this.deck.splice(this.deck.indexOf(card), 1);
                    this.hand.push(card);

                    card.triggerChecker('Draw', this);

                    console.log('<--------Draw-------->');
                }
            }
        }
    }

    swapHand(amount, cards) {
        if (this.canSwapHand) {

            this.canSwapHand = false;

            for (let i = 0; i < amount; i++) {
                let card = cards[i];

                this.hand.splice(this.hand.indexOf(card), 1);
                this.deck.push(card);
            }

            this.draw(amount);
        }
    }

    placeCard(name, position) {

        if (position >= this.fieldMaxLength) {
            throw new Error(`Position must be less than the Field Max Length! (${position} < ${this.fieldMaxLength})`);
        }

        if (this.fieldLength < this.fieldMaxLength) {
            const card = this.hand.find(c => c.name === name);

            if (card.manaCost <= this.mana) {
                this.mana -= card.manaCost;

                this.hand.splice(this.hand.indexOf(card), 1);
                this.field.splice(position, 0, card);
                this.fieldMaxLength++;

                card.triggerChecker('Place', this, this);

                console.log('<--------Place-------->');
            }
        }
    }

    giveUp() {
        console.log('Your opponent has won the Game!');
    }

    attack(cardName, index, opponent) {
        const card = this.field.find(c => c.name === cardName);
        const target = opponent.field[index];

        if (card.attack > 0 && card.health > 0) {
            card.battle(target);

            if (card.health <= 0) {
                this.field.splice(this.field.indexOf(card), 1);
                card.triggerChecker('Death', this, this);
            }

            if (target.health <= 0) {
                if (!target.hasOwnProperty('attack')) {
                    console.log('You have won the Game!');

                } else {
                    opponent.field.splice(opponent.field.indexOf(target), 1);
                    target.triggerChecker('Death', opponent, opponent);
                }
            }
        }
    }

    takeDamage(damage) {
        this.health -= damage;

        if (this.health <= 0 && this.maxHealth > 0) {
            console.log('Your opponent has won the Game!');
        }
    }
}