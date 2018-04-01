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