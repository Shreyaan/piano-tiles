const WIDTH = 90;
const HEIGHT = 140;
var rightTile = {};
var highScore = 0;
highScore = (Number(localStorage.getItem("highScore")) ?? 0) 
// document.getElementById('highscore').innerHTML = highScore;
const WINNING_SCORE = 3000;
let timeLimit = 10;
var time;
var score;

var playing;
var won;

var tiles = [];

let soundA;
let soundH;
let soundJ;
let soundL;
let soundN;
let soundP;
let soundQ;

function setup() {
  let myCanvas = createCanvas(361, 561);
  myCanvas.parent("game");

  time = -1;
  score = 0;
  soundA = loadSound("assets/soundA.mp3");
  soundH = loadSound("assets/soundH.mp3");
  soundJ = loadSound("assets/soundJ.mp3");
  soundL = loadSound("assets/soundL.mp3");
  soundN = loadSound("assets/soundN.mp3");
  soundP = loadSound("assets/soundP.mp3");
  soundQ = loadSound("assets/soundQ.mp3");

  for (var i = 0; i < 4; i++) {
    newRow();
  }

  playing = false;
  won = false;

  textAlign(CENTER);
}

function draw() {
  background(51);

  game();
}

function keyPressed() {
  if ("r" == RETURN) {
    game();
  }
}

function game() {
  drawTiles();

  handleState();
  var textColor = 'white'
  textSize(60);
  fill(textColor);
  text('A', WIDTH/2, HEIGHT*4-50);
  fill(textColor);
  text('S', WIDTH*1.5, HEIGHT*4-50);
  fill(textColor);
  text('D', WIDTH*2.5, HEIGHT*4-50);
  fill(textColor);
  text('F', WIDTH*3.5, HEIGHT*4-50);
}

function drawTiles() {
  for (var i = 0; i < tiles.length; i++) {
    var x = (i % 4) * WIDTH;
    var y = Math.floor(i / 4) * HEIGHT;

    fill(tiles[i] !== 0 ? (tiles[i] === 1 ? "#FFFFFF" : "#FF0000") : "#000000");
    rect(x, y, WIDTH, HEIGHT);

    if (tiles[i - 4] === 55) {
      fill("00aeff");
      rect(x, y, WIDTH, HEIGHT);
    }
  }
}

function handleState() {
  if (!playing) {
    if (time > 0) {
      drawEnd(won);
    } else {
      textSize(60);
      fill("#FF0000");
      text(-time, width / 2, height / 2);

      if (frameCount % 60 === 0) {
        time++;
        if (time === 0) {
          playing = true;
        }
      }
    }
  } else {
    /* draw time */
    textSize(40);
    fill("#00aeff");
    text(`${score} `, width / 2, HEIGHT-100);
    document.querySelector('hr').style.width = (getTime()* 361/timeLimit)+ 'px'
    time++;
    if (time ==timeLimit*100) {
      playing = false;
    }
  }
}

function drawEnd(won) {
  if (won) {
    if(score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById('highscore').innerHTML = highScore;
    }
    background("#66EE66");

    fill("#FFFFFF");
    textSize(60);
    text("Complete!", width / 2, height / 2 - 80);

    fill("#000000");
    textSize(70);
    text(getTime(), width / 2, height / 2);

    fill("#FFFFFF");
    textSize(40);
    text("Press R to restart!", width / 2, height / 2 + 50);
  } else {
    if(score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById('highscore').innerHTML = highScore;
    }
    fill("#FF00FF");
    textSize(60);
    text("Game Over!", width / 2, height / 2);
    textSize(40);
    text(`Press R to restart! \n score: ${score}`, width / 2, height / 2 + 50);
  }
}

function keyPressed() {
  if (!playing) return;
  
    var tile 
    if(keyCode == 65) {
       tile = getClickedTile(0);
    }
    if(keyCode == 83) {
       tile = getClickedTile(91);
    }
    if(keyCode == 68) {
       tile = getClickedTile(181);
    }
    if(keyCode ==  70) {
       tile = getClickedTile(271);
    }
    if (tile == -1) return;

    if (tiles[tile] !== 0) {
      tiles[tile] = -1;
      soundA.play();
      won = false;
      playing = false;
    } else {
      score++;
      newRow();
      switch (tile) {
        case 12:
          soundL.play();
          break;
        case 13:
          soundN.play();
          break;
        case 14:
          soundP.play();
          break;
        case 15:
          soundQ.play();
          break;
      }

      if (score >= WINNING_SCORE) {
        won = true;
        playing = false;
      }
    }
  
}
function mouseClicked() {
  if (!playing) return;
  if (mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
    var tile = getClickedTile(mouseX, mouseY);
    if (tile == -1) return;

    if (tiles[tile] !== 0) {
      tiles[tile] = -1;
      soundA.play();
      won = false;
      playing = false;
    } else {
      score++;
      newRow();
      switch (tile) {
        case 12:
          soundL.play();
          break;
        case 13:
          soundN.play();
          break;
        case 14:
          soundP.play();
          break;
        case 15:
          soundQ.play();
          break;
      }

      if (score >= WINNING_SCORE) {
        won = true;
        playing = false;
      }
    }
  }
}

function getClickedTile(mX) {
  for (var i = 0; i < 4; i++) {
    var lowerBound = i * WIDTH;
    var upperBound = (i + 1) * WIDTH;
    if (mX >= lowerBound && mX <= upperBound) {
      rightTile.upperBound = upperBound;
      rightTile.lowerBound = lowerBound;
      return i + 12;
    }
  }

  return -1;
}

function newRow() {
  var column = Math.floor(random(4));

  for (var i = 0; i < 4; i++) {
    tiles.unshift(column === i ? 0 : 1);
  }
}

function getTime() {
  return Math.round(time / 10) / 10;
}
