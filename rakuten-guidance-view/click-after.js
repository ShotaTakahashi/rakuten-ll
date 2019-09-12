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
    return categoryKey
}


jQuery(function () {
    const idx = getParam();

    var headerURL = "http://127.0.0.1:5000/";
    var params = "teachers/user/?";
    var user_id = "user_id=" + idx;

    var requestURL = headerURL + params + user_id;
    console.log(requestURL)
    $.getJSON(requestURL, function(sample_list){
        var h = '<dt>'
            + sample_list.name
            + '</dt>'
            + '<dd>'
            + sample_list.sex
            + '</dd>'
            + '<dd>'
            + sample_list.price
            + '</dd>'
            + '<dd>'
            + sample_list.age
            + '</dd>'
            + '<dd>'
            + sample_list.rating
            + '</dd>'
            + '<dd>'
            + sample_list.language
            + '</dd>'
            + '<dd>'
            + sample_list.region
            + '</dd>';
        $("dl#wrap").append(h);
    });
});