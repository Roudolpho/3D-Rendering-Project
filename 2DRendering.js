/*This JavaScript file contains the functions necessary to render the Two Dimensional visuals
 *
 *
 */


//Drawing2D----------------------------------------------------------------------------------------------------------------------------------
PLAYERRADIUS = Player.radius/10;
function draw2DPlayer() {//draws the player in the 2D window
	var c = document.getElementById("topDownView");//references 2D canvas
	var ctx = c.getContext("2d");
	ctx.beginPath();//Draws player
    ctx.arc(Math.round(Player.x_pos/10), Math.round(Player.y_pos/10), PLAYERRADIUS, 0, 2 * Math.PI, false);
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    ctx.fill();
	ctx.stroke();//ends drawing of player
	
	ctx.beginPath();//draws vision arc for field of view
    ctx.arc(Math.round(Player.x_pos/10), Math.round(Player.y_pos/10), PLAYERRADIUS*(5/4), Player.facing - (VISIONARC/2),Player.facing + (VISIONARC/2), false);
	ctx.lineWidth = 2;
    ctx.strokeStyle = '#770000';
    ctx.stroke();//ends drawing of field of view
	
	ctx.beginPath();//draws facing line
	ctx.moveTo(Math.round(Player.x_pos/10), Math.round(Player.y_pos/10));
	ctx.lineTo(Math.round(Player.x_pos/10)+(PLAYERRADIUS*(5/4)*Math.cos(Player.facing)), Math.round(Player.y_pos/10)+(PLAYERRADIUS*(5/4)*Math.sin(Player.facing)));
	ctx.stroke();//ends drawing of facing line
}
function draw2D(roomNumber) {//this function simply loads the next frame for the 2D window
	draw2DRoom(roomNumber);
	draw2DPlayer();
}
function draw2DRoom(roomNum) {//this function draws the room tiles for the 2D interpretation
	var c = document.getElementById("topDownView");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.rect(0,0,c.width,c.height);
	ctx.fillStyle = '#007700';
	ctx.fill();
	ctx.stroke();
	for(y=0;y<maps[roomNum].length;y++){//draws all rows
		for(x=0;x<maps[roomNum][y].length;x++){//draws each collumn
			//console.log(maps[roomNum][y][x][0]);//for debugging purposes
			draw2DTile(maps[roomNum][y][x][0],x,y,roomNum);//draws the tile
		}
	}
}
function draw2DTile(value, x, y, roomNum) {//This is a function for drawing a specific tile to the canvas
	if(value == 0){
		
	} else {
		var c = document.getElementById("topDownView");
		var ctx = c.getContext("2d");
                var tileSizex = c.width / maps[roomNum][y].length;
                var tileSizey = c.height / maps[roomNum].length;
		//console.log(maps[roomNum][y][x][0]);
		if(value >= 250){
			ctx.fillStyle = getColorByTile(maps[roomNum][y][x][0]);
			ctx.fillRect((x)*tileSizex,(y)*tileSizey,tileSizex,tileSizey);
			ctx.fillStyle = getColorByTile(maps[roomNum][y][x][0]);
			
		}
		/*ctx.fillStyle = "#00FF00";
		ctx.font = "40px Arial";
		ctx.fillText(value,(500/maps[roomNum][y].length)*(x)+10,500/maps[roomNum].length*(y+1)-10);
		//50*(y+1)-5,50*(x)+5*/
	}
}
function getColorByTile(wallValue) {//gets the color of a tile and converts it to a hexcolor
	rVal = tileColors[wallValue][0];
	bVal = tileColors[wallValue][1];
	gVal = tileColors[wallValue][2];
	hexColor = "#"+hexSyntax(baseCon(rVal,10,16))+hexSyntax(baseCon(bVal,10,16))+hexSyntax(baseCon(gVal,10,16));
	//console.log(hexColor);
	return hexColor;
	
}
//END Drawing2D----------------------------------------------------------------------------------------------------------------------------------

