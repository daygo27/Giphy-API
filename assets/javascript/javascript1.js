$( document ).ready(function() {
    var randomTopics = ["Japan", "Ghostbusters", "swiggityswooty", "Dota", "Beetlejuice", "Mario Party"];

    function renderButtons() {

        $("#gifAppearance").empty();
        for (var i=0; i < randomTopics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("btn btn-success");
            gifButton.addClass("random");
            gifButton.attr("data-name", randomTopics[i]);
            gifButton.text(randomTopics[i]);
            $("#gifAppearance").append(gifButton);
           


        }

    }
     function searchButton(){
         $("#add-gif").on("click", function(){
            event.preventDefault();
            var topic = $("#topic-input").val().trim()
            
         randomTopics.push(topic);
         renderButtons();
     });

     }
    function displayGifs(){
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); // displays the url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifViewBoard").empty(); 
        var results = response.data; //shows results of gifs
        
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
        
            $("#gifViewBoard").prepend(gifDiv);
        }
    });
}
    renderButtons();
    searchButton();
 $(document).on("click", ".random", displayGifs);
 $(document).on("click", ".image", function(){
     var state = $(this).attr('data-state');
     if ( state == 'still'){
         $(this).attr('src', $(this).data('animate'));
         $(this).attr('data-state', 'animate');
     }else{
         $(this).attr('src', $(this).data('still'));
         $(this).attr('data-state', 'still');
     }
 });
});
