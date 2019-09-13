let p1 = 1;
let p2 = 2;
let tie = 3;
let e = 0;
let wi = 400;
let hi = 400;
let w = wi / 3;
let h = hi / 3;
let txtSz = wi / 3;
let endTxtSz = wi / 10;
let winner = e // e for undecided, p1 or p2 for a win, tie for tie

let symbols = ['', 'X', 'O']
let currPlayer = 1;

let board = [
  [e, e, e],
  [e, e, e],
  [e, e, e]
];

function setup() {
  createCanvas(wi, hi);
}

function mousePressed() {

  if (isGameOver()) {
    restart();
    return;
  }

  let i = floor(mouseX * 3 / width);
  let j = floor(mouseY * 3 / height);
  nextTurn(i, j);
}

function draw() {
  background(220);
  drawLines();

  textSize(txtSz);
  fill(0);
  textAlign(CENTER, CENTER);
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {
      let place = board[i][j];
      text(symbols[place], j * w + w / 2, i * h + h / 2);
    }
  if (isGameOver()) gameOver();
}

function drawLines() {
  strokeWeight(4);
  for (var i = 0; i < 2; i++) {
    line(0, (i + 1) * h, width, (i + 1) * h);
    line((i + 1) * w, 0, (i + 1) * w, height);
  }
}

// restarts the game, only after a match is finished
function restart() {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) board[i][j] = e;
  winner = e;
  currPlayer = 1;
}

//executes a valid move
function nextTurn(i, j) {
  if (board[j][i] != e) return;
  board[j][i] = currPlayer;
  checkWinner();
  if (currPlayer == p1) currPlayer = p2;
  else currPlayer = p1;
}

// finds the winner, if any
function checkWinner() {
  if (winner != e) return;
  for (var i = 0; i < 3; i++)
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2])
      if (board[i][0] != e) winner = currPlayer;
  for (var i = 0; i < 3; i++)
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i])
      if (board[0][i] != e) winner = currPlayer;
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2])
    if (board[0][0] != e) winner = currPlayer;
  if (board[0][2] == board[1][1] && board[1][1] == board[2][0])
    if (board[1][1] != e) winner = currPlayer;
  if (checkFull() && winner == e) winner = tie;
  //print(winner);
}

function checkFull() {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++)
      if (board[i][j] == e) return false;
  return true;
}

function gameOver() {
  textSize(endTxtSz);
  fill(128 + 60 * sin(0.1 * frameCount), 0, 0);
  let txt = "PLAYER " + winner + " WINS!";
  if (winner == tie) txt = "TIE!"
  text(txt, width / 2, height / 2)
}

function isGameOver() {
  return winner != e;
}