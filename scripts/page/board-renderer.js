  window.onload = render();

  function render() {
      const board = document.getElementById("board");
      const character = "A";

      for (let i = 0; i < 7; i++) {
          const clonedColumn = document.getElementsByClassName("column")[0].cloneNode(true);
          clonedColumn.setAttribute("id", String.fromCharCode(character.charCodeAt(0) + i));
          clonedColumn.style.display = "inline-block";
          paint(clonedColumn, i);
          board.appendChild(clonedColumn);
      }

  }

  function paint(child, index) {
      Array.from(child.children).reduce(function(acc, curr, i) {
          if ((Number(curr.querySelector("span").textContent) + index + Math.floor(i / 8)) % 2 == 0) {
              curr.className = "grid-item black";
          } else {
              curr.className = "grid-item white";
          }
      }, 0);
  }