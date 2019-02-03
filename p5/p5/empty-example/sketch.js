function setup() {
  // put setup code here
  createCanvas(720, 400);
  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);
  x = random(1000);
  y = random(500);
  rad = random(600);
}

function draw() {
  // put drawing code here
  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(x, y, rad, rad);
}

function mousePressed() {
  // Check if mouse is clicked
    ellipse(x, y, rad, rad);
}
