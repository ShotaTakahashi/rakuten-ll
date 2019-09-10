
//テキストファイルを読み込んであれやこれやする関数
function showResults() {

    console.clear();

    //APIを叩いたとき返ってきたテキストファイル
    var sampleAll = '{"0":{"guidance_id": 0, "name": "Mikki", "sex": "M", "price": 3000, "age": 54, "rating": 4.2, "language": ["English", "Japanese"], "region": ["sinjuku", "sibuya"]},' +
        '"1":{"guidance_id": 1, "name": "Doraemon", "sex": "M", "price": 4000, "age": 200, "rating": 3.7, "language": ["English", "Japanese", "French", "German", "Chinese"], "region": ["sinjuku", "sibuya", "chiyoda", "sinagawa", "meguro"]},' +
        '"2":{"guidance_id": 2, "name": "Shizuka", "sex": "F", "price": 2000, "age": 10, "rating": 2.5, "language": ["English", "Japanese"], "region": ["sinagawa"]},' +
        '"3":{"guidance_id": 3, "name": "Nyarth", "sex": "M", "price": 4000, "age": 5, "rating": 3.2, "language": ["Japanese", "Pokemon"], "region": ["meguro"]}}';
    var sampleOne = '{"guidance_id": 0, "name": "Mikki", "sex": "M", "price": 3000, "age": 54, "rating": 4.2, "language": ["English", "Japanese"], "region": ["sinjuku", "sibuya"]}';

    json = JSON.parse(sampleAll);
    console.log(json);

    arrangeListOfResults(json);

}

function arrangeListOfResults(json) {
    for (var i = 0; i < 4; i++){
        var data = json[i];
        console.log(data);
    }
}