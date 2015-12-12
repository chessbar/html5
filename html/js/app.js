
function DLT(){
	$("#contianer").empty();
	var str='';
	red=random(5, 1, 35);
	str+=formatstr(red,'red');
	blue=random(2, 1, 12);
	str+=formatstr(blue,'blue');
	$("#contianer").append(str);
}
function SSQ(){
	$("#contianer").empty();
	var str='';
	red=random(6, 1, 33);
	str+=formatstr(red,'red');
	blue=random(1, 1, 16);
	str+=formatstr(blue,'blue');
	$("#contianer").append(str);
}
/**
 * [random 生成随机数n]
 * @param  {[type]} num [个数]
 * @param  {[type]} min [最小数]
 * @param  {[type]} max [最大数]
 * @return {[type]}     [数组]
 */
function random(num,min,max){
	var random=[];
	var randomX=0;
	for(var i=0;i<num;i++){
		if(i<=0){
			do{
				randomX=Math.ceil(Math.random()*max);
			}while(randomX<min);
			random[i]=randomX;		
		}else{
			do{
				randomX=Math.ceil(Math.random()*max);
			}while(randomX<min || $.inArray(randomX,random)>=0);
			random[i]=randomX;
		}
	}
	random = random.sort(function(a,b){
		return a-b;
	});
	return random;
}
/**
 * [formatstr 格式化数字]
 * @param  {[type]} data  [description]
 * @param  {[type]} color [description]
 * @return {[type]}       [description]
 */
function formatstr(data,color){
	var str="";
		$.each(data,function(i){
			str+="<span class='"+color+"'>"+data[i]+"</span>"
		})
	return str;
}
//alert($.md5("000000"));