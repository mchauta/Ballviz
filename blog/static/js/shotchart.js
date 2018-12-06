$(document).ready( function() {




  const searchButton = $('#player-search-button');
  const searchInput = $('#player-search-term');
  const results = $('#search-results');
  const termLabel = $('#search-term-label');
  termLabel.hide();
  results.hide();

  function clearSearch() {
    termLabel.empty();
    results.empty();
  }

  function displayResults(data, term) {
    parseData = JSON.parse(data);
    if (parseData.length > 0) {
      termLabel.text('Search results for "' + term + '":');
      termLabel.fadeIn();
      $.map(parseData, function(player, i) {
        results.append('<li value=' + player.id + '>' + player.full_name + '</li>');
      })
      results.fadeIn();
    } else {
      termLabel.text('There are no results for "' + term + '"');
      termLabel.fadeIn();
    }
  }

  searchInput.change(function() {
    clearSearch();
  })

  searchInput.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        searchButton.trigger( "click" );
    }
  });

  searchButton.click(function() {
    results.empty();
    results.hide();
    term = $('#player-search-term').val();
    console.log('term', term);
    $.ajax(
    {
        type:"GET",
        url: "/find-players/",
        data:{
                 term: term
        },
        success: function( data )
        {
          console.log(data);
          displayResults(data, term);

        },
        error: function(error) {
          console.log(error);
        }
     })
  })
})
