//shotchart constants


  const searchButton = $('#player-search-button');
  const searchInput = $('#player-search-term');
  const results = $('#search-results');
  const termLabel = $('#search-term-label');
  const playerHeadshot = $('#player-headshot');
  const playerName = $('#player-name');
  const playerTeam = $('#player-team');
  const stepOne = $('#step-one');
  const stepTwo = $('#step-two');
  const stepThree = $('#step-three');
  const goback2 = $('#go-back-2');
  const goback3 = $('#go-back-3');
  const seasonSelector = $('#season-selector');
  const gameSelector = $('#game-selector');
  const gameSelectorRow = $('#game-selector-row');
  const gameFrameSelector = $('#game-frame-selector');
  const gameFrameSelectorRow = $('#game-frame-selector-row');
  const timeFrameSelector = $('#time-frame-selector');
  const themeSelector = $('#theme-selector');
  const makeChartButton = $('#make-chart');
  const chartResults = $('#chart-results');
  const chartLoading = $('#chart-loading');
  const chartError = $('#chart-error');
  const downloadLink = $('#download-link');
  const testApi = $('#test-api');


  let currentPlayer = '';
  let selectedGames = [];

  stepTwo.hide();
  stepThree.hide();
  termLabel.hide();
  results.hide();
  gameSelectorRow.hide();
  gameFrameSelectorRow.hide();
  downloadLink.hide();
