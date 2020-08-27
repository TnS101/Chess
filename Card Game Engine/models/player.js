const rng = require('../utilities/rng');

module.exports = class Player {
    constructor(name, deck, startHandSize, maxHandSize, yourTurn, canSwapHand, health, mana, maxHealth, maxMana) {
        if (startHandSize >= maxHandSize) {
            throw new Error(`Starting Hand Size must not be more or equal to the Maximum Hand Size! (${startHandSize} < ${maxHandSize})`);
        }

        this.name = name;
        this.deck = deck;
        this.hand = [];
        this.maxHandSize = maxHandSize;
        this.yourTurn = yourTurn;
        this.canSwapHand = canSwapHand

        this.health = health;
        this.mana = mana;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;

        this.draw(startHandSize);
    }

    draw(amount) {
        if (amount <= this.deck.length) {
            for (let i = 0; i < amount; i++) {
                if (this.hand.length < this.maxHandSize) {
                    let card = context[rng(0, context.length)];

                    while (card == undefined) {
                        card = context[rng(0, context.length)];
                    }

                    this.hand.push(card);
                    this.deck.splice(this.deck.indexOf(card), 1);
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
}