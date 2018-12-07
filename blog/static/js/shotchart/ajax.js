//shotchart ajax functions

function getPlayerInfo (id) {
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

function getGames(id, season, seasonType) {
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

        console.log(JSON.parse(data));
      },
      error: function(error) {
        console.log(error);
      }
   })
}
