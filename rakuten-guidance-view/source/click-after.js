function getParam() {
    var url = location.href;
    parameters = url.split("?");
    params = parameters[1].split("&");
    var paramsArray = [];
    for (it = 0; it < params.length; it++) {
        neet = params[it].split("=");
        paramsArray.push(neet[0]);
        paramsArray[neet[0]] = neet[1];
    }
    var categoryKey = paramsArray["user_id"];
    return categoryKey;
}


jQuery(function () {
    const idx = getParam();

    var headerURL = "http://127.0.0.1:5000/";
    var params = "teachers/user/?";
    var user_id = "guide_id=" + idx;

    var requestURL = headerURL + params + user_id;
    console.log(requestURL)
    $.getJSON(requestURL, function(sample_list){
        var select_language = '<div><b>Laguages</b> <select id="language">';
        sample_list.language.forEach(function (elm) {
            select_language += '<option name="' + elm + '" value="' + elm + '">' + elm + '</option>'
        });
        select_language += '</select></div>';

        var select_region = '<div><b>Available Regions</b> <select id="region">';
        sample_list.region.forEach(function (elm) {
            select_region += '<option name="' + elm + '" value="' + elm + '">' + elm + '</option>'
        });
        select_region += '</select></div>';

        var h = '<div style="background-color: #5e7fca; opacity: 0.7;" id="guide-box">' +
            '<div id="guidance-img-box">' +
            '  <img src="' + selectImg(sample_list.sex, sample_list.guidance_id) + '" id="guide-img">' +
            '</div>' +
            '<h1>' + sample_list.name + '</h1>' +
            '<dd><b>Sex</b>: ' + sample_list.sex + '</dd>' +
            '<dd><b>Age</b>: ' + sample_list.age + '</dd>' +
            '<dd><b>Rating</b>: ' + '<img src="' + selectRatingStars(sample_list.rating) + '" id="guide-rating" width="70" height="15"></dd>' +
            '<br></div>' +
            '<div style="background-color: white; opacity: 0.8; display: flex; align-content: space-between">' +
            select_language + select_region +
            '<div><b>Price</b> ¥' + sample_list.price + '/1h</div></div>' +
            '<p style="text-align: center"><button id="search-button" onclick=location.href=\'./thanks.html\'>Request</button></p>';
        $("dl#wrap").append(h);
    });
});