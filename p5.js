
/*
Name:        John
Course:      CIS 115
Assignment:  Project 4
Description: Canvas

*/

// 10 pts - Restart button



"use strict"


const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

class Vect{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Vect3{
		constructor(){

	}

}

class Ball{
	constructor(x, y, r, sA, eA){
		this.pos = new Vect;
		this.size = new Vect3(r, sA, eA);
		this.velocity = new Vect;
	}

	//Finds the bottom of the ball for "collision" detection
	get bottom(){
		return this.pos.y + this.size.r;
	}
}

//Player controlled Paddle
class Player{
	constructor(w, h){

		this.pos = new Vect;
		this.size = new Vect(w, h);
		this.velocity = new Vect;
	}

	get leftCorner(){
		return this.pos.x;
	}

	get rightCorner(){
		return this.pos.x + this.size.x;
	}

}


var player = new Player(100, 20);
player.pos.x = canvas.width/2 - player.size.x/2
player.pos.y = canvas.height - player.size.y;
player.velocity.x = 12;
player.velocity.y = 12;




function move(e){
	if(e.keyCode==39 || e.keyCode==68){
		//clear(); //clears previous sprite
		player.pos.x += player.velocity.x
	}

	if(e.keyCode==37 || e.keyCode==65){
		//clear();
		player.pos.x -= player.velocity.x;
	}

	window.requestAnimationFrame(move);
}



const ball = new Ball;
ball.pos.x = 50;
ball.pos.y = 50;

ball.size.r = 5;
ball.size.sA = 0;
ball.size.eA = Math.PI * 2;


ball.velocity.x = 5;
ball.velocity.y = 5;

function drawBall(){
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.beginPath();
	context.arc(ball.pos.x, ball.pos.y, ball.size.r, ball.size.sA, ball.size.eA);
	context.stroke();
	context.fillStyle = "white";
	context.fill();

}

function drawPlayer(){
	context.fillStyle = 'white';
	context.beginPath();
	context.stroke();
	context.fillRect(player.pos.x, player.pos.y, player.size.x, player.size.y);
}


var time = 0;

function scoreTimer(){
	if(!lostGame){
			time += 1;
	}

	context.fillStyle = "white";
	document.getElementById("score").innerHTML = "SCORE: " + time;

}

var lostGame = false;


var timer = setInterval(scoreTimer, 1000);

var highScore = 0;

function HighScore(){

	if(time > highScore){
		highScore = time;
	}

	document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}

function GameDifficulty(){
	if(document.getElementById("easy").checked){
		ball.velocity.x = 3;
		ball.velocity.y = 3;
	}

	if(document.getElementById("medium").checked){
		ball.velocity.x = 5;
		ball.velocity.y = 5;
	}

	if(document.getElementById("hard").checked){
		ball.velocity.x = 7;
		ball.velocity.y = 7;
	}

}


function GameReset(){
	lostGame = false;
	time = 0;
	document.getElementById("score").innerHTML = "SCORE: " + time;

	//resets ball position
	ball.pos.x = 50;
	ball.pos.y = 50;

	ball.velocity.x = 5;
	ball.velocity.y = 5;

	//resets player position
	player.pos.x = canvas.width/2 - player.size.x/2
	player.pos.y = canvas.height - player.size.y;

	//clears canvas
	context.clearRect(0, 0, canvas.width, canvas.height);


	GameLoop();

}

function GameLoop(){
	GameDifficulty();
	context.fillStyle= "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawPlayer();
	drawBall();

	update();


}

function update(){
	ball.pos.x += ball.velocity.x;
	ball.pos.y += ball.velocity.y;

	if(ball.pos.x < 0 || ball.pos.x > canvas.width){
		ball.velocity.x = -ball.velocity.x;
	}
	if(ball.pos.y < 0){
		ball.velocity.y = -ball.velocity.y;
	}
	if(ball.pos.y > canvas.height){
		HighScore();
		ball.velocity.y = -ball.velocity.y;
		lostGame = true;
		console.log("You lose")
		setTimeout(function(){
    		GameReset();
		}, 1000);
		return;

	}

	if(ball.bottom === player.pos.y && player.leftCorner < ball.pos.x && ball.pos.x < player.rightCorner){
		ball.velocity.y = -ball.velocity.y;


	}

	drawBall();
	drawPlayer();

	window.requestAnimationFrame(update);

}

function startButton(){

}


window.onload = function(){
	window.onkeydown = move;


	GameLoop();


};