var canvas = document.getElementById('canvas');
var dimension = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerWidth;

var mousex = 0;
var mousey = 0;

document.addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});


function randomColor(){
  return(
    "rgba("+
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}


function Ball(){
  this.color = randomColor();
}
