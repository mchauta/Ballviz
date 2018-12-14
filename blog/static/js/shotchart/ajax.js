//shotchart ajax functions

function getPlayerInfo (id) {
  console.log("crash");
  $.ajax(
  {
      type:"GET",
      url: "/player-info/",
      data:{
               id: id
      },
      success: function( data ) {
        playerInfo = JSON.parse(data);
        console.log(playerInfo);
        playerTeam.text(playerInfo.CommonPlayerInfo[0].TEAM_ABBREVIATION);
        makeSeasonSelector(playerInfo.AvailableSeasons);

      },
      error: function(error) {
        console.log(error);
      }
   })
}

function findPlayers(term) {
  console.log('findPLayers');
  $.ajax(
  {
      type:"GET",
      url: "/find-players/",
      data:{
               term: term
      },
      success: function( data )  {
        console.log(data);
        displayResults(data, term);
      },
      error: function(error) {
        console.log(error);
      }
   })
}

function testAPI(id) {
  console.log("crash");
  $.ajax(
  {
      type:"GET",
      url: "/test-api/",
      data:{
               id: id
      },
      success: function( data )  {
        console.log(data);

      },
      error: function(error) {
        console.log(error);
      }
   })
}

function getGames(id, season, seasonType) {
  console.log('getGames');
  $.ajax(
  {
      type:"GET",
      url: "/get-games/",
      data:{
               id: id,
               season: season,
               seasonType: seasonType,
      },
      success: function( data )  {
        selectedGames = JSON.parse(data).PlayerGameLog;
        makeGameSelector(selectedGames);
        console.log(selectedGames);
        //return JSON.parse(selectedGames);

      },
      error: function(error) {
        console.log(error);
      }
   })
}

function makeChart(playerID, season, seasonType, theme) {
  downloadLink.hide();
  chartLoading.fadeIn();
  console.log(playerID, season, seasonType);
  $.ajax(
  {
      type:"GET",
      url: "/make-chart/",
      data:{
               playerID: playerID,
               season: season,
               seasonType: seasonType,
               theme: theme,
      },
      success: function( data )  {

        data = JSON.parse(data);
        console.log(data);

        if (data.dataFound) {
          chartResults.attr('src', 'data:image/png;base64, ' + data.imageData);
          downloadLink.attr({href: 'data:image/png;base64, ' + data.imageData, download: 'ShotChart_' + playerID + '_' + season });
          downloadLink.fadeIn();
          chartLoading.hide();
        } else {
          chartLoading.hide();
          chartError.text('No data found. Try again.');
          chartError.fadeIn()
        }
        //return JSON.parse(selectedGames);

      },
      error: function(error) {
        chartLoading.hide();
        chartError.text(error.statusText);
        chartError.fadeIn()
        console.log(error);
      }
   })
}
