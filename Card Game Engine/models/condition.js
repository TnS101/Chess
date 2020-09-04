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

        if (this.comparer === '<') {
            if (caster[this.left] > target[this.right]) {
                return false;
            }

        } else if (this.comparer === '>') {
            if (caster[this.left] < target[this.right]) {
                return false;
            }

        } else if (this.comparer === '=') {
            if (caster[this.left] != target[this.right]) {
                return false;
            }
        }

        return true;
    }
}