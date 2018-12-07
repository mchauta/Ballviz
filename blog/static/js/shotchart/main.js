//shotchart main
//requires const.js, functions.js, ajax.js

$(document).ready( function() {

  stepTwo.hide();
  termLabel.hide();
  results.hide();


  goback2.click(function() {
    goBack(stepTwo, stepOne);
  })

  results.on('click','.player-selector',function(){
    selectPlayer($(this).val(), $(this).text());
  });

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
    findPlayers(term);
  })

  seasonSelector.change(function() {
    player = currentPlayer;
    season = convertSeasonID(this.value);
    getGames(player, season.year, season.type);
  })
})
