  export function render() {
      const board = document.getElementById("board");

      for (let i = 0; i <= 7; i++) {
          const character = String.fromCharCode(65 + i);
          const clonedColumn = document.getElementsByClassName("column")[0].cloneNode(true);

          const indexator = document.createElement("span");
          indexator.textContent = character;

          //   document.getElementsByClassName("pole")[0].appendChild(indexator);
          //   document.getElementsByClassName("pole")[1].appendChild(indexator);

          clonedColumn.setAttribute("id", character);
          clonedColumn.style.display = "inline-block";

          paint(clonedColumn, i);
          board.appendChild(clonedColumn);
      }

  }

  function paint(child, index) {
      Array.from(child.children).reduce(function(acc, curr, i) {
          const span = curr.getElementsByClassName("index")[0];
          if (span != undefined && (Number(span.textContent) + index + Math.floor(i / 8)) % 2 == 0) {
              curr.className = "grid-item black";
          } else {
              curr.className = "grid-item white";
          }
      }, 0);
  }