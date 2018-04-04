 // Initial array of actors
 var actors = [ 
  "Harry Potter",
  "Indiana Jones",
  "Meryl Streep", 
  "Brad Pitt", 
  "Lupita Nyong'o",
  "Katniss Everdeen",
  "Forrest Gump",
  "Denzel Washington",
  "Thelma & Louise",
 ];

// Function makes a button for each actor.
function renderButtons() {

// Delete the content inside the actors-view 'div' prior to adding new actors.
$("#actors-view").empty();

// Loop through the array of actors then generate buttons for each actor in the array.
actors.forEach(function(actor) {
  $("#actors-view").append(
    `<button class="gif" data-val=${actor}>${actor}</button>`
  )
})
}

// Function adds the new actor to the array before displaying it. 
$("#add-actors").on("click", function(event) {

 //Prevents the submit button from trying to send a form, instead the user can hit "enter" on keyboard or click with mouse 
event.preventDefault();

// Get the text the user types and...
var formValue = $('#actors-input').val().trim();

$('#actors-input').val("");

// ...add it to the array
if (!(actors.indexOf(formValue) > -1)) {
  actors.push(formValue);
}

// Updated display of buttons
renderButtons();
});

// Initial list of actor buttons
renderButtons();



//Function searches for specific actors.
var searchGIF = function(name) {

$("#gifs").empty();

var name = $(this).attr("data-val");

//queryURL for GIPHY API
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&rating=g&limit=10&api_key=IyEaDgyNgkp3IdZCuR9Slk9YEe5bPM98";

//Communicate with GIPHY servers to get gifs on the page.
$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {


console.log(response.data);


//Each gif is dynamically created as an html 'img' tag and added to first part of page.
response.data.forEach(function(giphy) {

//Each gif image is diplayed with its' nested rating, & given a data-still and a data-animate class.
$("#gifs").prepend(
  `
  <img class="dynamic"
  src="${giphy.images.fixed_height_still.url}"
  data-still="${giphy.images.fixed_height_still.url}"
  data-animate="${giphy.images.fixed_height.url}"
  data-state="still"
  <h3>Rating: ${giphy.rating}</h3>
  `
)

})
})

}

//Still gifs will play on click. A second click will pause the gif. 
$(document).on("click", ".dynamic", function() {

 let state = $(this).attr("data-state");

 if (state === "still") {
   $(this).attr("src", $(this).attr("data-animate"));
   $(this).attr("data-state", "animate");
 } else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
 }
  
  })

//different gifs will appear on the click of each button.
$("#actors-view").on("click",".gif", searchGIF)
