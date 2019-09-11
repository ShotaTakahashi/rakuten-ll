function searchTeacher(){
    var params_array = [];
    var params = "teachers/search/?";
    var request = new XMLHttpRequest();
    var headerURL = "http://127.0.0.1:5000/";
    var sex_val = "sex=" + $("#sex").val();
    var language_val = "language=" + $("#language").val();
    var region_val = "region=" + $("#region").val();
    var minage_val = "age_low=" + $("#age_low").val();
    var maxage_val = "age_high=" + $("#age_high").val();
    var minprice_val = "price_low=" + $("#price_low").val();
    var maxprice_val = "price_high=" + $("#price_high").val();
    var minrate_val = "rating_low=" + $("#rating_low").val();
    var maxrate_val = "rating_high=" + $("#rating_high").val();
    params_array.push(sex_val,language_val,region_val,minage_val,maxage_val,minprice_val,maxprice_val,minrate_val,maxrate_val)

    params_array.forEach(function(val,i){
        if (i == 0){
            params = params + val;
            return true;
        }
        params = params + "&" + val;
    });

    var requestURL = headerURL + params; 
    alert(requestURL);
    
    $.getJSON(requestURL,function(json){
        teachersData = JSON.stringify(json);
        jsonteachersData = JSON.parse(teachersData);
        console.log(teachersData);
        console.log(jsonteachersData);
        return teachersData;
    });
};