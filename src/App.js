// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas'
import Controls from './Controls'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Canvas arms={
          [
            { radius: 70, speed: 2 * Math.PI / 400 },
            { radius: 50, speed: 2 * Math.PI / 90 },
            { radius: 40, speed: 2 * Math.PI / 190 },
            { radius: 80, speed: 2 * Math.PI / 200 },
            { radius: 45, speed: 2 * Math.PI / 100 }
          ]
        }/>
        <Controls arms={[12, 23, 41, 123, 34]} />
      </div>
    );
  }
}

export default App;
