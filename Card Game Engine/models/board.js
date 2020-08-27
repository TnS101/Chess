module.exports = class Board {
  constructor(width, height) {
    this.slots = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let i = 0; i < width; i++) {
        row.push("*");
      }
      this.slots.push(row);
    }
  }

  setCustomSlot(x, y) {
    this._validate(x, y);
    if (!this.slots[x][y].includes("!")) {
      this.slots[x][y] += "!";
    }
  }

  removeCustomSlot(x, y) {
    this._validate(x, y);

    if (this.slots[x][y].includes("!")) {
      let slot = this.slots[x][y];
      const index = slot.indexOf("!");

      this.slots[x][y] =
        slot.slice(0, index) + slot.slice(index + 1, slot.length);
    }
  }

  print() {
    this.slots.reduce(function (acc, row) {
      console.log(row);
    }, 0);
  }

  _validate(x, y) {
    if (x > this.slots[0].length || y > this.slots.length) {
      throw new Error("Invalid position coordinates");
    }
  }
};
