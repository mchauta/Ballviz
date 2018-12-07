$(document).ready( function() {




  const searchButton = $('#player-search-button');
  const searchInput = $('#player-search-term');
  const results = $('#search-results');
  const termLabel = $('#search-term-label');
  const playerHeadshot = $('#player-headshot');
  const stepOne = $('#step-one');
  const stepTwo = $('#step-two');
  stepTwo.hide();
  termLabel.hide();
  results.hide();

  function clearSearch() {
    termLabel.empty();
    results.empty();
  }

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
    headshotURL = getHeadshot(id);
    playerHeadshot.attr('src', headshotURL );
    stepOne.hide();
    stepTwo.fadeIn();

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

  function getPlayerInfo (id) {
    $.ajax(
    {
        type:"GET",
        url: "/player-info/",
        data:{
                 id: id
        },
        success: function( data )
        {
          console.log(data);

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
