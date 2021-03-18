var car1 = new Image();
car1.src = "resources/car1.png";
var car2 = new Image();
car2.src = "resources/car2.png";
var car3 = new Image();
car3.src = "resources/car3.png";
var car4 = new Image();
car4.src = "resources/car4.png";

var log1 = new Image();
log1.src = "resources/log.png";
var log2 = new Image();
log2.src = "resources/log.png";

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
//var livesArray = [];
var car1Array = [car1];
var car2Array = [car2];
var car3Array = [car3];
var car4Array = [car4];
var log1Array = [log1];
var log2Array = [log2];
var log3Array = [log2];
var log4Array = [log2];

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
    drawBackground();
    console.log("called");
    frogPict = createImage(frog.src, 300,800,50,50);
    createCars();
    createLogs();

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

var userScore = 0;
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
        frogPict.left-=50;
    }
    //d key to go right
    if(keycode == 68)
    {
        frogPict.left+=50
    }
    if(keycode==87) {
        frogPict.top-=50;
        userScore+=10;//increase when move forward
        document.getElementById("score").innerHTML = "Score: " + userScore;
    }
    if(keycode==83)
    {
        frogPict.top+=50;
        userScore-=10;//decrease when step back
        document.getElementById("score").innerHTML = "Score: " + userScore;
    }
});

//Anything that needs to be drawn on the screen should be in this function.  Make sure it is abstracted
function animate() {
    drawBackground();
    a=requestAnimationFrame(animate);
    //createCars();
    if (gameOn==true) {
        document.getElementById("lives").innerHTML = "Lives Remaining: " + lives;
        document.getElementById("score").innerHTML = "Score:" + userScore;
        boundaryCheck();
        drawFrog();
        moveCarsRight();
        moveCarsLeft();
        moveLogsRight();
        // moveLogsLeft();
        checkFrogs();
        checkLives();
        FinishLine();
        drawCars();
        drawLogs();
        logCollisionCheck();
        waterCollisionChecker();
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
    ctx.drawImage(frogPict,frogPict.left,frogPict.top,frogPict.width,frogPict.height);
    // ctx.drawImage(frogPict,frogPict.left,frogPict.top,frogPict.width,frogPict.height);

}

function startAnimation() {
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

function drawCars(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0;i<car1Array.length;i++){
        ctx.drawImage(car1Array[i],car1Array[i].left,car1Array[i].top,car1Array[i].width,car1Array[i].height);
    }
    for(i=0;i<car2Array.length;i++){
        ctx.drawImage(car2Array[i],car2Array[i].left,car2Array[i].top,car2Array[i].width,car2Array[i].height);
    }

    for(i=0;i<car3Array.length;i++){
        ctx.drawImage(car3Array[i],car3Array[i].left,car3Array[i].top,car3Array[i].width,car3Array[i].height);
    }
    for(i=0;i<car4Array.length;i++){
        ctx.drawImage(car4Array[i],car4Array[i].left,car4Array[i].top,car4Array[i].width,car4Array[i].height);
    }
}
function createLogs(){
    var ctx = document.getElementById("canvas").getContext("2d");

    //we need four stacks of logs
    //top, middle1, middle2, and then the bottoms



    log1Array.push(createImage(log1.src,0,250,50,50));
    log1Array.push(createImage(log1.src,0,300,50,50));
    log1Array.push(createImage(log1.src,0,350,50,50));
    log1Array.push(createImage(log1.src,0,400,50,50));
    log1Array.push(createImage(log1.src,0,450,50,50));


    log2Array.push(createImage(log2.src,200,250,50,50));
    log2Array.push(createImage(log2.src,200,300,50,50));
    log2Array.push(createImage(log2.src,200,350,50,50));
    log2Array.push(createImage(log2.src,200,400,50,50));
    log2Array.push(createImage(log2.src,200,450,50,50));

    log3Array.push(createImage(log2.src,400,250,50,50));
    log3Array.push(createImage(log2.src,400,300,50,50));
    log3Array.push(createImage(log2.src,400,350,50,50));
    log3Array.push(createImage(log2.src,400,400,50,50));
    log3Array.push(createImage(log2.src,400,450,50,50));

    log4Array.push(createImage(log2.src,600,250,50,50));
    log4Array.push(createImage(log2.src,600,300,50,50));
    log4Array.push(createImage(log2.src,600,350,50,50));
    log4Array.push(createImage(log2.src,600,400,50,50));
    log4Array.push(createImage(log2.src,600,450,50,50));

}

function drawLogs(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0;i<log1Array.length;i++){
        ctx.drawImage(log1Array[i],log1Array[i].left,log1Array[i].top,log1Array[i].width,log1Array[i].height);
        //making sure logs reappear once they disappear
        if(log1Array[i].left > 650){
            log1Array[i].left = -200;
        }
    }
    for(i=0;i<log2Array.length;i++){
        ctx.drawImage(log2Array[i],log2Array[i].left,log2Array[i].top,log2Array[i].width,log2Array[i].height);
        if(log2Array[i].left > 650){
            log2Array[i].left = -200;
        }
    }
    for(i=0;i<log3Array.length;i++){
        ctx.drawImage(log3Array[i],log3Array[i].left,log3Array[i].top,log3Array[i].width,log3Array[i].height);
        if(log3Array[i].left > 650){
            log3Array[i].left = -200;
        }
    }
    for(i=0;i<log4Array.length;i++){
        ctx.drawImage(log4Array[i],log4Array[i].left,log4Array[i].top,log4Array[i].width,log4Array[i].height);
        if(log4Array[i].left > 650){
            log4Array[i].left = -200;
        }
    }
}


