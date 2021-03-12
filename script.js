var car1 = new Image();
car1.src = "resources/car1.png"; //need this to simply load the image into the browsers memory
var car2 = new Image();
car2.src = "resources/car2.png";
var car3 = new Image();
car3.src = "resources/car3.png";
var car4 = new Image();
car4.src = "resources/car4.png";

var log1 = new Image();
log1.src = "resources/log.png";
var log2 = new Image();
log2.src = "resources/log2.png";

var frog = new Image();
frog.src = "resources/frog.png";
var frogPict;
var frogY=800;
var frogX=300;


var snake = new Image();
snake.src = "resources/snake.png";

var heart = new Image();
heart.src = "resources/heart.png";

var lilypad = new Image();
lilypad.src = "resources/lilypad.png";

//Make all of your arrays and instance field here
var a;
var lives = 3;
var points=0;
var livesArray = [];
var car1Array = [car1];
var car2Array = [car2];
var car3Array = [car3];
var car4Array = [car4];
var gameOn=true;


//draws game board
function drawBackground() {
    drawGrass();
    drawWater();
    drawRoad();
    drawHome();
}


function drawGrass() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#13691d";
    ctx.fillRect(0,0,650,850);
}

function drawRoad() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#605f5f";
    ctx.fillRect(0,550,window.innerWidth,250);
    drawDashed();
}
function drawWater() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#a5c5ff";
    ctx.fillRect(0,150,window.innerWidth,350);
}
function drawHome() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#3bdb13";
    ctx.fillRect(0,150,window.innerWidth,25);
    ctx.fillRect(0,175,50,75);
    ctx.fillRect(120,175,50,75);
    ctx.fillRect(240,175,50,75);
    ctx.fillRect(360,175,50,75);
    ctx.fillRect(480,175,50,75);
    ctx.fillRect(600,175,50,75);
}

function drawDashed() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.setLineDash([10, 20]);
    ctx.moveTo(0, 750);
    ctx.lineTo(650, 750);
    ctx.moveTo(0, 700);
    ctx.lineTo(650, 700);
    ctx.moveTo(0, 650);
    ctx.lineTo(650, 650);
    ctx.moveTo(0, 600);
    ctx.lineTo(650, 600);
    ctx.stroke();
}


//initialize functions onload
function initialize(){
    console.log("called");
    frog = createImage(frog.src, 300,500,50,50);
    drawBackground();
    // createCars();

}
//You may or may not need this function.  Remember you can add other properties inside the function if you want.
var createRectangle =  function(xCor, yCor, w,h){
    //the words in purple are not special.  You could have typed blahblah and it still works
    //the first line makes a new object.  without it all of the rectangles would act line 1 rectangle
    var temp = new Object();
    temp.x = xCor;
    temp.y = yCor;
    temp.width = w;
    temp.height = h;
    //return is necessary so that when you use your rectangle, the variables you made in this funciton can be used also.
    return temp;
}
//You may or may not need this function.  Remember you can add other properties inside the function if you want.
var createImage = function(src,xco,yco,w,h) {
    var img   = new Image();
    img.src   = src;
    img.left = xco;
    img.top = yco;
    img.width = w;
    img.height = h;
    img.vis= true;
    return img;
};

/*
this code allows you to use the keyboard.  It is written in Jquery.  Jquery is version of javascript that is downloaded
as a library.  The download line is in the header of the html.  Each of the keycodes below can be found in the
ASCII table.
 */
$(document).keydown(function(event){  //jQuery code to recognize a keydown event
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == 13)//m
    {
        alert("you pressed the return key");
    }
    if(keycode == 27)
    {
        alert("escape key")
    }
    //a key to go left
    if(keycode == 65)//a
    {
        frogX-=25;
    }
    //d key to go right
    if(keycode == 68)
    {
            frogX+=25;
    }
    if(keycode==87) {
        frogY -= 50
    }
    if(keycode==83)
    {
        frogY+=50
    }
});

//Anything that needs to be drawn on the screen should be in this function.  Make sure it is abstracted
function animate() {
    a=requestAnimationFrame(animate);
    createCars();
    if (gameOn==true) {
        document.getElementById("lives").innerHTML = "Lives Remaining:" + lives;
        document.getElementById("score").innerHTML = "Score:" + points;
        moveCarsRight();
        moveCarsLeft();
        checkFrogs();
        checkLives();
        FinishLine();
        drawFrog();
        // startAnimation();
        for (i = 0; i < car2Array.length; i++) {
            checkRightCars(car2Array[i]);
        }

        for (i = 0; i < car4Array.length; i++) {
            checkRightCars(car4Array[i]);
        }

        for (i = 0; i < car1Array.length; i++) {
            checkLeftCars(car1Array[i]);
        }
        for (i = 0; i < car3Array.length; i++) {
            checkLeftCars(car3Array[i]);
        }

        for (i = 0; i < car1Array.length; i++) {
            checkCollisions(frogPict, car1Array[i]);
        }

        for (i = 0; i < car2Array.length; i++) {
            checkCollisions(frogPict, car2Array[i]);
        }

        for (i = 0; i < car3Array.length; i++) {
            checkCollisions(frogPict, car3Array[i]);
        }
        for (i = 0; i < car4Array.length; i++) {
            checkCollisions(frogPict, car4Array[i]);
        }
    }


}


function drawFrog(){
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(frog,frog.left,frog.top,frog.width,frog.height);
    // ctx.drawImage(frogPict,frogPict.left,frogPict.top,frogPict.width,frogPict.height);

}

