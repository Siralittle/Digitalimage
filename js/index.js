var myCanvas = document.querySelector("#myCanvas");
var rawcanvas = document.querySelector("#rawCanvas");
var context = myCanvas.getContext('2d');
var rawcontext = rawCanvas.getContext('2d');
var processline = document.querySelector(".process");
var processblue = document.querySelector(".blue");
var newpic = document.createElement("input");
newpic.type = "file";
newpic.id = "myFile";
newpic.addEventListener("change", function (event) {
	var selectedFile = event.target.files[0];
	var reader = new FileReader();
	reader.onload = putImage2Canvas;
	reader.readAsDataURL(selectedFile);
});

// 获取菜单
var openitem = document.querySelector("#open");
var save = document.querySelector("#save");
var myexit = document.querySelector("#exit");
var begray = document.querySelector("#begray");
var becolorful = document.querySelector("#becolorful");
var belight = document.querySelector("#belight");
var shuipingxiao = document.querySelector("#shuipingxiao");
var chuizhixiao = document.querySelector("#chuizhixiao");

//绑定事件
openitem.addEventListener("click", function(){
	newpic.click();
}, false);
save.addEventListener("click", fnsave, false);
myexit.addEventListener("click", fnexit, false);
begray.addEventListener("click", fnbegray, false);
becolorful.addEventListener("click", fnbecolorful, false);
belight.addEventListener("click", fnbelight, false);
shuipingxiao.addEventListener("click", fnshuipingxiao,false);
chuizhixiao.addEventListener("click", fnchuizhixiao, false);


function getDateByhanglie(hang,lie){
	var imgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
	var result = new Array();
	result[0] = imgdata.data[hang*myCanvas.width * 4 + lie*4];
	result[1] = imgdata.data[hang*myCanvas.width * 4  + lie*4 + 1];
	result[2] = imgdata.data[hang*myCanvas.width * 4  + lie*4 + 2];
	result[3] = imgdata.data[hang*myCanvas.width * 4  + lie*4 + 3];
	return result;
}

function putImage2Canvas(event) {
	var img = new Image();
	img.src = event.target.result;
	img.onload = function(){
		rawCanvas.width = img.width;
		myCanvas.width = img.width;
		rawCanvas.height = img.height;
		myCanvas.height = img.height;
		rawcontext.drawImage(img,0,0);
		context.drawImage(img, 0, 0);
    }
}
function fnsave () {
	var result = myCanvas.toDataURL();
	var taba = document.querySelector("#save a");
	taba.href = result;
}
function fnexit () {
    // window.open('','_self','');    
    window.close();
}

function fnbegray() {
	var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
	for(var i=0, len = imgdata.data.length; i < len; i += 4) {
		r = imgdata.data[i];
		g = imgdata.data[i + 1];
		b = imgdata.data[i + 2];
		var gray = r > g ? r : g;
		var gray = gray > b ? gray : b;
		imgdata.data[i] = imgdata.data[i+1] = imgdata.data[i+2] = gray;
	}
	context.putImageData(imgdata, 0, 0);
}

function fnbecolorful() {
	var m_Red = prompt("红");
	if(m_Red == ""){
		return;
	}
	var m_Green = prompt("绿");
	if(m_Green == ""){
		return;
	}
	var m_Blue = prompt("蓝"); 
	if(m_Blue == ""){
		return;
	}
	var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
	for(var i=0, len = imgdata.data.length; i < len; i += 4) {
		r = imgdata.data[i];
		g = imgdata.data[i + 1];
		b = imgdata.data[i + 2];
		var gray = (r*59 + g*30 + b*11)/100;
		imgdata.data[i] = (m_Red * gray) / 255;
		imgdata.data[i + 1] = (m_Green * gray) / 255;
		imgdata.data[i + 2] = (m_Blue * gray) /255;
	}
	context.putImageData(imgdata, 0, 0);
}

function fnbelight() {
	var light = prompt("灰度改变百分比（%）：");
	if(light == ""){
		return;
	}
	var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
	for(var i=0, len = imgdata.data.length; i < len; i += 1) {
		imgdata.data[i] = (imgdata.data[i] * light) / 100;
		if (imgdata.data[i] < 0) {
			imgdata.data[i] = 0;
		}
		if (imgdata.data[i] > 255) {
			imgdata.data[i] = 255;
		}
	}
	context.putImageData(imgdata, 0, 0);
}

function fnshuipingxiao () {
	var index;
	var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
	var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
	for(var i = 0; i < myCanvas.height; i++){
		for(var j = 1; j < myCanvas.width-1; j++){
			index = i*myCanvas.width*4+j*4;
			if(getDateByhanglie(i,j-1)[0] > 128){
				imgdata.data[index] = 0;
				imgdata.data[index+1] = 0;
				imgdata.data[index+2] = 0;
				imgdata.data[index+3] = 0;
			}
			if(getDateByhanglie(i,j+1)[0] > 128){
				imgdata.data[index] = 0;
				imgdata.data[index+1] = 0;
				imgdata.data[index+2] = 0;
				imgdata.data[index+3] = 0;
			}
		}
	}
	context.putImageData(imgdata, 0, 0);
}

function fnchuizhixiao () {
	var index;
	var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
	var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
	for(var i = 1; i < myCanvas.height - 1; i++){
		for(var j = 0; j < myCanvas.width; j++){
			beblue(i,j,myCanvas.width,myCanvas.height);
			index = i*myCanvas.width*4+j*4;
			if(getDateByhanglie(i-1,j)[0] > 128){
				imgdata.data[index] = 0;
				imgdata.data[index+1] = 0;
				imgdata.data[index+2] = 0;
				imgdata.data[index+3] = 0;
			}
			if(getDateByhanglie(i+1,j)[0] > 128){
				imgdata.data[index] = 0;
				imgdata.data[index+1] = 0;
				imgdata.data[index+2] = 0;
				imgdata.data[index+3] = 0;
			}
		}
	}
	context.putImageData(imgdata, 0, 0);
}

function beblue(i,j,a,b){
	processblue.style.width = ((i*a+j)/(a*b)*500)+"px";
}