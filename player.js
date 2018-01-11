/*This JavaScript file contains the definition of the player object
 *
 *
 */


//Creating Player----------------------------------------------------------------------------------------------------------------------------
var Player = {x_pos:2500, y_pos:2500, health:100, world_x_pos:0, world_y_pos:0, facing:0, radius:100, roomNum:3};// initializes the player
VISIONARC = 3*Math.PI/8;//a final variable that sets the field of view
function checkFacing() {
	if(Player.facing> 2*Math.PI){//the program tells the angle of the player in radians so this resets the value of the angle so it stays between 0 and 2pi
		Player.facing -= Math.PI*2;
	}
}
//END Creating Player--------------------------------------------------------------------------------------------------------------------------

