//shotchart main
//requires const.js, functions.js, ajax.js

$(document).ready( function() {


  goback2.click(function() {
    goBack(stepTwo, stepOne);
  })
  goback3.click(function() {
    goBack(stepThree, stepTwo);
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

  makeChartButton.click(function() {
    chartResults.attr('src', '');
    downloadLink.attr({href: 'none', download: 'none' });
    console.log(seasonSelector.val());
    season = convertSeasonID(seasonSelector.val());
    makeChart(currentPlayer, season.year, season.type, themeSelector.val() );

    stepTwo.hide();
    stepThree.fadeIn();
  })

  seasonSelector.change(function() {
    player = currentPlayer;
    season = convertSeasonID(this.value);
    if (this.value == '-') {
      return;
    } else {
      getGames(player, season.year, season.type);
    }

  })

  timeFrameSelector.change(function() {
    if (this.value == 'Single Game') {
      gameSelectorRow.fadeIn();
      gameFrameSelectorRow.fadeIn();
    } else {
      gameSelectorRow.hide();
      gameFrameSelectorRow.hide();
    }

  })
})
