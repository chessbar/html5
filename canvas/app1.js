var canvas;
var stage;
var txt;
var count=0;
window.onload= function(){
	canvas =document.getElementById('mycanvas');
	stage =new createjs.Stage(canvas);
	txt = new createjs.Text("====>","20px Arial","#ff0000");
	stage.addChild(txt);
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick",tick);
}
function tick(e){
	count++;
	txt.text="=====>"+count+"<=====";
	stage.update();
}