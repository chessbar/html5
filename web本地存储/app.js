var input;
var btn;
window.onload=function(){
	input=document.getElementById('input');
	btn=document.getElementById('btn');
	if(localStorage.text){
		input.value=localStorage.text;
	}
	btn.onclick=function(){
		localStorage.text=input.value;
	}
}