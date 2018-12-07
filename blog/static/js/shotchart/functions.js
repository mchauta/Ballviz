//shotchart functions

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
  currentPlayer = id;

  stepOne.hide();
  stepTwo.fadeIn();

}

function goBack(current, previous) {
  current.hide();
  previous.fadeIn();
  clearSearch();
}

function makeSeasonSelector(array) {
  seasonSelector.empty();
  for (i = 0; i < array.length; i++ ) {
    let seasonID = array[i].SEASON_ID;
    let season = convertSeasonID(seasonID);
    seasonSelector.append('<option value=' + seasonID + '>' + season.year + ' ' + season.type);
  }
}

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
