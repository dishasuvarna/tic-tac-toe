let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");

let turnX = true;
let count = 0;
let xWins = 0, oWins = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      box.style.color = "#ff4c4c";
      turnX = false;
    } else {
      box.innerText = "O";
      box.style.color = "#4c6fff";
      turnX = true;
    }
    box.disabled = true;
    count++;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return;
    }
  }
  if (count === 9) {
    msg.innerText = "It's a Draw 🤝";
    msgContainer.classList.remove("hide");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Winner 🎉 Player ${winner}`;
  msgContainer.classList.remove("hide");
  if (winner === "X") {
    xWins++;
    scoreX.innerText = xWins;
  } else {
    oWins++;
    scoreO.innerText = oWins;
  }
};

const resetGame = () => {
  turnX = true;
  count = 0;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
