'use strict';

const Suggestions = (props) => {
  const options = props.results.map( player => (
    <option value ="{player.id}"key={player.id}>
      {player.full_name}
    </option>
  ))
  return (<select><option>Select a player...</option>{options}</select>)
  //<option value="none">Select a player...</option>
}

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
      <form>
        <input
          placeholder="Search for a player..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <label>Results:</label>
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}


class PreviewImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render () {
    return (
      <img src="" />
    );
  }
}


class ChartMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlayer: '',
      selectedDate: '',
      selectedTheme: '',
      preview: '',
      isLoading: false,

    };
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
        <div className="col-sm-12 col-md-6">
          <PreviewImage />
        </div>
        <div className="col-sm-12 col-md-6">
          <SearchPlayers />
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#react-container');
ReactDOM.render(<ChartMaker />, domContainer);
