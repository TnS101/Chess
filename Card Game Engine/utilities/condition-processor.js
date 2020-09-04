const rng = require("./rng");

module.exports = function exe(trigger, caster, target) {
    const action = trigger.action;

    if (!trigger.condition.isValid(caster, target)) {
        return false;
    }

    if (action.type === 'Draw') {
        caster.draw(action.value);

    } else if (action.type === 'AddToHand') {
        if (action.subType === 'Random') {
            const cards = action.context;

            for (let i = 0; i < action.value; i++) {
                const card = cards[rng(0, cards.length)];
                card.manaCost -= action.subValue;

                caster.hand.push(card);
            }

        } else {
            const card = cards.find(c => c.name === action.cardName);

            for (let i = 0; i < action.value; i++) {
                card.manaCost -= action.subValue;
                caster.hand.push(card);
            }
        }

    } else if (action.type === 'AddToDeck') {
        if (action.subType === 'Random') {
            const cards = action.context;

            for (let i = 0; i < action.value; i++) {
                const card = cards[rng(0, cards.length)];
                card.manaCost -= action.subValue;

                caster.deck.push(card);
            }

        } else {
            const card = cards.find(c => c.name === action.cardName);

            for (let i = 0; i < action.value; i++) {
                card.manaCost -= action.subValue;
                caster.deck.push(card);
            }
        }

    } else if (action.type === 'FromDeck') {
        const cards = caster.deck;
        const result = [];

        const card = cards.find(c => c.name === action.cardName);

        if (trigger.subCondition !== undefined) {
            for (let i = 0; i < action.value; i++) {
                result.push(cards.find(c => c.trigger.subCondition.isValid(caster, target)));
            }

        } else {
            for (let i = 0; i < action.value; i++) {
                result.push(card);
            }
        }

        if (action.subType === 'AddToHand') {
            result.reduce(function(acc, card) {
                if (caster.hand.length < caster.hand.maxLength) {
                    caster.hand.push(card);
                }
            }, 0);

        } else if (action.subType === 'Remove') {
            result.reduce(function(acc, card) {
                if (caster.deck.length > 0) {

                    if (caster.deck.includes(card)) {
                        caster.deck.splice(caster.deck.indexOf(card), 1);
                    }
                }
            }, 0);

        } else if (action.subType === 'Place') {
            result.reduce(function(acc, card) {
                if (caster.field.length < caster.fieldMaxLength) {
                    caster.field.push(card);
                }
            }, 0);
        }
    }

    return true;
};