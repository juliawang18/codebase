let nums = [];
var count = 0;
let values = [3, 12,35,23,25,14];
var lit = 0;

//Making colors!
var exist_color;
var extract_color;
var sort_color;
var compare_color;

//Me setting stuff up.
function setup() {
  //Me creating the "canvas"
  createCanvas(displayWidth, displayHeight);

  //putting actual colors in color vars
  exist_color = color(198, 222, 239);
  extract_color = color(244, 46, 24);
  sort_color = color(244, 137, 24);
  compare_color = color(107, 168, 67);

  // Me creating the thingies and putting them in nums.
  for (let i = 0; i < 6; i++){
    let num = values[i];
    let xPos = displayWidth/2 - 175 + i * 60;
    nums[i] = new Thing(num, xPos, exist_color);
  }

  nums[0].status = "sorted";

  //Creating the title
  noStroke();
	fill(150);
	textSize(30);
	textAlign(CENTER);
	text("INSERTION SORT", displayWidth/2, 60);

  drawRects();
  drawLabels();
  drawNextButton();
  drawCommentBox();

  mouseClicked();

}

//Repeats
function draw() {

}

function mouseClicked() {
  if (buttonClicked()) {

    //marks first item sorted
    if(count == 0) {
        nums[count].col = sort_color;
        drawRects();
        drawLabels();
        count++;
        fill(250);
        textSize(18);
        textAlign(CENTER);
        text("mark first as sorted", displayWidth/2, 600);
        lit++;
        return;
    }

    //extract first unsorted item
    if(nums[count].status == "unsorted"){
      nums[count].down();
      nums[count].status = "down";
      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text("extract the first unsorted element", displayWidth/2, 600);
      lit++;
      return;
    }

    //compare the last sorted and the first unsorted
    if(nums[count].status == "down"){
      nums[count].status = "middle"
      nums[count - 1].col = compare_color;
      drawRects();
      drawLabels();
      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text("figure where to insert extracted element;",
        displayWidth/2, 600);
      text("comparing with sorted number " + nums[count - 1].num,
        displayWidth/2, 630);
      lit++;
      return;
    }

    if (lit == 21){
      alert("DONE BOI");
      return;
    }

    //switch the two if last sorted is greater than first unsorted
    if(nums[count-1].num > nums[count].num){

      nums[count].status = "down";
      nums[count-1].right();
      nums[count].left();

      var temp;
      temp = nums[count - 1];
      nums[count - 1] = nums[count];
      nums[count] = temp;

      nums[count].status = "switched";
      nums[count - 1].status = "switched";

      nums[count].col = sort_color;

      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text(nums[count].num + " > " + nums[count-1].num + " is true, hence move current ",
        displayWidth/2, 600);
      text("sorted element to the right by 1.",
        displayWidth/2, 630);

      lit++;

      return;
    }

    //switch pt.2 boiii
    if (nums[count-1].status == "switched" && count >= 2){
      nums[count - 1].col = compare_color;
      drawRects();
      drawLabels();

      if(nums[count-1].num < nums[count-2].num){
        nums[count-2].right();
        nums[count-1].left();

        var temp;
        temp = nums[count - 2];
        nums[count - 2] = nums[count-1];
        nums[count-1] = temp;
        count--;

        lit++;

        drawCommentBox();
        fill(255);
        textSize(18);
        textAlign(CENTER);
        text(nums[count].num + " > " + nums[count-1].num + " is true, hence move current",
          displayWidth/2, 600);
        text("sorted element to the right by 1.",
          displayWidth/2, 630);
        return;

      } else{
          console.log("yaa");
        nums[count-1].up();
        drawCommentBox();
        fill(255);
        textSize(18);
        textAlign(CENTER);
        text(nums[count-2].num + " > " + nums[count-1].num + " is false, insert element at current position",
          displayWidth/2, 600);
        count++;
        lit++;
        return;
      }
    }

    //shove it back up
    if(nums[count-1].status != "switched" && nums[count-1].num <= nums[count].num){
      nums[count].up();
      nums[count-1].col = sort_color;
      drawRects();
      drawLabels();

      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text(nums[count].num + " < " + nums[count-1].num + " is false, insert element at current position",
        displayWidth/2, 600);

      lit++;
      count++;
      return;
    }

    //shove it back up pt.2 lol
    if(nums[count].status != "switched" &&count ==1 && nums[count-1].num < nums[count].num){
      nums[count].up();
      nums[count-1].col = sort_color;
      drawRects();
      drawLabels();

      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text(nums[count].num + " < " + nums[count-1].num + " is false, insert element at current position",
        displayWidth/2, 600);

      lit++;
      count++;
      return;
    }

    //shove it even more up
    if(count == 1 && nums[count].status == "switched"){
      nums[count-1].up();
      nums[count].col = sort_color;
      nums[count].col = exist_color;
      drawRects();
      drawLabels();

      drawCommentBox();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text(nums[count].num + " < " + nums[count-1].num + " is false, insert element at current position",
        displayWidth/2, 600);

      lit++;
      count++;
      return;
    }
  }
}

//Creates a Thingy that stores a bunch of info
class Thing {
  constructor(num, xPos, color) {
      this.num = num;
      this.height = num * 4;
      this.xPos = xPos;
      this.yPos = 250 - this.height;
      this.xnPos = this.xPos + 25;
      this.ynPos = 240;
      this.status = "unsorted";
      this.col = color;
      this.xLab = this.xnPos;
  }

  //moves the bar thingy down
  down() {
    this.erase();
    this.yPos = this.yPos + this.height + 20;
    this.ynPos = this.ynPos + this.height + 20;
    this.col = extract_color;
    drawRects();
    drawLabels();
  }

  //moves bar up
  up() {
    this.erase();
    this.yPos = this.yPos- this.height - 20;
    this.ynPos = this.ynPos - this.height - 20;
    this.col = sort_color;
    this.status = "sorted";
    drawRects();
    drawLabels();
  }

  //moves bar to the left
  left() {
    this.erase();
    this.xPos = this.xPos - 60;
    this.xnPos = this.xnPos - 60;
    this.col = extract_color;
    drawRects();
    drawLabels();
  }

  //moves bar to the right
  right() {
    this.erase();
    this.xPos = this.xPos + 60;
    this.xnPos = this.xnPos + 60;
    drawRects();
    drawLabels();
  }

  erase() {
    fill(255);
    rect(this.xPos, this.yPos - 10, 50, this.height+60);
  }

}

//draws the rectangles
function drawRects() {
  console.log("draw");
  for (let i = 0; i < nums.length; i++){
    fill(nums[i].col);
    rect(nums[i].xPos, nums[i].yPos, 50, nums[i].height);
  }
}

function drawLabels() {
  for (let i = 0; i < nums.length; i++){
    fill(70);
    textSize(20);
    text(nums[i].num, nums[i].xnPos, nums[i].ynPos);
  }
}


function drawNextButton() {
  fill(100);
  rect(displayWidth/2-75, 510, 150, 40);

  fill(250);
  textSize(20);
  textAlign(CENTER);
  text("STEP", displayWidth/2, 538);
}

function drawCommentBox(){
  fill(255, 129, 71);
  rect(displayWidth/2-250, 570, 500, 80);
}

function buttonClicked() {
  return displayWidth/2-75 < mouseX && mouseX < displayWidth/2+75 && mouseY > 510 && mouseY <550;
}
