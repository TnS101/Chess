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
        if (target.hasOwnProperty('attack')) {
            this.takeDamage(target.attack);
        }
        target.takeDamage(this.attack);

        this.triggerChecker('Battle');

        console.log(`<--------${this.name} battles ${target.name}-------->`);
    }

    takeDamage(damage) {
        this.health -= damage;
        this.triggerChecker('TakeDamage');
    }

    triggerChecker(type, caster, target) {
        if (this.trigger !== undefined) {
            if (type === this.trigger.condition.type) {
                this.trigger.fire(caster, target);
            }
        }
    }
};