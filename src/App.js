// @flow

import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas'
import Controls from './Controls'

class App extends Component<void, void, any> {
  toggleArm: () => mixed
  controlsChange: ({arms: Array<any>}) => mixed

  constructor() {
    super()

    this.state = {
      showArms: false,
      arms: [
        { radius: 50, speed: 21 },
        { radius: 40, speed: 10 }
      ]
    }

    this.toggleArm = this.toggleArm.bind(this)
    this.controlsChange = this.controlsChange.bind(this)
  }

  toggleArm() {
    this.setState({
      showArms: !this.state.showArms
    })
  }

  controlsChange(data : { arms: Array<any>}) {
    console.log(data);
    this.setState({
      arms: data.arms
    })
  }

  render() {
    return (
      <div className="App">

        <div>
          <label>
            <input type="checkbox" value={this.state.showArms} onClick={this.toggleArm} />
            show pendulum arms
          </label>
        </div>

        <Canvas
          showArms={this.state.showArms}
          arms={ this.state.arms }
        />

        <Controls
          arms={this.state.arms}
          onSubmit={ this.controlsChange }
        />
      </div>
    );
  }
}

export default App;
