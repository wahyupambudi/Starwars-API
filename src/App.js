import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../src/index.css"

function searchFor(term) {
  return function(x) {
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      species: [],
      term: ""
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler = event => {
    this.setState({
      term: event.target.value
    });
  };

  getSpecies = () => {
    axios
      .get("https://swapi.co/api/species/")
      .then(res => {
        this.setState({
          species: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSpecies();
  }

  render() {
    const { term, species } = this.state;
    if (this.state.species.length) {
      console.log("jumlah species = " + this.state.species.length);
    }
    return (
      <div>
        <h1>List Data Species Starwars</h1>
        <input placeholder="Pencarian..." onChange={this.searchHandler} />
        <table align="center">
          <thead>
            <th><h2>Nama</h2></th>
          </thead>
          <tbody>
            {species.filter(searchFor(term)).map((species, index) => (
              <div key={index}>
                <h3>{species.name}</h3>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
