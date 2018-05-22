function fnxihua() {
    var change = 1;
    var rawimgdata = rawcontext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var arr = new Array(); //先声明一维
    for (var i = 0; i < myCanvas.height; i++) { //一维长度
        arr[i] = new Array(i); //在声明二维
        for (var j = 0; j < myCanvas.width; j++) { //二维长度为5
            arr[i][j] = {};
        }
    }
    var S = new Array(); //先声明一维
    for (var i = 0; i < 5; i++) { //一维长度
        S[i] = new Array(i); //在声明二维
        for (var j = 0; j < 5; j++) { //二维长度为5
            S[i][j] = i;
        }
    }

    for (var i = 3; i < imgdata.data.length; i += 4) {
        imgdata.data[i] = 255;
    }

    while (change) {
        change = 0;
        for (var i = 0; i < myCanvas.height; i++) {
            for (var j = 0; j < myCanvas.width; j++) {
                arr[i][j].red = imgdata.data[(i * myCanvas.width + j) * 4];
                arr[i][j].green = imgdata.data[(i * myCanvas.width + j) * 4 + 1];
                arr[i][j].blue = imgdata.data[(i * myCanvas.width + j) * 4 + 2];
                arr[i][j].al = imgdata.data[(i * myCanvas.width + j) * 4 + 3];
            }
        }
        for (var j = 2; j < myCanvas.height - 2; j++) {
            for (var i = 2; i < myCanvas.width - 2; i++) {
                index = (j * myCanvas.width + i) * 4;
                // 如果源图像中当前点为白色，则跳过
                if (arr[j][i].red > 127)
                    continue;
                // 获得当前点相邻的5×5区域内像素值，白色用0代表，黑色用1代表
                for (var m = 0; m < 5; m++) {
                    for (var n = 0; n < 5; n++) {
                        if (arr[j + m - 2][i - 2 + n].red > 127)
                            S[m][n] = 0;
                        else
                            S[m][n] = 1;
                    }
                }
                Num = S[1][1] + S[1][2] + S[1][3] + S[2][1] +
                    S[2][3] + S[3][1] + S[3][2] + S[3][3];
                if (Num < 2 || Num > 6) {
                    imgdata.data[index] = 0;
                    imgdata.data[index + 1] = 0;
                    imgdata.data[index + 2] = 0;
                    imgdata.data[index + 3] = 255;
                    continue;
                }
                // 判断条件二是否成立：
                Num = 0;
                if (S[1][2] == 0 && S[1][1] == 1)
                    Num++;
                if (S[1][1] == 0 && S[2][1] == 1)
                    Num++;
                if (S[2][1] == 0 && S[3][1] == 1)
                    Num++;
                if (S[3][1] == 0 && S[3][2] == 1)
                    Num++;
                if (S[3][2] == 0 && S[3][3] == 1)
                    Num++;
                if (S[3][3] == 0 && S[2][3] == 1)
                    Num++;
                if (S[2][3] == 0 && S[1][3] == 1)
                    Num++;
                if (S[1][3] == 0 && S[1][2] == 1)
                    Num++;
                if (Num != 1) {
                    imgdata.data[index] = 0;
                    imgdata.data[index + 1] = 0;
                    imgdata.data[index + 2] = 0;
                    imgdata.data[index + 3] = 255;
                    continue;
                }
                // 判断条件三是否成立；
                if (S[1][2] * S[2][1] * S[2][3] != 0) {
                    Num = 0;
                    if (S[0][2] == 0 && S[0][1] == 1)
                        Num++;
                    if (S[0][1] == 0 && S[1][1] == 1)
                        Num++;
                    if (S[1][1] == 0 && S[2][1] == 1)
                        Num++;
                    if (S[2][1] == 0 && S[2][2] == 1)
                        Num++;
                    if (S[2][2] == 0 && S[2][3] == 1)
                        Num++;
                    if (S[2][3] == 0 && S[1][3] == 1)
                        Num++;
                    if (S[1][3] == 0 && S[0][3] == 1)
                        Num++;
                    if (S[0][3] == 0 && S[0][2] == 1)
                        Num++;
                    if (Num == 1) {
                        imgdata.data[index] = 0;
                        imgdata.data[index + 1] = 0;
                        imgdata.data[index + 2] = 0;
                        imgdata.data[index + 3] = 255;
                        continue;
                    }
                }
                // 判断条件四是否成立：
                if (S[1][2] * S[2][1] * S[3][2] != 0) {
                    Num = 0;
                    if (S[1][1] == 0 && S[1][0] == 1)
                        Num++;
                    if (S[1][0] == 0 && S[2][0] == 1)
                        Num++;
                    if (S[2][0] == 0 && S[3][0] == 1)
                        Num++;
                    if (S[3][0] == 0 && S[3][1] == 1)
                        Num++;
                    if (S[3][1] == 0 && S[3][2] == 1)
                        Num++;
                    if (S[3][2] == 0 && S[2][2] == 1)
                        Num++;
                    if (S[2][2] == 0 && S[1][2] == 1)
                        Num++;
                    if (S[1][2] == 0 && S[1][1] == 1)
                        Num++;
                    if (Num == 1) {
                        imgdata.data[index] = 0;
                        imgdata.data[index + 1] = 0;
                        imgdata.data[index + 2] = 0;
                        imgdata.data[index + 3] = 255;
                        continue;
                    }
                }
                // 如果条件均满足则删除该点
                imgdata.data[index] = 255;
                imgdata.data[index + 1] = 255;
                imgdata.data[index + 2] = 255;
                imgdata.data[index + 3] = 255;
                change = 1;
            }
        }
    }
    context.putImageData(imgdata, 0, 0);
}