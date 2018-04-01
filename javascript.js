 // Initial array of actors
 var actors = [
     "Gal Gadot", 
     "Lucy Liu",
     "Chadwick Boseman",
     "Meryl Streep", 
     "Tom Hanks", 
     "Lupita Nyong'o",
     "Will Smith",
     "Carrie Fisher",
     "Al Pacino",
     "Michael B. Jordan",
    ];

 // Function to make buttons for each actor
 function renderButtons() {

   // Delete the content inside the actors-view div prior to adding new actors
   $("#actors-view").empty();

   // Loop through the array of actors, then generate buttons for each actor in the array
   actors.forEach(function(actor) {
     $("#actors-view").append(
       `<button data-val=${actor}>${actor}</button>`
     )
   })
 }

 // Function to add the new actor to the array and display
 $("#add-actors").on("click", function(event) {
  
    //prevents submit button from trying to send a form, user can hit "enter" on keyboard or click with mouse
   event.preventDefault();

   // grab whatever text user types
   var formValue = $('#actors-input').val();

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

//queryURL for GIPHY API
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&rating=g&limit=10&api_key=IyEaDgyNgkp3IdZCuR9Slk9YEe5bPM98";

 //communication with GIPHY servers to get gifs on the page
 $.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

 console.log(response);

 //each gif is dynamically created as an html img tag and added to first part of page
 response.data.forEach(function(giphy) {
   $("#gifs").append(
     `<img src="${giphy.images.original.url}" />`
   )
 })
})

}



// chain for fixed images
// `<img src="${response.data["0"].images.fixed_height_still.url}" />`

//function to search for actors listed in actors array
$("#actors-view").on("click", function(e) {

var actorSearch = $("#actors-input")

//invoke search function
searchGIF(actorSearch);

})

