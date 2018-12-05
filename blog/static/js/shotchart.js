'use strict';


class SearchPlayers extends React.Component {
  state = {
    query: '',
    results: []
  }

  searchPlayers() {
    let that = this
    $.ajax(
    {
        type:"GET",
        url: "/find-players",
        data:{
                 term: this.state.query,
        },
        success: function( data )
        {
          that.setState({results: JSON.parse(data)})
        },
        error: function( jqXHR, textStatus, errorThrown )
        {
          console.log(textStatus + ': ', errorThrown);
        }
     })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.searchPlayers()
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    return (
      <form className="chart_searchForm">
        <input
          placeholder="Search for a player..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          className="col-6"
        />
        <select
          className="col-6"
          onChange={this.props.updatePlayer}>
          <option>Select a player...</option>
          {
           this.state.results.map(function(player, i ){
             return (
               <option
                  key = {i}
                  value={player.id}>
                    {player.full_name}
                </option>)
           })
         }
        </select>
      </form>
    )
  }
}



class ChartMaker extends React.Component {
  constructor(props) {
    super(props);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.state = {
      hasPlayer: false,
      selectedPlayer: '',
      playerPreview: '/static/img/player_placeholder.jpg/',
      hasSeason: false,
      selectedSeason: '',
      hasTheme: false,
      selectedTheme: '',
      previewSrc: '/static/img/placeholder.jpg/',
      isLoading: false,

    };
  }

  getHeadshot( event ) {

    const baseURL = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/';
    const ext = '.png';
    let imageURL = baseURL + event.target.value + ext;

    console.log(imageURL, "URL");
    return imageURL;
  }

  updatePlayer ( event ) {
    console.log(event);
    let url = this.getHeadshot( event );
    let id = event.target.value
    this.setState({playerPreview: url, selectedPlayer: id })
  }
  createPreview (player, theme, date) {
    this.setState({loading: true });
    //ajax Request
    this.setState({loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <div className="chartMaker">
        <div className="col-sm-12 col-md-6 chartPreview">
          <img src={this.state.previewSrc} />
        </div>
        <div className="col-sm-12 col-md-6 chartFields">
          <div className="player_preview">
            <img src={this.state.playerPreview} />
          </div>
          <div className="row player_search">
            <SearchPlayers updatePlayer={this.updatePlayer}/>
          </div>
          <div className="row player_selections">

          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#react-container');
ReactDOM.render(<ChartMaker />, domContainer);
