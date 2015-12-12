var can1,ctx1,can2,ctx2,lastTime,deltaTime,canWidth,canHeight;
var bgPic=new Image();
var ane;
var fruit;
window.onload=game;
function game(){
	init();
	lastTime= Date.now();
	deltaTime=0
	gameloop();
}
function init(){
	can1=document.getElementById('can1');
	ctx1=can1.getContext('2d');
	can2=document.getElementById('can2');
	ctx2=can2.getContext('2d');
	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;
	ane=new aneObj();
	ane.init();
	fruit=new fruitObj();
	fruit.init();

}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	drawBackground();
	ane.draw();
	fruit.draw();
	fruit.fruitMonotor();
}