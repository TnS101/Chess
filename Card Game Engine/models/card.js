const conditionProcessor = require('../utilities/condition-processor');

module.exports = class Card {
    constructor(name, value, type, trigger, manaCost, health, maxHealth, attack) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.trigger = trigger;

        this.manaCost = manaCost;
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
    }

    battle(target) {
        this._triggerChecker('Battle');

        if (target.hasOwnProperty('attack')) {
            this.takeDamage(target.attack);
        }
        target.takeDamage(card.attack);
    }

    takeDamage(damage) {
        this.triggerChecker('TakeDamage');
        this.health -= damage;
    }

    triggerChecker(type, player) {
        if (this.trigger !== undefined) {
            if (type === this.trigger.action.type) {
                conditionProcessor(this.trigger, player);
                console.log(`Trigger with type : ${type} was triggered!`);
            }
        }
    }
};