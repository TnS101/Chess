const rng = require("./rng");

module.exports = function exe(trigger, player) {
    const condition = trigger.condition;
    const action = trigger.action;

    if (condition !== undefined) {
        if (condition.comparer === '<') {
            if (condition.left > condition.right) {
                return;
            }

        } else if (condition.comparer === '>') {
            if (condition.left < condition.right) {
                return;
            }

        } else if (condition.comparer === '=') {
            if (condition.left != condition.right) {
                return;
            }
        }
    }

    if (action.type === 'Draw') {
        player.draw(action.value);

    } else if (action.type === 'AddToHand') {
        if (action.subType === 'Random') {
            const cards = action.context;

            for (let i = 0; i < action.value; i++) {
                const card = cards[rng(0, cards.length)];
                card.manaCost -= action.subValue;

                player.hand.push(card);
            }

        } else {
            const card = cards.find(c => c.name === action.cardName);

            for (let i = 0; i < action.value; i++) {
                card.manaCost -= action.subValue;
                player.hand.push(card);
            }
        }

    } else if (action.type === 'AddToDeck') {
        if (action.subType === 'Random') {
            const cards = action.context;

            for (let i = 0; i < action.value; i++) {
                const card = cards[rng(0, cards.length)];
                card.manaCost -= action.subValue;

                player.deck.push(card);
            }

        } else {
            const card = cards.find(c => c.name === action.cardName);

            for (let i = 0; i < action.value; i++) {
                card.manaCost -= action.subValue;
                player.deck.push(card);
            }
        }

    } else if (action.type === 'FromDeck') {
        const cards = player.deck;
        const result = [];

        const card = cards.find(c => c.name === action.cardName);

        if (action.hasOwnProperty('subCondition')) {

            for (let i = 0; i < action.value; i++) {
                if (action.subCondition.comparator === '<') {
                    result.push(cards.find(c => c[action.subCondition.type] < action.subCondition.value));

                } else if (action.subCondition.comparator === '>') {
                    result.push(cards.find(c => c[action.subCondition.type] > action.subCondition.value));

                } else if (action.subCondition.comparator === '=') {
                    result.push(cards.find(c => c[action.subCondition.type] == action.subCondition.value));
                }
            }
        } else {
            for (let i = 0; i < action.value; i++) {
                result.push(card);
            }
        }

        if (action.subType === 'AddToHand') {
            result.reduce(function(acc, card) {
                if (player.hand.length < player.hand.maxLength) {
                    player.hand.push(card);
                }
            }, 0);

        } else if (action.subType === 'Remove') {
            result.reduce(function(acc, card) {
                if (player.deck.length > 0) {

                    if (player.deck.includes(card)) {
                        player.deck.splice(player.deck.indexOf(card), 1);
                    }
                }
            }, 0);

        } else if (action.subType === 'Place') {
            result.reduce(function(acc, card) {
                if (player.field.length < player.fieldMaxLength) {
                    player.field.push(card);
                }
            }, 0);
        }
    }
};