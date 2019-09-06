function searchTeacher(){
    //alert('hello');
    console.log("hello");
    var request = new XMLHttpRequest();
    var headerURL = "aaaa";
    //var sex_val = document.getElementById("")
    var sex_val = $("#sex").val();
    if (sex_val){
        sex_val = "sex_val=" + sex_val;
    }
    var language_val = $("#language").val();
    var region_val = $("#region").val();
    //var price_val = $("#price").val()
    var minage_val = $("#minage").val();
    var maxage_val = $("#maxage").val();
    var minprice_val = $("#minprice").val();
    var maxprice_val = $("#maxprice").val();
    var minrate_val = $("#minrate").val();
    var maxrate_val = $("#maxrate").val();

    var params = "?" + "sex=" + sex_val + "&language=" + language_val + "&region=" + region_val + "&minage=" + minage_val+ "&maxage=" + maxage_val + "&minprice=" + minprice_val + "&maxprice=" + maxprice_val + "&minrate=" + minrate_val + "&maxrate=" + maxrate_val;
    var requestURL = headerURL + params; 
    alert(requestURL);
    console.log(sex_val);

    $.getJSON(requestURL,function(json){
        teachersData = JSON.stringify(json);

        jsonteachersData = JSON.parse(weatherData);
        //weatherOfThisTime = jsonWeatherData.weather[0].main;

        //document.write("It is \"" + weatherOfThisTime + "\" in London now.");
        console.log(jsonteachersData);
    });
  };