var myCanvas = document.querySelector("#myCanvas");
var rawcanvas = document.querySelector("#rawCanvas");
var context = myCanvas.getContext('2d');
var rawcontext = rawCanvas.getContext('2d');
var processline = document.querySelector(".process");
var processblue = document.querySelector(".blue");
var newpic = document.createElement("input");
newpic.type = "file";
newpic.id = "myFile";
newpic.addEventListener("change", function(event) {
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
var alldirxiao = document.querySelector("#alldirxiao");
var xihua = document.querySelector("#xihua");
var charrec = document.querySelector(".char");
var masaike = document.querySelector("#masaike");
//绑定事件
openitem.addEventListener("click", function() {
    newpic.click();
}, false);
save.addEventListener("click", fnsave, false);
myexit.addEventListener("click", fnexit, false);
begray.addEventListener("click", fnbegray, false);
becolorful.addEventListener("click", fnbecolorful, false);
belight.addEventListener("click", fnbelight, false);
shuipingxiao.addEventListener("click", fnshuipingxiao, false);
chuizhixiao.addEventListener("click", fnchuizhixiao, false);
alldirxiao.addEventListener("click", fnalldirxiao, false);
xihua.addEventListener("click", fnxihua, false);
charrec.addEventListener("click", fnchar, false);
masaike.addEventListener("click", fnmasaike, false);

function getDataByhanglie(hang, lie) {
    var imgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var result = new Array();
    result[0] = imgdata.data[hang * myCanvas.width * 4 + lie * 4];
    result[1] = imgdata.data[hang * myCanvas.width * 4 + lie * 4 + 1];
    result[2] = imgdata.data[hang * myCanvas.width * 4 + lie * 4 + 2];
    result[3] = imgdata.data[hang * myCanvas.width * 4 + lie * 4 + 3];
    return result;
}

function putImage2Canvas(event) {
    var img = new Image();
    img.src = event.target.result;
    img.onload = function() {
        rawCanvas.width = img.width;
        myCanvas.width = img.width;
        rawCanvas.height = img.height;
        myCanvas.height = img.height;
        rawcontext.drawImage(img, 0, 0);
        context.drawImage(img, 0, 0);
    }
}

function fnsave() {
    var result = myCanvas.toDataURL();
    var taba = document.querySelector("#save a");
    taba.href = result;
}

function fnexit() {
    // window.open('','_self','');    
    window.close();
}

function fnbegray() {
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    for (var i = 0, len = imgdata.data.length; i < len; i += 4) {
        r = imgdata.data[i];
        g = imgdata.data[i + 1];
        b = imgdata.data[i + 2];
        var gray = r > g ? r : g;
        var gray = gray > b ? gray : b;
        imgdata.data[i] = imgdata.data[i + 1] = imgdata.data[i + 2] = gray;
    }
    context.putImageData(imgdata, 0, 0);
}

function fnbecolorful() {
    var m_Red = prompt("红");
    if (m_Red == "") {
        return;
    }
    var m_Green = prompt("绿");
    if (m_Green == "") {
        return;
    }
    var m_Blue = prompt("蓝");
    if (m_Blue == "") {
        return;
    }
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    for (var i = 0, len = imgdata.data.length; i < len; i += 4) {
        r = imgdata.data[i];
        g = imgdata.data[i + 1];
        b = imgdata.data[i + 2];
        var gray = (r * 59 + g * 30 + b * 11) / 100;
        imgdata.data[i] = (m_Red * gray) / 255;
        imgdata.data[i + 1] = (m_Green * gray) / 255;
        imgdata.data[i + 2] = (m_Blue * gray) / 255;
    }
    context.putImageData(imgdata, 0, 0);
}

function fnbelight() {
    var light = prompt("灰度改变百分比（%）：");
    if (light == "") {
        return;
    }
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    for (var i = 0, len = imgdata.data.length; i < len; i += 1) {
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

function fnshuipingxiao() {
    var index;
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);

    var arr = new Array(); //先声明一维
    for (var i = 0; i < myCanvas.height; i++) { //一维长度为5
        arr[i] = new Array(i); //在声明二维
        for (var j = 0; j < myCanvas.width; j++) { //二维长度为5
            arr[i][j] = {};
        }
    }

    for (var i = 0; i < myCanvas.height; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            arr[i][j].red = rawimgdata.data[(i * myCanvas.width + j) * 4];
            arr[i][j].green = rawimgdata.data[(i * myCanvas.width + j) * 4 + 1];
            arr[i][j].blue = rawimgdata.data[(i * myCanvas.width + j) * 4 + 2];
            arr[i][j].al = rawimgdata.data[(i * myCanvas.width + j) * 4 + 3];
        }
    }

    for (var i = 0; i < myCanvas.height; i++) {
        for (var j = 1; j < myCanvas.width - 1; j++) {
            index = i * myCanvas.width * 4 + j * 4;
            if (arr[i][j - 1].red > 128) {
                imgdata.data[index] = 0;
                imgdata.data[index + 1] = 0;
                imgdata.data[index + 2] = 0;
                imgdata.data[index + 3] = 0;
            }
            if (arr[i][j + 1].red > 128) {
                imgdata.data[index] = 0;
                imgdata.data[index + 1] = 0;
                imgdata.data[index + 2] = 0;
                imgdata.data[index + 3] = 0;
            }
        }
    }
    context.putImageData(imgdata, 0, 0);
}

function fnchuizhixiao() {
    var index;
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);

    var arr = new Array(); //先声明一维
    for (var i = 0; i < myCanvas.height; i++) { //一维长度为5
        arr[i] = new Array(i); //在声明二维
        for (var j = 0; j < myCanvas.width; j++) { //二维长度为5
            arr[i][j] = {};
        }
    }

    for (var i = 0; i < myCanvas.height; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            arr[i][j].red = rawimgdata.data[(i * myCanvas.width + j) * 4];
            arr[i][j].green = rawimgdata.data[(i * myCanvas.width + j) * 4 + 1];
            arr[i][j].blue = rawimgdata.data[(i * myCanvas.width + j) * 4 + 2];
            arr[i][j].al = rawimgdata.data[(i * myCanvas.width + j) * 4 + 3];
        }
    }

    for (var i = 1; i < myCanvas.height - 1; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            index = i * myCanvas.width * 4 + j * 4;
            if (arr[i - 1][j].red < 128) {
                imgdata.data[index] = 0;
                imgdata.data[index + 1] = 0;
                imgdata.data[index + 2] = 0;
                imgdata.data[index + 3] = 255;
            }
            if (arr[i + 1][j].red < 128) {
                imgdata.data[index] = 0;
                imgdata.data[index + 1] = 0;
                imgdata.data[index + 2] = 0;
                imgdata.data[index + 3] = 255;
            }
        }
    }
    context.putImageData(imgdata, 0, 0);
}

