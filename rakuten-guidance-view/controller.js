

とりあえずJavaScriptでAPI叩くときの雛形

//XMLHttpRequestの作成
var request = new XMLHttpRequest();

//APIを叩くためのURL
var URL = "";

request.open("GET", URL, true);

request.onload = function () {
    //レスポンスが返って来たときの処理
}

request.send();