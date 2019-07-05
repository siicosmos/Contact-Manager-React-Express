import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  useAPI() {
    var APIPort = '';
    if (process.env.NODE_ENV === 'development') {
      APIPort = '9000';
    } else if (process.env.NODE_ENV === 'production'){
      APIPort = '8000';
    } else {
      APIPort = '8080';
    }
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
        <img src={logo} className="App-logo" alt="logo" />
        <h1>contant manager</h1>
      </header>
      <p>{this.state.apiResponse}</p>
    </div>
    );
  }
}

export default App;
