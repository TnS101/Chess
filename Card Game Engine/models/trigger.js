const conditionProcessor = require('../utilities/condition-processor');

module.exports = class Trigger {
    constructor(condition, actionType, actionValue, actionSubType, actionSubValue, cardName, subCondition) {
        this.condition = condition;
        this.action = { type: actionType, value: actionValue, subType: actionSubType, subValue: actionSubValue, cardName: cardName };
        this.subCondition = subCondition;
    }

    fire(caster, target) {
        conditionProcessor(this, caster, target);
        console.log(`Trigger with type : ${this.condition.type} was fired!`);
    }
}