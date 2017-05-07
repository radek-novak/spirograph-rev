// @flow
import React, { Component } from 'react';
import {cloneDeep} from 'lodash'

type Props = {
  arms: Array<{radius: number, speed: number}>,
  onSubmit: () => mixed
};

class Controls extends Component<any, Props, any> {
  addField: () => mixed
  changeradius: (number, number) => void
  changespeed: (number, number) => void
  removeField: (number) => void

  constructor() {
    super();

    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
  }

  componentWillMount() {
    this.setState({arms : this.props.arms})
  }

  addField() {
    const { arms } = this.state
    this.setState({
      arms: [ ...this.state.arms, cloneDeep(arms.slice(-1)[0]) ]
    })
  }

  removeField(index: number) {
    const { arms } = this.state

    const newArms = cloneDeep(arms)
    newArms.splice(index, 1)

    this.setState({
      arms: newArms
    })
  }

  changeradius(fieldIndex: number, value: number) {
    const newArms = cloneDeep(this.state.arms)
    newArms[fieldIndex].radius = +value

    this.setState({
      arms: newArms
    })
  }
  changespeed(fieldIndex: number, value: number) {
    const newArms = cloneDeep(this.state.arms)
    newArms[fieldIndex].speed = +value

    this.setState({
      arms: newArms
    })
  }

  render () : * {
    const { arms } = this.state

    return (
      <div>
        <form onSubmit={
          e => {
            e.preventDefault()
            this.props.onSubmit(this.state)
          }
        }>
          {
            arms.map((arm, i) => (
              <div key={i}>
                <input
                  type="number"
                  placeholder="radius"
                  name={ `arm-radius-${i}` }
                  onChange={ evt => this.changeradius(i, evt.target.value) }
                  value={ this.state.arms[i].radius}
                />
                <input
                  type="number"
                  placeholder="speed"
                  name={ `arm-speed-${i}` }
                  onChange={ evt => this.changespeed(i, evt.target.value) }
                  value={ this.state.arms[i].speed}
                />
                <button type="button" onClick={() => this.removeField(i)}>remove</button>
              </div>
            ))
          }
          <button type="button" onClick={this.addField}>Add field</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Controls;
