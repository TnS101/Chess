import { render } from "./page/board-renderer.js";
import { start } from "./game/start.js";

window.onload = exe();

function exe() {
    render();
    start();
}