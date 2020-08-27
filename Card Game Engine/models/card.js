const conditionProcessor = require('../utilities/condition-processor');

module.exports = class Card {
    constructor(name, value, type, trigger, owner, manaCost, health, maxHealth, attack) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.trigger = trigger;
        this.owner = owner;

        this.manaCost = manaCost;
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
    }

    battle(target) {
        this._triggerChecker('battle');

        if (target.hasOwnProperty('attack')) {
            this.takeDamage(target.attack);
        }
        target.takeDamage(card.attack);
    }

    takeDamage(damage) {
        this.triggerChecker('takeDamage');
        this.health -= damage;
    }

    triggerChecker(type) {
        if (type === trigger.condition.type) {
            conditionProcessor(trigger.condition, trigger.action, owner);
        }
    }
};