function startAnimation() {
        alert("cliclked");
        animate();
    document.getElementById("start").disabled = true;

}

function checkFrogs(){
    if(frogX<0 || frogY<0 || frogX+50>650 || frogY+50>850){
        frogX=300;
        frogY=800
    }
}
//you will need functions to draw and move all of your cars, logs, etc...

function createCars() {
    var ctx = document.getElementById("canvas").getContext("2d");
    car1Array.push(createImage(car1.src,600,750,50,50));
    car1Array.push(createImage(car1.src,800,750,50,50));
    car1Array.push(createImage(car1.src,1000,750,50,50));
    car1Array.push(createImage(car1.src,1200,750,50,50));
        for(i=0;i<car1Array.length;i++){
            ctx.drawImage(car1Array[i],car1Array[i].left,car1Array[i].top,car1Array[i].width,car1Array[i].height);
        }

    car2Array.push(createImage(car2.src,0,650,50,50));
    car2Array.push(createImage(car2.src,-200,650,50,50));
    car2Array.push(createImage(car2.src,-400,650,50,50));
    car2Array.push(createImage(car2.src,-600,650,50,50));
    for(i=0;i<car2Array.length;i++){
        ctx.drawImage(car2Array[i],car2Array[i].left,car2Array[i].top,car2Array[i].width,car2Array[i].height);
    }

    car3Array.push(createImage(car3.src,600,600,50,50));
    car3Array.push(createImage(car3.src,900,600,50,50));
    car3Array.push(createImage(car3.src,1200,600,50,50));
    car3Array.push(createImage(car3.src,1500,600,50,50));
    for(i=0;i<car3Array.length;i++){
        ctx.drawImage(car3Array[i],car3Array[i].left,car3Array[i].top,car3Array[i].width,car3Array[i].height);
    }

    car4Array.push(createImage(car4.src,0,750,50,50));
    car4Array.push(createImage(car4.src,-200,550,50,50));
    car4Array.push(createImage(car4.src,-400,550,50,50));
    car4Array.push(createImage(car4.src,-600,550,50,50));
    for(i=0;i<car4Array.length;i++){
        ctx.drawImage(car4Array[i],car4Array[i].left,car4Array[i].top,car4Array[i].width,car4Array[i].height);
    }
}


//function createLogs(){

// }
var carMoves=1;
function moveCarsRight(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0;i<car2Array.length;i++){
        car2Array[i].left=car2Array[i].left+ carMoves;
        ctx.drawImage(car2Array[i],car2Array[i].left,car2Array[i].top,car2Array[i].width,car2Array[i].height);

    }
    for(i=0;i<car4Array.length;i++){
        car4Array[i].left= car4Array[i].left+ carMoves;
        ctx.drawImage(car4Array[i],car4Array[i].left,car4Array[i].top,car4Array[i].width,car4Array[i].height);


    }
}
function checkRightCars(rightcars){
    if(rightcars.left-50>650){
        rightcars.left=-100;
    }
}


function moveCarsLeft(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0;i<car1Array.length;i++){
        car1Array[i].left=car1Array[i].left- carMoves;
        ctx.drawImage(car1Array[i],car1Array[i].left,car1Array[i].top,car1Array[i].width,car1Array[i].height);

    }
    for(i=0;i<car3Array.length;i++){
        car3Array[i].left=car3Array[i].left-carMoves;
        ctx.drawImage(car3Array[i],car3Array[i].left,car3Array[i].top,car3Array[i].width,car3Array[i].height);


    }
}

function checkLeftCars(leftcars){
    if(leftcars.left+100<0){
        leftcars.left=700;
    }
}

function FinishLine(){
    if(frogY<500){
        points=points+1;
        frogX=300;
        frogY=800;
    }
}

function checkLives(){
    if(lives==0){
        gameOn=false;
        alert("you lost boooooo! Press restart to go again!");
    }
    if (gameOn==false);{
        document.getElementById("restart").disabled=false;
    }

}

function restartGame(){
    gameOn=true;
    lives=3;
    points=0;
    document.getElementById("restart").disabled=true;
}

function checkCollisions(p1,p2){
 if(p1.left+p1.width>p2.left && p1.left<p2.left+p2.width&& p1.top+p1.height>p2.top&& p1.top<p2.top+p2.height&&p1.vis==true && p2.vis==true){
     frogX=300;
     frogY=800;
     lives=lives-1;
 }
}

//this function may be helpful.  You should understand it and be able to make it on your own.
function getRandomInt(min, max) { //return random int
    return Math.floor(Math.random() * (max - min)) + min;
}

//Having a reset function allows the user to play again.
function reset() { //resets left and top values of frog, but doesn't redraw it

}

//most games require a function to see if winning conditions have been met.
//Do not reload the screen
function checkWin() {

}

//your game may have multiple levels eventually.  Put code here to switch to the next level.  Switching levels
//is not the same as going to another webpage with another HTML file
function NextLevel() {

}

//You may want a function to show your controls for the user.
function help() {
    alert("Controls: W, T, I, and Up Arrow is up. S, G, K, and Down Arrow is down. A, F, J and Left Arrow is left. And D, H, L and Right Arrow is right. The goal of the game is to get the frog into its five homes at the top of the screen. Avoid the cars, snakes and crocodiles, while using the logs as transportation. Also, hearts, stars and clocks all act as power ups. To get to the highest round possible, join together with up to 3 people to play together. Remember there is a timer!");
}
