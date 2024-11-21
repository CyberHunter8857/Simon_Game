let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let hscore = document.querySelector(".hscore");
let starter = document.querySelector(".blank");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started...");
    started = true;
    starter.classList.add("dispnone");

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;

  h2.innerText = `Level ${level}`;

  //random btn choose
  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  let randbtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randbtn);
}

function checkAns(idx) {
  // console.log("current level:",level);

  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <u>${level}</u><br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250),
      starter.classList.remove("dispnone");
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  userColour = btn.getAttribute("id");
  userSeq.push(userColour);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  if (level > highScore) {
    highScore = level;
    hscore.innerText = `High Score: ${highScore}`;
  }

  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
