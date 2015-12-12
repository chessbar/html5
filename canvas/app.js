var CANVAS_WIDTH=500,CANVAS_HEIGHT=500,mycanvas,context;
window.onload = function(){
    createCanvas();
    //drawRect();
    //drawImage();
    //drawArc();
    //drawLine();
    //drawJB();
    //drawRadialGradient();
    //drawBX();
    //drawZH();
    //drawShadow();
    //drawImages();
    createjs();
}
function createCanvas(){
	document.body.innerHTML="<canvas id=\"mycanvas\" width=\""+CANVAS_WIDTH+"\" height=\""+CANVAS_HEIGHT+"\"></canvas>";
	mycanvas=document.getElementById('mycanvas');
	context=mycanvas.getContext('2d');
}
function drawRect(){
	context.fillStyle="#d90";
	//context.rotate(45);//旋转角度
	//context.translate(50,50);//移动
	context.scale(2,0.5);//缩放
	context.fillRect(0,0,200,200);
}
function drawImage(){
	var img =new Image();
	img.onload=function(){
		context.drawImage(img,100,100);
	}
	img.src='1.jpg';

}
/**
 * [drawArc 绘制圆形]
 * @return {[type]} [description]
 */
function drawArc(){
	for(var i=0;i<=10;i++){
		context.beginPath();//开始路径
		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
		context.closePath();//关闭路径
		context.fillStyle="rgba(255,0,0,0.3)";
		context.fill();
	}
}
 function drawLine(){
 	var dx=150,dy=150;
 	context.beginPath();
 	context.fillStyle='rgb(100,255,100)';
 	context.strokeStyle='rgb(0,0,100)';
 	var x=Math.sin(0);
 	var y=Math.cos(0);
 	var s=100;
 	var dig=Math.PI/15*11;
 	context.moveTo(dx,dy);
 	for(var i=0 ;i<=30;i++){
 		var x=Math.sin(i*dig);
 		var y=Math.cos(i*dig);
 		context.lineTo(dx+x*s,dy+y*s);
 	}
 	context.closePath();
 	context.fill();
 }
 /**
  * [drawJB 绘制线性渐变]
  * @return {[type]} [description]
  */
function drawJB(){
	var g1=context.createLinearGradient(0,0,0,300);
	g1.addColorStop(0,"rgb(255,255,0");
	g1.addColorStop(1,"rgb(0,255,255");
	context.fillStyle=g1;
	context.fillRect(0,0,500,500);
	var g2=context.createLinearGradient(0,0,300,0);
	g2.addColorStop(0,"rgba(0,0,255,0.5)");
	g2.addColorStop(1,"rgba(255,0,0,0.5)");
	for(var i=0;i<=10;i++){
		context.beginPath();
		context.fillStyle=g2;
		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
}
/**
 * [drawRadialGradient 绘制径向渐变]
 * @return {[type]} [description]
 */
function drawRadialGradient(){
	var g1=context.createRadialGradient(250,250,0,250,250,400);
	g1.addColorStop(0.1,"rgb(255,255,0)");
	g1.addColorStop(0.4,"rgb(255,0,255)");
	g1.addColorStop(1,"rgb(0,255,255)");
	context.fillStyle=g1;
	context.fillRect(0,0,500,500);
	context.fill();
}
/**
 * [drawBX 绘制变形图像]
 * @return {[type]} [description]
 */
function drawBX(){
	context.fillStyle="#dedede";
	context.fillRect(0,0,500,500);
	context.translate(200,50);
	context.fillStyle="rgba(255,0,0,0.25)";
	for(var i=0;i<=50;i++){
		context.translate(25,25);
		context.scale(0.95,0.95);
		context.rotate(Math.PI/10);
		context.fillRect(0,0,100,50);
	}
}
/**
 * [drawZH 图形组合]
 * @return {[type]} [description]
 */
function drawZH(){
	var oprtns= new Array(
			"source-atop",
			"source-in",
			"source-out",
			"source-over",
			"destination-atop",
			"destination-in",
			"destination-out",
			"destination-over",
			"lighter",
			"copy",
			"xor"
		);
	i=10;
	context.fillStyle="#dedede";
	context.fillRect(10,10,60,60);
	context.globalCompositeOperation=oprtns[i];
	context.beginPath();
	context.fillStyle="#d90d90";
	context.closePath();
	context.arc(60,60,30,0,Math.PI*2,true);
	context.fill();
}
/**
 * [drawShadow 绘制阴影]
 * @return {[type]} [description]
 */
function drawShadow(){
	context.fillStyle="#EEEEEF";
	context.fillRect(0,0,500,500);
	context.shadowOffsetX=10;//偏移量
	context.shadowOffsetY=10;
	context.shadowColor="rgba(100,100,100,0.5)";
	context.shadowBlur=3.5;//模糊程度
	context.translate(0,50);
	for(var i=0;i<3;i++){
		context.translate(100,100);
		create5star(context);
	}
}
function create5star(context){
	//绘制一个五角星
	var dx=80;
	var dy=80;
	var s=50;
	context.beginPath();
	context.fillStyle="rgba(255,0,0,0.25)";
	var dig=Math.PI/5*4;
	for(var i=0;i<5;i++){
		var x=Math.sin(i*dig);
		var y=Math.cos(i*dig);
		context.lineTo(dx+x*s,dy+y*s);
	}
	context.closePath();
	context.fill();
}

/**
 * context.drawImage(img,x,y);//
 * context.drawImage(img,x,y,w,h);//w,h,图片的宽高
 * context.drawImage(img,x,y,sx,sy,sw,sh,dx,dy,dw,dh);
 */
function drawImages(){
	img = new Image();
	img.src="1.jpg";
	img.onload=function(){
		//context.drawImage(img,0,0,100,100);
		context.drawImage(img,50,50,100,100,50,50,100,100);
	}
}
function createjs(){
	//var stage=new createjs.Stage(mycanvas);
	var stage = new createjs.Stage("mycanvas");
	var txt=new createjs.Text('====>',"20px Arial","#ff7700");
	stage.addChild(txt);
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener('tick',tick);
}
var count=0;
function tick(e){
	count++;
	txt.text="====>"+count+"<====";
	stage.update();
}









