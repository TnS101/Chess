const rng = require("./rng");

module.exports = function exe(condition, reward, player) {
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

    if (reward.type === 'Draw') {
        player.draw(reward.value);

    } else if (reward.type === 'AddToHand') {
        if (reward.subType === 'Random') {
            const cards = reward.context;

            for (let i = 0; i < reward.value; i++) {
                const card = cards[rng(0, cards.length)];
                player.deck.add(card, 1, reward.subValue);
            }

        } else {
            const card = cards.find(c => c.name === reward.cardName);
            player.deck.add(card, reward.value, reward.subValue);
        }

    } else if (reward.type === 'FromDeck') {
        const cards = reward.context;
        const result = [];

        const card = cards.find(c => c.name === reward.cardName);

        if (reward.hasOwnProperty('subCondition')) {
            for (let i = 0; i < reward.value; i++) {
                if (reward.subCondition.comparator === '<') {
                    result.push(cards.find(c => c[reward.subCondition.type] < reward.subCondition.value));
                } else if (reward.subCondition.comparator === '>') {
                    result.push(cards.find(c => c[reward.subCondition.type] > reward.subCondition.value));
                } else if (reward.subCondition.comparator === '=') {
                    result.push(cards.find(c => c[reward.subCondition.type] == reward.subCondition.value));
                }
            }
        } else {
            result.push(card);
        }

        if (reward.subType === 'Add') {
            result.reduce(function(acc, card) {
                if (player.hand.length < player.hand.maxLength) {
                    player.hand.length++;
                    player.hand.add(card);
                }
            }, 0);

        } else if (reward.subType === 'Remove') {
            result.reduce(function(acc, card) {
                if (player.deck.length > 0) {
                    player.deck.length--;

                    if (player.deck.includes(card)) {
                        player.deck.splice(player.deck.indexOf(card), 1);
                    }
                }
            }, 0);

        } else if (reward.subType === 'Place') {
            result.reduce(function(acc, card) {
                if (player.field.slots > 0) {
                    player.field.slots--;
                    player.field.add(card);
                }
            }, 0);
        }
    }
};