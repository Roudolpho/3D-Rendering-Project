/*This JavaScript file contains the functions necessary to render the Three Dimensional visuals
 *
 *
 */

//Miscelaneous---------------------------------------------------------------------------------------------------------------------------
function baseCon(value, base, baseTo) {// simple base converter for changing values of Hex-colors
	test = parseInt(Math.round(value), base).toString(baseTo);
	return test;
}
//END Miscelaneous---------------------------------------------------------------------------------------------------------------------------

//Draw 3D----------------------------------------------------------------------------------------------------------------------------------
wall = {distance:0,color:"",found:false,x_dis:0,y_dis:0,midDis:0,value:0,scaling:1.5};//this object is to help me organize my variables
var canvas3D = document.getElementById("rayCasting");
quality = canvas3D.width/quantity;
angles = getAngles(quantity);
wallIntersections = [];

function getAngles(num){
	angleList = [];
	L = 2 * Math.tan(VISIONARC/2);
	interval = L/quantity;
	for(i = 0; i < quantity; i++){
		angleList.push(/*-(VISIONARC / 2)*/ + Math.atan((L/2) - interval*((1/2) + i)));
	}
	console.log(angleList);
	return angleList;
}

function draw3DWalls(roomNum) {//Draws walls for the 3D interpretation
	x = quantity;
	wallIntersectionsTemp = [];
	angles.forEach(angle => {//draws to each pixel in the canvas width
		x--;
		wall.found = false;wall.x_dis = 0;wall.y_dis = 0;//resets the variables in the wall object 
		xd2 = 0;
		yd2 = 0;
		do{//searches incremental for a wall tile in a specific direction
			wall.x_dis += 10*Math.cos(Player.facing + angle);//finds x distance
			xd2 += Math.cos(Player.facing + angle);
			wall.y_dis += 10*Math.sin(Player.facing + angle);//finds y distance
			yd2 += Math.sin(Player.facing + angle);
			xDist=Math.floor((Player.x_pos+wall.x_dis)/(canvas3D.width*10/maps[roomNum][0].length));
			yDist=Math.floor((Player.y_pos+wall.y_dis)/(canvas3D.height*10/maps[roomNum].length));
			if(maps[roomNum][yDist][xDist][0] >= 250){
				wall.found = true;
				wall.value = maps[roomNum][yDist][xDist][0];
				//wall.distance = wall.scaling*Math.abs(Math.sqrt((Math.pow(wall.y_dis,2) + Math.pow(wall.x_dis,2)))*Math.cos(angle));
				//This was an attempt to remove the fisheye, though it failed I have left it so I may study it later
				wall.distance = wall.scaling*Math.abs(Math.sqrt((Math.pow(wall.y_dis,2) + Math.pow(wall.x_dis,2)))*Math.cos(angle));
				wallIntersectionsTemp.push([xd2 + Player.x_pos/10, yd2 + Player.y_pos/10]);

				if (x==250) {
					wall.midDis = wall.distance;//if the room tile is a wall, the wall is recorded
				}
			}
		}while(!wall.found);
		draw3DLine(x, quality)//draws a rectange representing a specific angle depending on the quality
	});
	wallIntersections = wallIntersectionsTemp;
}

/*function draw3DWalls(roomNum) {//Draws walls for the 3D interpretation
	for(x=0;x<canvas3D.width/quality;x++){//draws to each pixel in the canvas width
		angle = (-(VISIONARC / 2)+(x*VISIONARC*quality/canvas3D.width));//math to determine the angle corresponding to any given pixel on the canvas
		wall.found = false;wall.x_dis = 0;wall.y_dis = 0;//resets the variables in the wall object 
		do{//searches incremental for a wall tile in a specific direction
			wall.x_dis += 10*Math.cos(Player.facing + angle);//finds x distance
			wall.y_dis += 10*Math.sin(Player.facing + angle);//finds y distance
			xDist=Math.floor((Player.x_pos+wall.x_dis)/(canvas3D.width*10/maps[roomNum][0].length));
			yDist=Math.floor((Player.y_pos+wall.y_dis)/(canvas3D.height*10/maps[roomNum].length));
			if(maps[roomNum][yDist][xDist][0] >= 250){
				wall.found = true;
				wall.value = maps[roomNum][yDist][xDist][0];
				//wall.distance = wall.scaling*Math.abs(Math.sqrt((Math.pow(wall.y_dis,2) + Math.pow(wall.x_dis,2)))*Math.cos(angle));
				//This was an attempt to remove the fisheye, though it failed I have left it so I may study it later
				wall.distance = wall.scaling*Math.abs(Math.sqrt((Math.pow(wall.y_dis,2) + Math.pow(wall.x_dis,2)))*Math.cos(angle));
				if (x==250) {
					wall.midDis = wall.distance;//if the room tile is a wall, the wall is recorded
				}
			}
		}while(!wall.found);
		draw3DLine(x, quality)//draws a rectange representing a specific angle depending on the quality
	}
}*/

function draw3DLine(pixelNum, quality) {
	var c2 = document.getElementById("rayCasting");
	var ctx2 = c2.getContext("2d");
	color = getColorByDistance(wall.value,wall.distance);//takes the value to hexidecimal
	dist = wall.distance/100;
	if(dist<0){
		dist = 0;
	}
	for(n = 0;n<quality;n++){
		ctx2.beginPath();//draws pixel line
		ctx2.moveTo(pixelNum*quality + n, (dist+(c2.height/5)));//draws the sky
		ctx2.lineTo(pixelNum*quality + n,0);
		ctx2.strokeStyle = '#8888FF';
		ctx2.stroke();
		ctx2.beginPath();//draws pixel line
		ctx2.moveTo(pixelNum*quality + n, (dist+(c2.height/5)));//draws the bottom of the wall
		ctx2.lineTo(pixelNum*quality + n,((c2.height)-dist));//draws the top of the wall
		ctx2.strokeStyle = color;
		ctx2.stroke();
		ctx2.beginPath();//draws pixel line
		ctx2.moveTo(pixelNum*quality + n, c2.height);//draws the grass
		ctx2.lineTo(pixelNum*quality + n,((c2.height)-dist));
		ctx2.strokeStyle = '#007700';
		ctx2.stroke();
	}
}
function draw3DRoom(roomNum) {
	draw3DWalls(roomNum);//Draws the 3D room
}
function getColorByDistance(wallValue,dist) {//Determines the shading of a wall based on its distance from the player
	rVal = tileColors[wallValue][0];//initial red
	bVal = tileColors[wallValue][1];//initial blue
	gVal = tileColors[wallValue][2];//initial green
	rVal = hexBrighten(rVal*Math.pow(2,-(dist+16*Player.radius)/5000));//altered red
	bVal = hexBrighten(bVal*Math.pow(2,-(dist+16*Player.radius)/5000));//altered blue
	gVal = hexBrighten(gVal*Math.pow(2,-(dist+16*Player.radius)/5000));//altered green
	hexColor = "#"+hexSyntax(baseCon(rVal,10,16))+hexSyntax(baseCon(bVal,10,16))+hexSyntax(baseCon(gVal,10,16));//transfers to a hexcolor
	return hexColor;
}
function hexSyntax(value) {//adds a 0 if the translated value is only one character
	if(value.length==1){
		return ("0"+value);
	}
	return value;
}
function hexBrighten(value) {//alters the color for shading
	if(value<=200){
		return value =value*(5/4);
	}
	return value;
}
//END Draw 3D----------------------------------------------------------------------------------------------------------------------------------


