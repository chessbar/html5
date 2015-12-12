var boxDiv,msgDiv;
window.onload= function(){
	boxDiv=document.getElementById('box');
	msgDiv=document.getElementById('msg');
	/*boxDiv.ondragenter = function(e){
		showObj(e);
	}*/
	boxDiv.ondragover=function(e){
		e.preventDefault();
	}
	boxDiv.ondrop=function(e){
		showObj(e.dataTransfer);
	}
}
function showObj(obj){
	var s='';
	for(var k in obj){
		s+=k+":"+obj[k]+"<br/>"
	}
	msgDiv.innerHTML=s;
}