function fnborder() {
    var index;
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    for (var i = 1; i < myCanvas.height - 1; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            // beblue(i,j,myCanvas.width,myCanvas.height);
            index = i * myCanvas.width * 4 + j * 4;
            imgdata.data[index + 3] = 0;
            if (getDataByhanglie(i - 1, j)[0] > 128 ||
                getDataByhanglie(i + 1, j)[0] > 128 ||
                getDataByhanglie(i, j + 1)[0] > 128 ||
                getDataByhanglie(i, j - 1)[0] > 128) {
                imgdata.data[index + 3] = 255;
            }
        }
    }
    context.putImageData(imgdata, 0, 0);
}


function fnalldirxiao() {
    var index;
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);

    var arr = new Array(); //先声明一维
    for (var i = 0; i < myCanvas.height; i++) { //一维长度为5
        arr[i] = new Array(i); //在声明二维
        for (var j = 0; j < myCanvas.width; j++) { //二维长度为5
            arr[i][j] = {};
        }
    }

    for (var i = 0; i < myCanvas.height; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            arr[i][j].red = rawimgdata.data[(i * myCanvas.width + j) * 4];
            arr[i][j].green = rawimgdata.data[(i * myCanvas.width + j) * 4 + 1];
            arr[i][j].blue = rawimgdata.data[(i * myCanvas.width + j) * 4 + 2];
            arr[i][j].al = rawimgdata.data[(i * myCanvas.width + j) * 4 + 3];
        }
    }

    for (var i = 1; i < myCanvas.height - 1; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            index = i * myCanvas.width * 4 + j * 4;
            if (arr[i - 1][j].red > 128 ||
                arr[i + 1][j].red > 128 ||
                arr[i][j + 1].red > 128 ||
                arr[i][j - 1].red > 128) {
                imgdata.data[index] = 0;
                imgdata.data[index + 1] = 0;
                imgdata.data[index + 2] = 0;
                imgdata.data[index + 3] = 0;
            }
        }
    }
    context.putImageData(imgdata, 0, 0);
}


function fnchar() {
    Tesseract.recognize(myCanvas.toDataURL(), {
        lang: "eng",
        classify_bln_numeric_mode: 1
    }).then(function(result) {
        alert(result.text);
    });
}

function fnmasaike() {
    //获取两个canvas
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);

    var arr = new Array(); //先声明一维
    for (var i = 0; i < myCanvas.height; i++) { //一维长度为5
        arr[i] = new Array(i); //在声明二维
        for (var j = 0; j < myCanvas.width; j++) { //二维长度为5
            arr[i][j] = {};
        }
    }

    for (var i = 0; i < myCanvas.height; i++) {
        for (var j = 0; j < myCanvas.width; j++) {
            arr[i][j].red = rawimgdata.data[(i * myCanvas.width + j) * 4];
            arr[i][j].green = rawimgdata.data[(i * myCanvas.width + j) * 4 + 1];
            arr[i][j].blue = rawimgdata.data[(i * myCanvas.width + j) * 4 + 2];
        }
    }

    for (var i = 0; i < myCanvas.height; i += 5) {
        for (var j = 0; j < myCanvas.width; j += 5) {
            var sumr = sumg = sumb = 0;
            for (var m = 0; m < 5; m++) {
                if (i + m >= myCanvas.height) {
                    break;
                }
                for (var n = 0; n < 5; n++) {
                    if (j + n >= myCanvas.width) {
                        break;
                    }
                    sumr += arr[i + m][j + n].red;
                    sumg += arr[i + m][j + n].green;
                    sumb += arr[i + m][j + n].blue;
                }
            }
            for (var m = 0; m < 5; m++) {
                if (i + m >= myCanvas.height) {
                    break;
                }
                for (var n = 0; n < 5; n++) {
                    if (j + n >= myCanvas.width) {
                        break;
                    }
                    arr[i + m][j + n].red = sumr / 25;
                    arr[i + m][j + n].green = sumg / 25;
                    arr[i + m][j + n].blue = sumb / 25;
                }
            }
        }
    }
    for (var i = 0, index = 0; i < imgdata.data.length; i += 4, index++) {
        var heng = Math.floor(index / myCanvas.width);
        var shu = index % myCanvas.height;
        imgdata.data[i] = arr[heng][shu].red;
        imgdata.data[i + 1] = arr[heng][shu].green;
        imgdata.data[i + 2] = arr[heng][shu].blue;
    }
    context.putImageData(imgdata, 0, 0);
}