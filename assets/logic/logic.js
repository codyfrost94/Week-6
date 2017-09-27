// First I need to create an array with some seeded buttons
	//this will be added to every time the user enters text and submits it into the "search" input

var topics = ["Tyrion Lannister", "Jon Snow", "Arya Stark", "The Hound", "The Mountain", "Joffrey", "Cersei Lannister", "Grey Worm"]



function displayGIFS() {

		$("#gif-col").empty();

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response)

        	var results = response.data;

	          // Looping over every result item
	          for (var i = 0; i < results.length; i++) {

	            // Only taking action if the photo has an appropriate rating
	            // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
	              // Creating a div with the class "item"
	              var gifDiv = $("<div class='item' >");

	              // Storing the result item's rating
	              var rating = results[i].rating;

	              // Creating a paragraph tag with the result item's rating
	              var p = $("<p>").text("Rating: " + rating);

	              // Creating an image tag with a .gif class and different so I can add in pause functionality
	              var characterImage = $("<img class='gif' data-state='still'>");

	              // Giving the image tag an src attribute of a proprty pulled off the
	              // result item; also set the source to the still and include data values for both still and animated srcs
	              characterImage.attr({
	              	"src":results[i].images.fixed_height_still.url,
	              	"data-animate":results[i].images.fixed_height.url,
	              	"data-still":results[i].images.fixed_height_still.url
	              	// "data-state": "still"
	              });

	              // Appending the paragraph and personImage we created to the "gifDiv" div we created
	              gifDiv.append(p);
	              gifDiv.append(characterImage);

	              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
	              $("#gif-col").prepend(gifDiv);

	            // }
	          }

          renderButtons();
        });
      }

function renderButtons() {

        // Deleting the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-row").empty();

        // Looping through the array of characters
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each character in the array
          var newButton = $("<a>");
          // Adding a class of character to our button
          newButton.addClass("character btn btn-info");
          // Adding a data-attribute
          newButton.attr("data-name", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the button-row div
          $("#button-row").append(newButton);
        }
      }

renderButtons();



$("#add-button").on("click", function(event) {
        // event.preventDefault();
        // This line grabs the input from the textbox
        var character = $("#character-input").val().trim();

        // Should prevent repeat buttons
        if (topics.includes(character)!==true) {

	        // Adding movie from the textbox to our array
	        topics.push(character);

	        $("#character-input").val('');
	    }

	    else if (topics.includes(character)==true){
	    	$('#modal').modal('show')
	    }

        // Testing this functionality
        console.log(topics)

        // Calling renderButtons which handles the processing of our movie array
        // havent coded this yet
        renderButtons();
      });

$(document).on("click", ".character", displayGIFS);

$(document).on("click", ".gif", pauseUnpause);
	


function pauseUnpause() {

	console.log(this);
	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } 
        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    	}
    }
    