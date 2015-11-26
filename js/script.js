$(document).one('pageinit', function(){

  // Display runs
  showRuns();

  // Add Handler
  $('#submitAdd').on('tap', addRun);

  // Edit Handler
  $('#submitEdit').on('tap', editRun);

  // Set Current Handler
  $('#stats').on('tap', '#editLink', setCurrent);

  /*
  * Show all runs on homepage
  */
  function showRuns(){
      // get runs object
      var runs = getRunObjects();

      // Check if empty
      if(runs != '' && runs != null){
        for (var i =0; i <runs.length; i++){
          $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>'+runs[i]["date"]+ ' <br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">' + '<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#">Delete</a></li>');

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
  * Edit a run
  */
  function editRun(){
    // Get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunObjects();

    // Looop through runs
    for(var i = 0;i<runs.length; i++){
      if(runs[i].miles = currentMiles && runs[i].date == currentDate){
        runs.splice(i,1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));

    }


    // Get form values
    var miles = $('#editMiles').val();
    var date = $('#editDate').val();

    // Create 'update_run' object
    var update_run = {
      date:date,
      miles: parseFloat(miles)
    };



    // Add run to runs array
    runs.push(update_run);

    alert('Run Updated');

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

  /*
  * Set the current miles and date
  */
  function setCurrent(){
    // Set local storage items
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    // Insert form fields
    $('#editMiles').val(localStorage.getItem('currentMiles'));
    $('#editDate').val(localStorage.getItem('currentDate'));
}
})
