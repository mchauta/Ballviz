$(document).ready( function() {

  const searchButton = $('#player-search-button');
  const searchInput = $('#player-search-term');
  const results = $('#search-results');
  results.hide();

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
          $.map(JSON.parse(data), function(player, i) {
          results.append('<li value=' + player.id + '>' + player.full_name + '</li>');
        })
          results.fadeIn();

        },
        error: function(error) {
          console.log(error);
        }
     })
  })
})
