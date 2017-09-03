var circle =[];
var myFont;

function preload() {
  myFont = loadFont('assets/Ubuntu-R.ttf');
}

function setup() {
  //creates minimum of canvas for greater compatibility
  if(windowWidth<800 && windowHeight < 800) {
    createCanvas(800,800);
  }
  else {
    createCanvas(windowWidth,windowHeight);
  }

  //random array
  r = [-3,-2,2,3];

  // creates circle for mouse
  mouse = new Circle(
    /*diamater*/ 50,
    /*position (x,y)*/ mouseX, mouseY,
    /*speed (x,y)*/ 0,0,
    /*color,text,fontsize*/ color(180),'',20,
    /*link*/ ""
  );

  //Creates floating circles
  circle[0] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ 150, 150,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color('blue'),'Bachelors of Science\nElectrical Engineering\nexpected\nDecember 2019',16,
    /*link*/ ""
  );
  circle[1] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ width-150, 150,
    /*speed (x,y)*/ random(r),random(5),
    /*color,text,fontsize*/ color('green'),'Looking for\nSummer 2018 Internship\nSoftware Engineering\nControl Engineering   \nElectrical Engineering',16,
    /*link*/ ""
  );
  circle[2] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ 400, 150,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color(255,128,0),'\nGo Pokes!\nOklahoma State University\nCEAT',16,
    /*link*/ ""
  );
  circle[3] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ width-400,150,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color('red'),'\nClick Me\nResume',22,
    /*link*/ "assets/resumeweb.pdf"
  );
  circle[4] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ 150, 400,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color('violet'),'\nWritten in\nP5.js',22,
    /*link*/ "assets/resumeweb.pdf"
  );
  circle[5] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ width-150, 400,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color(51,0,102),'Skills:\nJava\nSwift\nPython\nJavaScript',16,
    /*link*/ ""
  );
  circle[6] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ 400, 400,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color(0,255,255),'\nClick Me\nContact Me',22,
    /*link*/ "mailto:cameron.jump@okstate.edu?subject=Oi%20Cameron!"
  );
  circle[7] = new Circle(
    /*diamater*/ 200,
    /*position (x,y)*/ width-400, 400,
    /*speed (x,y)*/ random(r), random(r),
    /*color,text,fontsize*/ color(255,210,0),'Hobbies:\nRunning\nElectronic Protyping\nProgramming',16,
    /*link*/ ""
  );
}

function draw() {
  //resets background and creates bottom border
  background(80);
  fill(60);
  rect(0, height-60, width, 60);

  //set mouse coordinates for mouse ellipse
  mouse.xpos = mouseX;
  mouse.ypos = mouseY;

  //reverses speed if object is outside canvas
  for(var i=0; i<circle.length; i++) {
    circle[i].updateSign();
  }

  //recursively compares all ellipses and computes resultant vectors if intersecting
  compareAll(0);

  //computes new positions with speeds and draws them
  for(var i=0; i<circle.length; i++) {
    circle[i].update();
    circle[i].create();
  }

  //draws mouse ellipse
  mouse.create();

  //draws top left text box
  fill(50);
  rect(20,20,400,110);
  fill(color('white'));
  textAlign(LEFT);
  textSize(22);
  textFont(myFont);
  text("Hello I'm, Cameron Jump!\nWelcome  to my personal site!\nFeel free to interact with the circles.",40,55);

}

//checks clicked ellipse for possible link and then opens if found
function mousePressed() {
  for(var i=0; i<circle.length; i++) {
    if(intersect(mouse, circle[i])) {
      if(circle[i].link != "") {
        window.open(circle[i].link);
      }
      break;
    }
  }
}

//called when window resizes, resizes canvas with minimum size if needed
function windowResized() {
  if(windowWidth<800 && windowHeight < 800) {
    createCanvas(800,800);
  }
  else {
    createCanvas(windowWidth,windowHeight);
  }
}

//recursively compares all ellipses and computes resultant vectors if intersecting
function compareAll(i) {
  for(var j=i+1; j<circle.length; j++) {
    if(intersect(circle[i],circle[j])) {
      var phi = atan((circle[i].ypos - circle[j].ypos) / (circle[i].xpos - circle[j].xpos));
      console.log(phi);
      var theta1 = thetaCompute(circle[i]);
      var theta2 = thetaCompute(circle[j]);
      var velocity1 = sqrt((circle[i].xspeed*circle[i].xspeed)+(circle[i].yspeed*circle[i].yspeed));
      var velocity2 = sqrt((circle[j].xspeed*circle[j].xspeed)+(circle[j].yspeed*circle[j].yspeed));
      //compues velocity in x and y direction for both circles using formula found at https://en.wikipedia.org/wiki/Elastic_collision
      circle[i].xspeed = velocity2*cos(theta2-phi)*cos(phi) + velocity1*sin(theta1-phi)*cos(phi + HALF_PI);
      circle[i].yspeed = velocity2*cos(theta2-phi)*sin(phi) + velocity1*sin(theta1-phi)*sin(phi + HALF_PI);
      circle[j].xspeed = velocity1*cos(theta1-phi)*cos(phi) + velocity2*sin(theta2-phi)*cos(phi + HALF_PI);
      circle[j].yspeed = velocity1*cos(theta1-phi)*sin(phi) + velocity2*sin(theta2-phi)*sin(phi + HALF_PI);
      console.log(circle[i].xspeed+" "+circle[i].yspeed+" "+circle[j].xspeed+" "+circle[j].yspeed)
    }
  }
  if(i<circle.length-2) {
    compareAll(i+1);
  }
}

//adds Pi if resultant is supposed to be in 2nd or 3rd quadrants
function thetaCompute(circle1) {
  theta = atan(circle1.yspeed/circle1.xspeed);
  if(circle1.xspeed<0) {
    return theta + PI;
  }
  else {
    return theta;
  }
}

//checks for intersecting circles
function intersect(circle1, circle2) {
  if (dist(circle1.xpos,circle1.ypos,circle2.xpos,circle2.ypos) <= circle1.diam/2+circle2.diam/2) {
    console.log("hit");
    return true;
  }
  return false;
}

//class which holds circles
function Circle(idiam, ixpos, iypos, ixspeed, iyspeed, icolor, itext, ifontsize, ilink) {
  this.diam = idiam;       // default 200 // Width of the shape
  this.xpos = ixpos;
  this.ypos = iypos;    // Starting position of shape

  this.xspeed = ixspeed;  // default 2 // Speed of the shape
  this.yspeed = iyspeed;  // default 2 //Speed of the shape

  this.link = ilink;

  //draws ellipse
  this.create = function() {
    fill(icolor);
    strokeWeight(0);
    ellipseMode(CENTER);
    ellipse(this.xpos, this.ypos, this.diam, this.diam);
    fill(color('white'));
    textAlign(CENTER);
    textSize(ifontsize);
    textFont(myFont);
    text(itext,this.xpos,this.ypos-40);
  }

  // Update the position of the shape
  this.update = function() {
    this.xpos = this.xpos + ( this.xspeed );
    this.ypos = this.ypos + ( this.yspeed );
  }

  // Test to see if the shape exceeds the boundaries of the screen
  this.updateSign = function() {
    if (this.xpos > width - this.diam/2) {
      this.xspeed = -1*abs(this.xspeed);
    }
    else if (this.xpos < this.diam/2) {
      this.xspeed = abs(this.xspeed);
    }
    if (this.ypos > height - 60 - this.diam/2) {
      this.yspeed = -1*abs(this.yspeed);
    }
    else if (this.ypos < this.diam/2) {
      this.yspeed = abs(this.yspeed);
    }
  }

}
