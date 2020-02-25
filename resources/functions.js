var settings = {
    baseURL: "https://sv443.net/jokeapi/v2",
    jokeEndpoint: "joke",
    anyCategoryName: "Any",
    defaultFormat: "json"
};

if(settings.baseURL.endsWith("/"))
{
    settings.baseURL = settings.baseURL.substr(0, (settings.baseURL.length - 1));
}

$(function() {

  $("#sendRequest").click(function(){
    var url = "";
    var queryParams = [];
    //categorias
    var selectedCategories = [settings.anyCategoryName];
    if ($("#cat-radio2").is(":checked")){
      selectedCategories = [];
      if ($("#cat-cb1").is(":checked")){
        selectedCategories.push("Programming");
      }
      if ($("#cat-cb2").is(":checked")) {
        selectedCategories.push("Miscellaneous");
      }
      if ($("#cat-cb3").is(":checked")) {
        selectedCategories.push("Dark");
      }
      if(selectedCategories.length == 0){
        selectedCategories.push(settings.anyCategoryName)
      }
    };
    //flags

    var flagNames = ["nsfw", "religious", "political", "racist", "sexist"];
    var selectedFlags = [];

    for (var i = 1; i < 6; i++){
      if ($("#blf-cb" + i).is(":checked")){
          selectedFlags.push(flagNames[i-1]);
      };
    };

    if (selectedFlags.length > 0) {
      queryParams.push("blacklistFlags=" + selectedFlags.join(","));
    }

    var singleJoke = $("#typ-cb1").is(":checked");
    var twopartJoke = $("#typ-cb2").is(":checked");
    if (singleJoke ^ twopartJoke == 1) {
      if (singleJoke){
        queryParams.push("type=single");
      }
      else if (twopartJoke) {
        queryParams.push("type=twopart");
      }
    };

    url = settings.baseURL + "/" + settings.jokeEndpoint + "/" + selectedCategories.join(",");

    if(queryParams.length > 0){
      url += "?" + queryParams.join("&");
    }
    $.ajax({
      method: "GET",
      url: url,
      beforesend: function(){
        console.log("Estoy por mandar el request");
      },
      success: function(respuesta){
        if (respuesta.type == "twopart"){
          $("#joke").text(respuesta.setup + " " + respuesta.delivery);
        }else if (respuesta.type == "single"){
          $("#joke").text(respuesta.joke);
        }
      },
      error: function(){
        console.log("no se ha podido obtener la info");
      }
    });
  });
});
