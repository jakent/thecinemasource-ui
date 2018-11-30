import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('/api/posts/')
      .then((response) => {
        this.setState({posts: response.data.results})
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          You have {this.state.posts.length}
        </header>
      </div>
    );
  }
}

export default App;
