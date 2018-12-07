$(document).ready( function() {

  const searchButton = $('#player-search-button');
  const searchInput = $('#player-search-term');
  const results = $('#search-results');
  const termLabel = $('#search-term-label');
  const playerHeadshot = $('#player-headshot');
  const playerName = $('#player-name');
  const playerTeam = $('#player-team');
  const stepOne = $('#step-one');
  const stepTwo = $('#step-two');
  const goback2 = $('#go-back-2');
  const seasonSelector = $('#season-selector');
  stepTwo.hide();
  termLabel.hide();
  results.hide();


  function clearSearch() {
    termLabel.empty();
    results.empty();
  }


  goback2.click(function() {
    goBack(stepTwo, stepOne);
  })

  results.on('click','.player-selector',function(){
    selectPlayer($(this).val(), $(this).text());
  });

  function displayResults(data, term) {
    parseData = JSON.parse(data);
    if (parseData.length > 0) {
      termLabel.text('Search results for "' + term + '":');
      termLabel.fadeIn();
      $.map(parseData, function(player, i) {
        results.append('<li class="player-selector" value=' + player.id + '>' + player.full_name + '</li>');
      })

      results.fadeIn();
    } else {
      termLabel.text('There are no results for "' + term + '"');
      termLabel.fadeIn();
    }
  }

  function getHeadshot( id ) {
    const baseURL = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/';
    const ext = '.png';
    let imageURL = baseURL + id + ext;
    return imageURL;
  }

  function selectPlayer(id, name) {
    getPlayerInfo(id);
    playerName.text(name);
    headshotURL = getHeadshot(id);
    playerHeadshot.attr('src', headshotURL );

    stepOne.hide();
    stepTwo.fadeIn();

  }

  function goBack(current, previous) {
    current.hide();
    previous.fadeIn();
  }

  searchInput.change(function() {
    clearSearch();
  })

  function convertSeasonID(id) {
    legend = ['Pre Season','Regular Season', 'All-Star', 'Playoffs',];

    year = id.slice(1);
    yearEnd = id.slice(3)
    year = year + '-' + (parseInt(yearEnd)+1);

    type = id.charAt(0);
    type = legend[parseInt(type) - 1 ];

    complete = {'year': year, 'type': type };
    return complete;
  }

  function makeSeasonSelector(array) {
    seasonSelector.empty();
    for (i = 0; i < array.length; i++ ) {
      let seasonID = array[i].SEASON_ID;
      let season = convertSeasonID(seasonID);
      seasonSelector.append('<option value=' + seasonID + '>' + season.year + ' ' + season.type);
    }
  }

  searchInput.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        searchButton.trigger( "click" );
    }
  });

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

  searchButton.click(function() {
    results.empty();
    results.hide();
    term = $('#player-search-term').val();
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
  })
})
