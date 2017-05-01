// @flow
import React, { Component } from 'react';

type Props = {
  arms: Array<{radius: number, speed: number}>,
  onSubmit: () => mixed
};

class Controls extends Component<any, Props, any> {
  addField: () => mixed

  constructor() {
    super();

    this.addField = this.addField.bind(this)
  }

  componentWillMount() {
    this.setState({arms : this.props.arms})
  }

  addField() {
    this.setState({
      arms: [ ...this.state.arms, 10]
    })
  }

  render () : * {
    const { arms } = this.state

    return (
      <div>
        <form>

          {
            arms.map((arm, i) => (
              <div key={i}>
                <input type="number" placeholder="radius" name={ `arm-radius-${i}` } />
                <input type="number" placeholder="speed" name={ `arm-speed-${i}` } />
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
