
let previousMinute = -1;
let paper;

const crayonColors = [
  "#E94B35", "#F28C28", "#EFCB36",
  "#75A85B", "#279C91", "#4286C6",
  "#6755A5", "#A65C9B", "#E47B9B",
  "#C65B45", "#8B684B", "#333333"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);

  frameRate(1);

  createPaper();
}

// Create paper texture
function createPaper() {
  paper = createGraphics(width, height);
  paper.background("#F6F0DF");

  randomSeed(100);

  for (let i = 0; i < 500; i++) {
    paper.stroke(120, 100, 70, 30);
    paper.point(random(width), random(height));
  }
}

// Automatically resize when browser changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createPaper();
}

function draw() {
  let h = hour();
  let m = minute();
  let s = second();

  if (m !== previousMinute) {
    console.log("Minute changed:", m);
    previousMinute = m;
  }

  background("#F6F0DF");
  image(paper, 0, 0);

  // Scale clock to fit the screen
  let scaleFactor = min(width, height) / 700;

  translate(width / 2, height / 2);
  scale(scaleFactor);

  let mainColor = crayonColors[h % 12];

  // TITLE
  noStroke();
  fill("#29251F");
  textStyle(BOLD);
  textSize(23);
  text("THE CRAYON CLOCK", 0, -310);

  textStyle(NORMAL);
  textSize(11);
  text("A DRAWING OF TIME", 0, -287);

  // HOURS: 12 marks around the outside
  for (let i = 0; i < 12; i++) {
    push();
    rotate(i * 30 - 90);

    if (h % 12 === i) {
      waxStroke(0, -235, 0, -185,
        crayonColors[i], 17, i + 10);
    } else {
      waxStroke(0, -235, 0, -215,
        "#C9C0AD", 5, i + 10);
    }

    pop();
  }

  // MINUTES: 60 marks in a circle
  for (let i = 0; i < 60; i++) {
    push();
    rotate(i * 6 - 90);

    if (i <= m) {
      waxStroke(
        0, -175, 0, -145,
        i === m ? mainColor : "#E58B48",
        i === m ? 13 : 7,
        i + 100
      );
    } else {
      waxStroke(
        0, -175, 0, -145,
        "#D6CCB9", 3, i + 100
      );
    }

    pop();
  }

  // CENTER: layered crayon drawing
  for (let i = 0; i < 7; i++) {
    push();
    rotate(i * 25 + s * 0.4);

    waxStroke(-65, 0, 65, 0,
      mainColor, 16, i + 200);

    pop();
  }

  // SECONDS: moving dot around the outside
  let secondAngle = s * 6 - 90;

  push();
  rotate(secondAngle);

  noStroke();
  fill("#29251F");
  circle(0, -260, 18);

  fill(mainColor);
  circle(0, -260, 11);

  pop();

  // DECORATIVE CRAYON MARKS
  for (let i = 0; i < 8; i++) {
    push();
    rotate(i * 45 + s);

    waxStroke(0, 285, 12, 295,
      crayonColors[i], 5, i + 300);

    pop();
  }

  // BOTTOM TEXT
  noStroke();
  fill("#29251F");
  textStyle(NORMAL);
  textSize(11);
}

// CRAYON TEXTURE FUNCTION
function waxStroke(x1, y1, x2, y2, col, thickness, seed) {

  randomSeed(seed);

  // Several imperfect strokes create a wax texture
  for (let i = 0; i < 5; i++) {

    let offset = random(-thickness / 2, thickness / 2);

    stroke(col);
    strokeWeight(random(2, 4));
    strokeCap(ROUND);

    line(
      x1 + offset,
      y1 + random(-2, 2),
      x2 + offset + random(-3, 3),
      y2 + random(-3, 3)
    );
  }
}
