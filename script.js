 highScore = (Number(localStorage.getItem("highScore")) ?? 0) 
document.getElementById('highscore').innerHTML = highScore;

window.addEventListener("keypress", function (e) {
  if (e.key == "r") {
    this.window.location.reload();
  }
})

