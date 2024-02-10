let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winningContainer = document.querySelector(".winning-container");
let newGameBtn = document.querySelector("#new-game-btn");
let msg = document.querySelector("#msg");

let turn0 = true; //PlayerX, player0
let count = 0;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  winningContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("button was clicked");
    if (turn0) {
      box.innerHTML = "0";
      box.classList.add("player0");
      turn0 = false;
    } else {
      box.innerHTML = "X";
      box.classList.add("playerX");
      turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerHTML = `Game was draw. Start new game`;
  winningContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const shoWinner = (winner) => {
  msg.innerHTML = `Congratulations! Winner is player ${winner}`;
  winningContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerHTML,
    //   boxes[pattern[1]],
    //   boxes[pattern[2]]
    // );

    let val1 = boxes[pattern[0]].innerHTML;
    let val2 = boxes[pattern[1]].innerHTML;
    let val3 = boxes[pattern[2]].innerHTML;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        shoWinner(val1);
        return true;
      }
    }
  }
};

// Calling reset function for reset or new game
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
