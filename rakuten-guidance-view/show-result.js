
//テキストファイルを読み込んであれやこれやする関数
function showResults() {

    console.clear();

    //APIを叩いたとき返ってくるファイルのstringデータ
    var sampleAll = '{"0":{"guidance_id": 0, "name": "Mikki", "sex": "M", "price": 3000, "age": 54, "rating": 4.2, "language": ["English", "Japanese"], "region": ["sinjuku", "sibuya"]},' +
        '"1":{"guidance_id": 1, "name": "Doraemon", "sex": "M", "price": 4000, "age": 200, "rating": 3.7, "language": ["English", "Japanese", "French", "German", "Chinese"], "region": ["sinjuku", "sibuya", "chiyoda", "sinagawa", "meguro"]},' +
        '"2":{"guidance_id": 2, "name": "Shizuka", "sex": "F", "price": 2000, "age": 10, "rating": 2.5, "language": ["English", "Japanese"], "region": ["sinagawa"]},' +
        '"3":{"guidance_id": 3, "name": "Nyarth", "sex": "M", "price": 4000, "age": 5, "rating": 3.2, "language": ["Japanese", "Pokemon"], "region": ["meguro"]}}';
    var sampleOne = '{"guidance_id": 0, "name": "Mikki", "sex": "M", "price": 3000, "age": 54, "rating": 4.2, "language": ["English", "Japanese"], "region": ["sinjuku", "sibuya"]}';

    var URL = "http://127.0.0.1:5000/teachers/search/?sex=M&language=Japanese&region=sibuya&price_low=20&price_high=10000&rating_low=0.5&rating_high=5.0&age_low=1&age_high=400";
    $.getJSON(URL,function(json){
        data = JSON.stringify(json);
        jsonData = JSON.parse(data);
        console.log(jsonData);
        arrangeListOfCandidates(jsonData);
    });

    // json = JSON.parse(sampleAll);
    // console.log(json);
    //
    // arrangeListOfCandidates(json);

}

function arrangeListOfCandidates(json) {
    var html = "";
    var numberOfCandidates = Object.keys(json).length
    for (var i = 0; i < numberOfCandidates; i++){
        var data = json[i];
        console.log(data);
        html = html + displayOneCandidate(data);
    }
    // document.write(html);

    var results = document.getElementById("guidance-list");
    results.innerHTML = html;
}

function displayOneCandidate(candidate) {
    var id = candidate.guidance_id;
    var name = candidate.name;
    var sex = candidate.sex;
    var price = candidate.price;
    var age = candidate.age;
    var language = candidate.language;
    var region = candidate.region;
    var rating = candidate.rating;


    var html = '<h2 id="h2"><span style="background-color:#FFCACA;">' + name + '</span></h2>' +
        '<h4>' + sex + '</h4>' +
        '<h4>' + language + '</h4>' +
        '<ul class="cf">';

    html += '</ul>';

    return html;

}