module.exports = class Condition {
    constructor(type, left, comparer, right) {
        this.type = type;
        this.left = left;
        this.comparer = comparer;
        this.right = right;
    }

    isValid(caster, target) {
        if (this.comparer === undefined) {
            return true;
        }

        const left = this.left.toLowerCase();
        let right;

        if (typeof this.right === 'string') {
            right = target[this.right.toLowerCase()];

        } else if (typeof this.right === 'number') {
            right = this.right;
        }

        if (this.comparer === '<') {
            if (caster[left] > right) {
                return false;
            }

        } else if (this.comparer === '>') {
            if (caster[left] < right) {
                return false;
            }

        } else if (this.comparer === '=') {
            if (caster[left] != right) {
                return false;
            }
        }

        console.log(`Condition for : ${left} ${this.comparer} ${right} is Valid!`);

        return true;
    }
}