module.exports = class Board {
    constructor(width, height) {
        this.slots = [];

        for (let i = 0; i < height; i++) {
            let row = [];
            for (let i = 0; i < width; i++) {
                row.push({ value: "*", effects: [] });
            }
            this.slots.push(row);
        }
    }

    fillSlot(x, y, type, effect) {
        this._validate(x, y);
        if (!this.slots[x][y].value.includes(type)) {
            let slot = this.slots[x][y];
            slot.value += type;

            if (type === "?") {
                slot.effects.push(effect);
            }
        }
    }

    emptySlot(x, y, type, effect) {
        this._validate(x, y);

        if (this.slots[x][y].value.includes(type)) {
            let slot = this.slots[x][y];
            const index = slot.value.indexOf(type);

            if (type === "?") {
                if (slot.effects.includes(effect)) {
                    slot.effects.splice(slot.effects.indexOf(effect), 1);
                }
            }

            this.slots[x][y] =
                slot.value.slice(0, index) +
                slot.value.slice(index + 1, slot.value.length);
        }
    }

    print() {
        this.slots.reduce(function(acc, row) {
            console.log(row);
        }, 0);
    }

    _validate(x, y) {
        if (x > this.slots[0].length || y > this.slots.length) {
            throw new Error("Invalid position coordinates");
        }
    }
};