const rng = require("./rng");

module.exports = function exe(condition, action, player) {
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

    if (action.type === 'Draw') {
        player.draw(action.value);

    } else if (action.type === 'AddToHand') {
        if (action.subType === 'Random') {
            const cards = action.context;

            for (let i = 0; i < action.value; i++) {
                const card = cards[rng(0, cards.length)];

                player.deck.add(card, 1, action.subValue);
            }

        } else {
            const card = cards.find(c => c.name === action.cardName);
            player.deck.add(card, action.value, action.subValue);
        }

    } else if (action.type === 'FromDeck') {
        const cards = action.context;
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
            result.push(card);
        }

        if (action.subType === 'Add') {
            result.reduce(function(acc, card) {
                if (player.hand.length < player.hand.maxLength) {
                    player.hand.add(card);
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
                    player.field.add(card);
                }
            }, 0);
        }
    }
};