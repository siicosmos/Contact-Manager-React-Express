import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  useAPI() {
    var APIPort = '8000';
    fetch('http://localhost:' + APIPort + '/')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res}))
      .catch(err => err);
  }

  componentDidMount() {
    this.useAPI();
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>contant manager</h1>
      </header>
      <p>{this.state.apiResponse}</p>
    </div>
    );
  }
}

export default App;
