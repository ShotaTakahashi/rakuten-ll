// // とりあえずJavaScriptでAPI叩くときの雛形
//
// //XMLHttpRequestの作成
// var request = new XMLHttpRequest();
// var KEY = "3b52a6b4f0be239a8357ec950fe1e1b9";
//
// //APIを叩くためのURL
// var URL = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=3b52a6b4f0be239a8357ec950fe1e1b9";
//
// request.open("GET", URL, true);
//
// request.onload = function () {
//     //レスポンスが返って来たときの処理
// }
// request.send();

function getWeatherFromApi() {
    var weatherData;
    var weatherOfThisTime;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=3b52a6b4f0be239a8357ec950fe1e1b9",function(json){
        weatherData = JSON.stringify(json);

        jsonWeatherData = JSON.parse(weatherData);
        weatherOfThisTime = jsonWeatherData.weather[0].main;

        document.write("It is \"" + weatherOfThisTime + "\" in London now.");
    });
}