import React, { Component, PropTypes } from 'react';
import Victor from 'victor'
window.Victor = Victor
class Canvas extends Component {

  static propTypes = {

  }

  constructor() {
    super();

    this.state = {}
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.cx = this.canvas.width / 2
    this.cy = this.canvas.height / 2
    this.vCenter = new Victor(this.canvas.width / 2, this.canvas.height / 2)

    this.tick = 0

    requestAnimationFrame(this.loop.bind(this))
  }

  line(v1, v2) {
    this.ctx.beginPath();
    this.ctx.moveTo(v1.x, v1.y);
    this.ctx.lineTo(v2.x, v2.y)
    this.ctx.stroke();
  }

  hand(radius, angle, vector = this.vCenter) {
    const vec = new Victor(radius, 0)
    vec.rotate(angle)
    vec.add(vector)

    this.line(
      vector,
      vec
    )

    return vec
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.tick++


    const v = this.hand(100, this.tick * (2 * Math.PI) / 400)
    const v2 = this.hand(50, this.tick * (2 * Math.PI) / 90, v)
    const v3 = this.hand(80, this.tick * (2 * Math.PI) / 200, v2)

    requestAnimationFrame(this.loop.bind(this))
  }


  render () {
    return (
      <canvas
        ref={ canvas => this.canvas = canvas }
        width="500"
        height="500"
      ></canvas>
    );
  }
}

export default Canvas;
