
//テキストファイルを読み込んであれやこれやする関数
function showResults() {

    console.clear();

    var URL = "http://127.0.0.1:5000/teachers/search/?sex=M&language=Japanese&region=sibuya&price_low=20&price_high=10000&rating_low=0.5&rating_high=5.0&age_low=1&age_high=400";
    $.getJSON(URL,function(json){
        data = JSON.stringify(json);
        jsonData = JSON.parse(data);
        console.log(jsonData);
        arrangeListOfCandidates(jsonData);
    });
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

    var html = '<div id="all-guidances">' +
        '  <button type="button" id="one-box-for-guidance">' +
        '  <div id="top-of-box">' +
        '  <div id="guidance-img-box">' +
        '  <img src="' + selectImg(sex, id) + '" id="guidance-img">' +
        '  </div>' +
        '  <div id="guidance-strings">' +
        '  <div id="guidance-name">' + name + '</div>' +
        '  <div id="guidance-languages">' +
        '  <div id="guidance-language">' + arrangeArrayOfString(language) + '</div>' +
        // '  <div id="guidance-language">English</div>' +
        '  </div>' +
        '  <div id="guidance-regions">' +
        '  <div id="guidance-region">' + arrangeArrayOfString(region) + '</div>' +
        // '  <div id="guidance-region">' + region + '</div>' +
        '  </div>' +
        '  <div id="guidance-price">¥' + price + '</div>' +
        '  <img src="' + selectRatingStars(rating) + '" id="guidance-rating">' +
        '  </div>' +
        '  </div>' +
        '  </div>';

    return html;

}

function selectImg(sex, id) {
    var img = "";

    if (sex == 'M'){
        switch (id % 4) {
            case 0:
                img = "image/boy1.png";
                break;
            case 1:
                img = "image/boy2.png";
                break;
            case 2:
                img = "image/boy3.png";
                break;
            case 3:
                img = "image/boy4.png";
                break;
        }
    } else {
        switch (id % 4) {
            case 0:
                img = "image/girl1.png";
                break;
            case 1:
                img = "image/girl2.png";
                break;
            // case 2:
            //     img = "image/boy3.png";
            //     break;
            // case 3:
            //     img = "image/boy4.png";
            //     break;
        }
    }
    console.log(img);
    return img;
}

function selectRatingStars(rating) {

    var img = "";

    if (rating < 1) {
        img = "image/star0.png";
    } else if (rating < 2) {
        img = "image/star1.png";
    } else if (rating < 3) {
        img = "image/star2.png";
    } else if (rating < 4) {
        img = "image/star3.png";
    } else if (rating < 5) {
        img = "image/star4.png";
    } else {
        img = "image/star5.png";
    }

    return img;

}

function arrangeArrayOfString(array) {

    var string = "";

    array.forEach(function (value) {
        string = string + " / " + value;
    });

    return string.slice(3);
}

function selectBackground() {
    var backgroundImg = "";
    console.log("ここ");

    var random = Math.floor(Math.random()*100);
    switch (random % 3) {
        case 0:
            backgroundImg = "../image/background1.jpg";
            break;
        case 1:
            backgroundImg = "../image/background2.jpg";
            break;
        case 2:
            backgroundImg = "../image/background3.jpg";
            break;
    }
    document.body.style.backgroundImage = 'url("' + backgroundImg + '");';
    console.log("ここ");
}

//
// <div id="all-guidances">
//     <button type="button" id="one-box-for-guidance">
//     <div id="top-of-box">
//     <div id="guidance-img-box">
//     <img src="img/boy1.png" id="guidance-img">
//     </div>
//     <div id="guidance-strings">
//     <div id="guidance-name">Mikki</div>
//     <div id="guidance-languages">
//     <div id="guidance-language">Japanese</div>
//     <div id="guidance-language">English</div>
//     </div>
//     <div id="guidance-regions">
//     <div id="guidance-region">Shinjuku</div>
//     <div id="guidance-region">Shibuya</div>
//     </div>
//     <div id="guidance-price">¥3,000</div>
// <div id="guidance-rating">★★★★☆</div>
// </div>
// </div>
// </div>