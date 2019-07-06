var canvas = document.getElementById("canvas");
var dimension = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerWidth;

var mousex = 0;
var mousey = 0;

// note mouse coordinates usinhg teh x and y axis
document.addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});

var grav = 0.99
dimension.strokeWidth=5;

// function to get a randomised rgba color
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


// function creates a new Ball
function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    dimension.beginPath();
    dimension.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    dimension.fillStyle = this.color;
    dimension.fill();
    //c.stroke();
  };
}

// The ball array. creates 50 new balls and pushes them into an array
var bal = [];
for (var i = 0; i<50; i++){
  bal.push(new Ball());
}

// function to animate the balls
function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight
    canvas.width= tx;
    canvas.height = ty;
  }


requestAnimationFrame(animate);
dimension.clearRect(0,0, tx, ty);
for (var i = 0; i<bal.length; i++) {

  // call function to draw the balls
  bal[i].update();

  // move the balls along X & Y coordinates
  bal[i].y += bal[i].dy;
  bal[i].x += bal[i].dx;


   // Make sure the balls stay on screen
  if (bal[i].y + bal[i].radius >= ty) {
    bal[i].dy = -bal[i].dy * grav;
  } else {
    bal[i].dy += bal[i].vel;
   }

    if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0 ) {
        bal[i].dx = -bal[i].dx;
      }

    // Enlarges the ball when hovered over with the mouse
    if (mousex > bal[i].x - 20 &&
        mousex < bal[i].x + 20 &&
        mousey > bal[i].y - 50 &&
        mousey < bal[i].y + 50 &&
      bal[i].radius <= 70)
        {
       bal[i].radius += 5;
     } else {
       if (bal[i].radius > bal[i].startradius) {
         bal[i].radius += -5;
       }
    }
  }
  // for Loop end
}
// animate end


animate();

// Interval timer. Adds annd removes a ball when called.
setInterval(function() {
  bal.push(new Ball());
  bal.splice(0, 1)
}, 400);
