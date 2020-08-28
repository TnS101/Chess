const conditionProcessor = require('../utilities/condition-processor');

module.exports = class Trigger {
    constructor(conditionType, actionType, actionValue, actionSubType, actionSubValue, cardName) {
        this.condition = {};
        this.action = {};

        this.condition.type = conditionType;
        this.action.type = actionType;
        this.action.value = actionValue;
        this.action.subType = actionSubType;
        this.action.subValue = actionSubValue;
        this.action.cardName = cardName;
    }

    fire(player) {
        conditionProcessor(this, player);
        console.log(`Trigger with type : ${this.condition.type} was triggered!`);
    }
}