// @flow

import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas'
import Controls from './Controls'

class App extends Component<void, void, any> {
  toggleArm: () => mixed
  controlsChange: ({arms: Array<any>}) => mixed
  pause: () => void

  constructor() {
    super()

    this.state = {
      showArms: false,
      arms: [
        { radius: 50, speed: 21 },
        { radius: 40, speed: 10 }
      ],
      playing: true
    }

    this.toggleArm = this.toggleArm.bind(this)
    this.controlsChange = this.controlsChange.bind(this)
    this.pause = this.pause.bind(this)
  }

  toggleArm() {
    this.setState({
      showArms: !this.state.showArms
    })
  }

  pause() {
    this.setState({
      playing: !this.state.playing
    })
  }

  controlsChange(data : { arms: Array<any>}) {
    this.setState({
      arms: data.arms
    })
  }

  render() {
    const { playing } = this.state

    return (
      <div className="App">

        <div>
          <label>
            <input type="checkbox" value={this.state.showArms} onClick={this.toggleArm} />
            show pendulum arms
          </label>
        </div>
        <button onClick={this.pause}>{ playing ? 'Pause' : 'Start'}</button>

        <Canvas
          showArms={this.state.showArms}
          arms={ this.state.arms }
          playing={ playing }
        />

        <Controls
          arms={this.state.arms}
          onSubmit={ this.controlsChange }
          playing={ playing }
        />
      </div>
    );
  }
}

export default App;
