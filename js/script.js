$(document).one('pageinit', function(){

  // Display runs
  showRuns();

  // Add Handler
  $('#submitAdd').on('tap', addRun);

  /*
  * Show all runs on homepage
  */
  function showRuns(){
      // get runs object
      var runs = getRunObjects();

      // Check if empty
      if(runs != '' && runs != null){
        for (var i =0; i <runs.length; i++){
          $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>'+runs[i]["date"]+ ' <br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">' + '<a href="#edit">Edit</a> | <a href="#">Delete</a></li>');

        }
        $('#home').bind('pageinit', function() {
          $('#stats').listview('refresh');
        })
      }

  }



  /*
  * Add a run
  */
  function addRun(){
    // Get form values
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();

    // Create 'run' object
    var run = {
      date:date,
      miles: parseFloat(miles)
    };

    var runs = getRunObjects();

    // Add run to runs array
    runs.push(run);

    alert('Run Added');

    // Set stringified object to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect
    window.location.href="index.html"

    return false; //to make sure the form actual does not submit

  }

  /*
  * Get the runs object
  */
  function getRunObjects(){
    //  Set runs array
    var runs = new Array();
    // Get current runs form localStorage
    var currentRuns = localStorage.getItem('runs');

    // Check localStorage
    if(currentRuns != null){
      // Set to runs
      var runs = JSON.parse(currentRuns);
    }

    // Return runs object
    return runs.sort(function(a,b){return new Date(b.date) - new Date(a.date)});
  }

})
