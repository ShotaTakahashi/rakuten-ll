function searchTeacher(){
    //alert('hello');
    console.log("hello");
    params_array = [];
    var request = new XMLHttpRequest();
    var headerURL = "http://127.0.0.1:5000/teachers/search/";
    var sex_val = "sex=" + $("#sex").val();
    var language_val = "language=" + $("#language").val();
    var region_val = "region=" + $("#region").val();
    params_array.push(sex_val,language_val,region_val)

    add_params($("#minage").val(),"minage");
    add_params($("#maxage").val(),"maxage");
    add_params($("#minprice").val(),"minprice");
    add_params($("#maxprice").val(),"maxprice");
    add_params($("#minrate").val(),"minrate");
    add_params($("#maxrate").val(),"maxrate");
    
    //if ($("#minage").val() != ''){
        //var minage_val = "minage=" + $("#minage").val();
        //params_array.push(minage_val);
    //}

    //if ($("#maxage").val() != ''){
        //var maxage_val = "maxage_val=" + $("#maxage").val();
        //params_array.push(maxage_val);
    //}
    
    //if($("#minprice").val() != ''){
        //var minprice_val = "minprice=" + $("#minprice").val();
        //params_array.push(minprice_val);
    //}
    
    //if($("#maxprice").val() != ''){
        //var maxprice_val = "maxprice=" + $("#maxprice").val();
        //params_array.push(maxprice_val);
    //}
    
    //if($("#minrate").val() != ''){
        //var minrate_val = "minrate=" + $("#minrate").val();
        //params_array.push(minrate_val);
    //}
    
    //if($("#maxrate").val() != ''){
        //add_params($("maxrate").val,"maxrate",params_array);
        //var maxrate_val = "maxrate=" + $("#maxrate").val();
        //params_array.push(maxrate_val);
    //}
    var params = "?";
    params_array.forEach(function(val,i){
        //console.log(val);
        //console.log(i);
        if (i == 0){
            params = params + val;
            return true;
        }
        params = params + "&" + val;
    });


    function add_params (val,name){
        if(val != ''){
            console.log(val);
            var a = name + "=" + val;
            console.log(a);
            params_array.push(a);
        }
    }
    //var params = "?" + "sex=" + sex_val + "&language=" + language_val + "&region=" + region_val + "&minage=" + minage_val+ "&maxage=" + maxage_val + "&minprice=" + minprice_val + "&maxprice=" + maxprice_val + "&minrate=" + minrate_val + "&maxrate=" + maxrate_val;
    var requestURL = headerURL + params; 
    alert(requestURL);
    console.log(sex_val);
    //console.log(minage_val);

    $.getJSON(requestURL,function(json){
        teachersData = JSON.stringify(json);

        jsonteachersData = JSON.parse(weatherData);
        //weatherOfThisTime = jsonWeatherData.weather[0].main;

        //document.write("It is \"" + weatherOfThisTime + "\" in London now.");
        console.log(jsonteachersData);
    });
  };