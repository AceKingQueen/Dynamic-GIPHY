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

// Function to make buttons for each actor
function renderButtons() {

// Delete the content inside the actors-view div prior to adding new actors
$("#actors-view").empty();

// Loop through the array of actors, then generate buttons for each actor in the array
actors.forEach(function(actor) {
  $("#actors-view").append(
    `<button class="gif" data-val=${actor}>${actor}</button>`
  )
})
}

// Function to add the new actor to the array and display
$("#add-actors").on("click", function(event) {

 //prevents submit button from trying to send a form, user can hit "enter" on keyboard or click with mouse
event.preventDefault();

// grab whatever text user types
var formValue = $('#actors-input').val().trim();

$('#actors-input').val("");

// add it to the array
if (!(actors.indexOf(formValue) > -1)) {
  actors.push(formValue);
}

// updated display of buttons
renderButtons();
});

// initial list of actor buttons
renderButtons();



//function to search for specific actors
var searchGIF = function(name) {

$("#gifs").empty();

var name = $(this).attr("data-val")

//queryURL for GIPHY API
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&rating=g&limit=10&api_key=IyEaDgyNgkp3IdZCuR9Slk9YEe5bPM98";

//communication with GIPHY servers to get gifs on the page
$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {


var results = response.data;

console.log(response.data);


//each gif is dynamically created as an html img tag and added to first part of page
response.data.forEach(function(giphy) {

//each gif still image is diplayed with it's nested rating  
$("#gifs").prepend(
  `
  <img src="${giphy.images.original.url}" />
  <img src="${giphy.images.fixed_height_still.url}" />
  <h3>Rating: ${giphy.rating}</h3>
  `
)
})
})

}

//when clicking on each button, gifs appear
$("#actors-view").on("click",".gif", searchGIF)

//When clicking on each gif, it plays. Clicking again pauses it.


