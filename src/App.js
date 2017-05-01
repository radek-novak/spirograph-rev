// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas'
import Controls from './Controls'

class App extends Component<void, void, any> {
  toggleArm: () => mixed

  constructor() {
    super()

    this.state = {
      showArms: false,
      arms: [
        { radius: 70, speed: 2 * Math.PI / 400 },
        { radius: 50, speed: 2 * Math.PI / 90 },
        { radius: 40, speed: 2 * Math.PI / 190 },
        { radius: 80, speed: 2 * Math.PI / 200 },
        { radius: 45, speed: 2 * Math.PI / 100 }
      ]
    }

    this.toggleArm = this.toggleArm.bind(this)
  }

  toggleArm() {
    this.setState({
      showArms: !this.state.showArms
    })
  }

  render() {
    return (
      <div className="App">

        <label>
          <input type="checkbox" value={this.state.showArms} onClick={this.toggleArm} />
          show pendulum arms
        </label>

        <Canvas
          showArms={this.state.showArms}
          arms={ this.state.arms }
        />

        <Controls arms={this.state.arms} />
      </div>
    );
  }
}

export default App;
