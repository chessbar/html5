var board= new Array();
var hasConflicted= new Array();
var score=0;
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(function(){
	prepareForMobile();
	newgame();
});
function prepareForMobile(){
	$("#grid-container").css('width',gridContainerWidth-2*cellSpace);
	$("#grid-container").css('height',gridContainerWidth-2*cellSpace);
	$("#grid-container").css('padding',cellSpace);
	$("#grid-container").css('border-radius',0.02*gridContainerWidth);
	$(".grid-cell").css('width',cellSideLength);
	$(".grid-cell").css('height',cellSideLength);
	$(".grid-cell").css('border-radius',0.02*cellSideLength);
}
function newgame(){
	//初始化棋盘格
	init();
	//在随机的两个格子里生成数字
	generateNumber();
	generateNumber();
}
function init(){
	for (var i = 0; i < 4; i ++ ) {
		for (var j = 0; j < 4; j ++ ) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		};
	};
	for (var i = 0; i < 4; i ++ ) {
		board[i] = new Array();
		hasConflicted[i]=new Array();
		for (var j = 0; j < 4; j ++ ) {
			board[i][j]=0;
			hasConflicted[i][j]=false;
		};
	};
	updateBoradView();
	score =0;
}
function updateBoradView(){
	$(".number-cell").remove();
	for (var i = 0; i < 4; i ++ ) {
		for (var j = 0; j < 4; j ++ ) {
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j] == 0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2 );
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2 );
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumCellBgColor(board[i][j]));//背景色
				theNumberCell.css('color',getNumCellColor(board[i][j]));//前景色
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		};
		$(".number-cell").css('line-height',cellSideLength+'px');
		$(".number-cell").css('font-size',0.4*cellSideLength+'px');
	};
}

function generateNumber(){
	if(nospace(board)) return false;
     //随机一个位置
     var randx=parseInt(Math.floor(Math.random()*4));
     var randy=parseInt(Math.floor(Math.random()*4));
     //判断生成随机位置上是否已经有了数字
     var times=0 //循环次数
     while(times <30){
     	if (board[randx][randy] == 0) break;
     	 randx=parseInt(Math.floor(Math.random()*4));
         randy=parseInt(Math.floor(Math.random()*4));
     }
     if(times ==30){
     	for (var i = 0; i < 4; i ++ )
		   for (var j = 0; j < 4; j ++ ){
		   		if(board[i][j] == 0){
		   			randx=i;
		   			randy=j;
		   		}
		   }
     }
     //随机一个数 2 4
     var randNumber =Math.random() < 0.5 ? 2 :4 ;
     //在随机位置显示随机数字
     board[randx][randy]=randNumber;
     showNumberWithAnimation(randx , randy , randNumber);//生成动画
	return true;
}
$(document).keydown(function(event){
	//event.preventDefault();//阻挡默认效果
	switch (event.keyCode){
		case 37://left
			event.preventDefault();
			if(moveLeft()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		break;
		case 38://up
			event.preventDefault();
		if(moveUp()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		break;
		case 39://right
			event.preventDefault();
		if(moveRight()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		break;
		case 40://down
			event.preventDefault();
		if(moveDown()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		break;
		default:
		break;
	}
});
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	var deltax=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(deltax)<0.2*documentWidth && Math.abs(deltay)<0.2*documentWidth)
		return;
	//x
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax>0){
			//right
			if(moveRight()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		}
		else{
			//left;
			if(moveLeft()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		}
	}//y
	else{
		if(deltay>0){
			//down
			if(moveDown()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		}
		else{
			//up;
			if(moveUp()){
				setTimeout('generateNumber()',200);
				setTimeout('isgameover()',300);
			}
		}
	}
});
////
document.addEventListener('touchmove',function(event){
	event.preventDefault();
})
function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}
function gameover(){
	alert('gameover');
}
function moveLeft(){
	//判断是否可以向左移动
	if(!canMoveLeft()) return false;
	for (var i = 0; i < 4; i ++ )
		for (var j = 0; j < 4; j ++ )
			if(board[i][j] !=0){
				for (var k = 0; k < j; k ++ ){
					if(board[i][k] == 0 && noBlockHorizontalRow(i,k,j,board)){
						//move;
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if (board[i][k] == board[i][j] && noBlockHorizontalRow(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] +=board[i][j];
						board[i][j]=0;
						score +=board[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						// 叠加
						 continue;
					}
				}
			}
			setTimeout('updateBoradView()',200);
	return true;
}
function moveRight(){
	//判断是否可以向右移动
	if(!canMoveRight()) return false;
	for (var i = 0; i < 4; i ++ )
		for (var j = 3; j >= 0; j -- )
			if(board[i][j] !=0){
				for (var k = 3; k >j; k -- ){
					if(board[i][k] == 0 && noBlockHorizontalRow(i,j,k,board)){
						//move;
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if (board[i][k] == board[i][j] && noBlockHorizontalRow(i,j,k,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] +=board[i][j];
						board[i][j]=0;
						score +=board[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						// 叠加
						 continue;
					}
				}
			}
			setTimeout('updateBoradView()',200);
	return true;
}
function moveUp(){
	//判断是否可以向左移动
	if(!canMoveUp()) return false;
	for (var i = 0; i < 4; i ++ )
		for (var j = 0; j < 4; j ++ )
			if(board[i][j] !=0){
				for (var k = 0; k < i; k ++ ){
					if(board[k][j] == 0 && noBlockHorizontalCol(j,k,i,board)){
						//move;
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockHorizontalCol(j,k,i,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] +=board[i][j];
						board[i][j]=0;
						score +=board[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						// 叠加
						 continue;
					}
				}
			}
			setTimeout('updateBoradView()',200);
	return true;
}
function moveDown(){
	//判断是否可以向左移动
	if(!canMoveDown()) return false;
	for (var i = 3; i >= 0; i -- )
		for (var j = 0; j < 4; j ++ )
			if(board[i][j] !=0){
				for (var k = 3; k > i; k -- ){
					if(board[k][j] == 0 && noBlockHorizontalCol(j,i,k,board)){
						//move;
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockHorizontalCol(j,i,k,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] +=board[i][j];
						board[i][j]=0;
						score +=board[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						// 叠加
						 continue;
					}
				}
			}
			setTimeout('updateBoradView()',200);
	return true;
}