//added to ensure that frog stays within the box, if it leaves the home, shabam you coming back froggy.
function boundaryCheck() {
    if(frogPict.left<10 || frogPict.left>650 || frogPict.top>800 || frogPict.top<0){
        frogPict.left = 300;
        frogPict.top = 800;
    }
}




function createCars() {
    var ctx = document.getElementById("canvas").getContext("2d");
    car1Array.push(createImage(car1.src,600,750,50,50));
    car1Array.push(createImage(car1.src,800,750,50,50));
    car1Array.push(createImage(car1.src,1000,750,50,50));
    car1Array.push(createImage(car1.src,1200,750,50,50));


    car2Array.push(createImage(car2.src,0,650,50,50));
    car2Array.push(createImage(car2.src,-200,650,50,50));
    car2Array.push(createImage(car2.src,-400,650,50,50));
    car2Array.push(createImage(car2.src,-600,650,50,50));

    car3Array.push(createImage(car3.src,600,600,50,50));
    car3Array.push(createImage(car3.src,900,600,50,50));
    car3Array.push(createImage(car3.src,1200,600,50,50));
    car3Array.push(createImage(car3.src,1500,600,50,50));


    car4Array.push(createImage(car4.src,0,750,50,50));
    car4Array.push(createImage(car4.src,-200,550,50,50));
    car4Array.push(createImage(car4.src,-400,550,50,50));
    car4Array.push(createImage(car4.src,-600,550,50,50));

}


//function createLogs(){

// }

//logs cosas below

var logsMoves = 1.2;
function moveLogsRight(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0;i<log1Array.length;i++){
        log1Array[i].left=log1Array[i].left+ logsMoves;
        ctx.drawImage(log1Array[i],log1Array[i].left,log1Array[i].top,log1Array[i].width,log1Array[i].height);
    }
    for(i=0;i<log2Array.length;i++){
        log2Array[i].left=log2Array[i].left + logsMoves;
        ctx.drawImage(log2Array[i],log2Array[i].left,log2Array[i].top,log2Array[i].width,log2Array[i].height);
    }
    for(i=0;i<log3Array.length;i++){
        log3Array[i].left=log3Array[i].left + logsMoves;
        ctx.drawImage(log3Array[i],log3Array[i].left,log3Array[i].top,log3Array[i].width,log3Array[i].height);
    }
    for(i=0;i<log4Array.length;i++){
        log4Array[i].left=log4Array[i].left + logsMoves;
        ctx.drawImage(log4Array[i],log4Array[i].left,log4Array[i].top,log4Array[i].width,log4Array[i].height);
    }
}

// function moveLogsLeft(){
//     var ctx = document.getElementById("canvas").getContext("2d");
//     for(i=0;i<log2Array.length;i++){
//         log2Array[i].left=log2Array[i].left + logsMoves;
//         ctx.drawImage(log2Array[i],log2Array[i].left,log2Array[i].top,log2Array[i].width,log2Array[i].height);
//     }
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

var counter = 0;
function FinishLine(){
    if(frogPict.top<200){
        counter++;
        // alert("you have won!");
        points=points+1;
        frogX=300;
        frogY=800;

        console.log(points);

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
    userScore=0;
    document.getElementById("lives").innerHTML = "Lives Remaining: " + lives;
    document.getElementById("score").innerHTML = "Score:" + userScore;
    document.getElementById("restart").disabled=true;
}

function checkCollisions(p1,p2){
    if(p1.left+p1.width>p2.left && p1.left<p2.left+p2.width&& p1.top+p1.height>p2.top&& p1.top<p2.top+p2.height&&p1.vis==true && p2.vis==true){
        frogPict.top = 800;
        frogPict.left = 300;
        lives=lives-1;
        document.getElementById("lives").innerHTML = "Lives Remaining:" + lives;
        reset();
    }
}

var waterCollision = true;
function logCollisionCheck() {
    var ctx = document.getElementById("canvas").getContext("2d");
    for (t = 0; t < log1Array.length; t++) {
        if (frogPict.left + frogPict.width > log1Array[t].left && frogPict.left < log1Array[t].left + log1Array[t].width && frogPict.top + frogPict.height > log1Array[t].top && frogPict.top < log1Array[t].top + log1Array[t].height) {
            frogPict.left += 1.2;
            waterCollision = false;
        }
        if (frogPict.left + frogPict.width > log2Array[t].left && frogPict.left < log2Array[t].left + log2Array[t].width && frogPict.top + frogPict.height > log2Array[t].top && frogPict.top < log2Array[t].top + array3[t].height) {
            frogPict.left += 1.2;
            waterCollision = false;
        }
    }
}

function waterCollisionChecker() {
    if (waterCollision == true && frogPict.top < 500 && frogPict.top>250) {
        frogPict.left = 300;
        frogPict.top = 800;
        lives-=1;
        document.getElementById("lives").innerHTML = "Lives Remaining: " + lives;

    }
}

//this function may be helpful.  You should understand it and be able to make it on your own.
function getRandomInt(min, max) { //return random int
    return Math.floor(Math.random() * (max - min)) + min;
}

//Having a reset function allows the user to play again.
function reset() { //resets left and top values of frog, but doesn't redraw it
    var ctx = document.getElementById("canvas").getContext("2d");

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