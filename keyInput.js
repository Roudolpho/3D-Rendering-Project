/*This JavaScript file contains functions pertaining to key input event and movement of the player
 *
 *
 */



//Key Press Event Detection---------------------------------------------------------------------------------------------------------------------------
input = {up:false,down:false,left:false,right:false};
document.onkeydown = pressKeyDown;//Documents the onKeyDown event
function pressKeyDown(e) {
	e = e || window.event;//e is window event with code for keys
	if (e.keyCode == '38') {
		input.up = true;//simulates upward motion
		// up arrow
	}
	else if (e.keyCode == '40') {
		input.down = true;//simulates downward motion
		// down arrow
	}
	else if (e.keyCode == '37') {
		input.left = true;//simulates leftward motion
	   // left arrow
	}
	else if (e.keyCode == '39') {
		input.right = true;//simulates rightward motion
	   // right arrow
	}
}
document.onkeyup = pressKeyUp;//Documents the onKeyUp event
function pressKeyUp(e) {
	e = e || window.event;//e is window event with code for keys
	if (e.keyCode == '38') {
		input.up = false;//simulates upward motion
		// up arrow
	}
	else if (e.keyCode == '40') {
		input.down = false;//simulates downward motion
		// down arrow
	}
	else if (e.keyCode == '37') {
		input.left = false;//simulates leftward motion
	   // left arrow
	}
	else if (e.keyCode == '39') {
		input.right = false;//simulates rightward motion
	   // right arrow
	}
}
function checkInputs(roomNum) {//handles movement since the key handling only changes variables up to this point
	if(input.up){
		moveUp(roomNum);
	}
	if(input.down){
		moveDown();
	}
	if(input.left){
		moveLeft();
	}
	if(input.right){
		moveRight();
	}
}
//END Key Press Event Detection---------------------------------------------------------------------------------------------------------------------------

//Movement Functions----------------------------------------------------------------------------------------------------------------------------
MOVESPEED = 10;
TURNSPEED = Math.PI/90;
function moveLeft() {//LEFT movement
	Player.facing -= TURNSPEED;
	//console.log("left");
}

function moveRight() {//RIGHT movement
	Player.facing += TURNSPEED;
	//console.log("right");
}

function moveUp(roomNum) {//UP movement
	//console.log("forward");
	checkDestUp(roomNum);
}

function moveDown() {//DOWN movement
	//console.log("down");
	Player.x_pos -= MOVESPEED*Math.cos(Player.facing)/2;
	Player.y_pos -= MOVESPEED*Math.sin(Player.facing)/2;
}
//this brief portion is vestigial but I have left it for now as it may be re-implemented for more user control
/*
function moveAction() {//ACTION1 not bound except for button
	//console.log("action");
}

function moveAction2() {//ACTION2 not bound except for button
	//console.log("action2");
}
*/

//END Movement Functions----------------------------------------------------------------------------------------------------------------------------



//Checking Movement----------------------------------------------------------------------------------------------------------------------------------
/*
 *This is a temporary form of collision as this does not check the entirety of the circles radius as it moves forward, only two points.
 *In the future, I plan to implement a more thorough for of collision
 *
 */
var c2 = document.getElementById("rayCasting");
function checkDestUp(roomNum) {//This function creates collision between the player and walls
	xmov = Math.cos(Player.facing)/Math.abs(Math.cos(Player.facing));
	ymov = Math.sin(Player.facing)/Math.abs(Math.sin(Player.facing));
	if(maps[roomNum][Math.floor((Player.y_pos + MOVESPEED*Math.sin(Player.facing)+Player.radius*ymov)*maps[roomNum].length/(c2.height*10))][Math.floor((Player.x_pos + MOVESPEED*Math.cos(Player.facing)+Player.radius*xmov)*maps[roomNum][0].length/(c2.width*10))][0]<250){
		Player.y_pos += MOVESPEED*Math.sin(Player.facing);
		Player.x_pos += MOVESPEED*Math.cos(Player.facing);
	} else {
		if(maps[roomNum][Math.floor((Player.y_pos)*maps[roomNum].length/(c2.height*10))][Math.floor((Player.x_pos + MOVESPEED*Math.cos(Player.facing)+Player.radius*xmov)*maps[roomNum][0].length/(c2.width*10))][0]<250) {
			//this condition will check the collision for the x movement
			Player.x_pos += MOVESPEED*Math.cos(Player.facing);
		} else if(!(maps[roomNum][Math.floor((Player.y_pos)*maps[roomNum].length/(c2.height*10))][Math.floor((Player.x_pos + MOVESPEED*Math.cos(Player.facing)+Player.radius*(-xmov))*maps[roomNum][0].length/(c2.width*10))][0]<250)){
			Player.x_pos += MOVESPEED*Math.cos(Player.facing);
		}
		if(maps[roomNum][Math.floor((Player.y_pos + MOVESPEED*Math.sin(Player.facing)+Player.radius*ymov)*maps[roomNum].length/(c2.height*10))][Math.floor((Player.x_pos)*maps[roomNum][0].length/(c2.width*10))][0]<250) {
			//this condition will check the collision for the y movement
			Player.y_pos += MOVESPEED*Math.sin(Player.facing);
		} else if(!(maps[roomNum][Math.floor((Player.y_pos + MOVESPEED*Math.sin(Player.facing)+Player.radius*(-ymov))*maps[roomNum].length/(c2.height*10))][Math.floor((Player.x_pos)*maps[roomNum][0].length/(c2.width*10))][0]<250)){
			Player.y_pos += MOVESPEED*Math.sin(Player.facing);
		}
	}
}
//END Checking Movement----------------------------------------------------------------------------------------------------------------------------------


