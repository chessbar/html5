documentWidth=window.screen.availWidth;
if(documentWidth>=500){
		gridContainerWidth=500;
		cellSideLength=100;
		cellSpace=20;
	}else{
		gridContainerWidth= 0.92*documentWidth;
		cellSideLength=0.18*documentWidth;
		cellSpace=0.04*documentWidth;
	}
function getPosTop(i,j){
	return cellSpace + i*(cellSideLength+cellSpace);
}
function getPosLeft(i,j){
	return cellSpace + j*(cellSideLength+cellSpace);
}
function getNumCellBgColor(number){
	switch (number) {
		case 2 :return "#eee4da";break;
		case 4 :return "#ede0c8";break;
		case 8 :return "#f2b179";break;
		case 16 :return "#f59563";break;
		case 32 :return "#f67c5f";break;
		case 64 :return "#f65e3b";break;
		case 128 :return "#edcf72";break;
		case 256 :return "#edcc61";break;
		case 512 :return "#9c0";break;
		case 1024 :return "#33b5e5";break;
		case 2048 :return "#09c";break;
		case 4096 :return "#a6c";break;
		case 8192 :return "#93c";break;
	}
	return "black";
}
function getNumCellColor(number){
	if(number < 4){
		return "#776e65";
	}
	return "white";
}

function nospace(board){
	for (var i = 0; i < 4; i ++ ) {
		for (var j = 0; j < 4; j ++ ) {
			if(board[i][j] == 0) return false;
		};
	};
	return true;
}
function canMoveLeft(){
	for (var i = 0; i < 4; i ++ )
		for (var j = 1; j < 4; j ++ )
			if(board[i][j] !=0)
				if(board[i][j-1] == 0 || board[i][j]==board[i][j-1]) 
					return true;
	return false;
}
function canMoveRight(){
	for (var i = 0; i < 4; i ++ )
		for (var j = 2; j >= 0; j -- )
			if(board[i][j] !=0)
				if(board[i][j+1] == 0 || board[i][j]==board[i][j+1]) 
					return true;
	return false;
}
function canMoveUp(){
	for (var i = 1; i < 4; i ++ )
		for (var j = 0; j < 4; j ++ )
			if(board[i][j] !=0)
				if(board[i-1][j] == 0 || board[i][j]==board[i-1][j]) 
					return true;
	return false;
}
function canMoveDown(){
	for (var i = 2; i >=0; i -- )
		for (var j = 0; j < 4; j ++ )
			if(board[i][j] !=0)
				if(board[i+1][j] == 0 || board[i][j]==board[i+1][j]) 
					return true;
	return false;
}
//判断中间是否有障碍物
function noBlockHorizontalRow(row ,coll ,col2 ,borad){
	for (var i = coll +1 ; i < col2; i ++ )
		if(board[row][i] !=0)
			return false;
	return true;
}
function noBlockHorizontalCol(col ,row ,row2 ,borad){
	for (var i = row +1 ; i < row2; i ++ )
		if(board[i][col] !=0)
			return false;
	return true;
}
function nomove(board){
	if(canMoveDown() || canMoveUp() || canMoveRight() || canMoveLeft()) return false;
	return true;
}
