$(document).ready(function(){

  $("#field").keypress(function(e) {
      if(e.which == 13) {
        //alert('You pressed enter!');
        $( ".displayResultItem" ).detach();
        $.ajax({
          url: 'https://en.wikipedia.org/w/api.php',
          data: { action: 'query', list: 'search', srsearch: $("#field").val(), format: 'json' },
          dataType: 'jsonp',
          success: processResult
          
        });     
      }

  });
});

function processResult(apiResult){
  if (apiResult.query.search.length == 0) {
        $('#display-result').hide().append('<div class="displayResultItem"><p>No results found</p></div>').fadeIn(500);
  } 
  else {
    $(".expSearchBox p").remove();
    for (var i = 0; i < apiResult.query.search.length; i++){
      $('#display-result').hide().append('<div class="displayResultItem"><p><a href="https://en.wikipedia.org/w/index.php?title='+apiResult.query.search[i].title+'" target="_blank">'+apiResult.query.search[i].title+'</a></p><p>'+apiResult.query.search[i].snippet+'</p></div>').fadeIn(500);
    }
  }

}


