// @flow

import React, { Component } from 'react';
import Victor from 'victor'

import * as Pendulum from './Pendulum'


type tVictor = {x: number, y: number}
type Props = {
  arms: Array<{ speed: number, radius: number}>
}

class Canvas extends Component<void, Props, any> {
  lines: Array<any>
  points: Array<tVictor>
  ctx: any
  tick: number
  cx: number
  cy: number
  canvas: any
  vCenter: tVictor


  constructor() {
    super();

    this.state = {}
    this.lines = []
    this.points = []
  }

  componentDidMount() {
    const { arms } = this.props

    this.ctx = this.canvas.getContext('2d')
    this.cx = this.canvas.width / 2
    this.cy = this.canvas.height / 2
    this.vCenter = new Victor(this.canvas.width / 2, this.canvas.height / 2)

    this.tick = 0


    this.pendulum = Pendulum.buildPendulum(arms.map(arm => arm.radius), this.vCenter)

    requestAnimationFrame(this.loop.bind(this))
  }



  line(v1: tVictor, v2: tVictor) {
    this.ctx.beginPath();
    this.ctx.moveTo(v1.x, v1.y);
    this.ctx.lineTo(v2.x, v2.y)
    this.ctx.stroke();
  }

  hand(radius: number, angle: number, vector: tVictor = this.vCenter) {
    const vec = new Victor(0, -radius)
    vec.rotate(angle)
    vec.add(vector)

    this.line(
      vector,
      vec
    )

    return vec
  }

  loop() {
    const { arms } = this.props;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.tick++


    for ( let i = 0; i < arms.length; i++ ) {
      const cur = arms[i]
      const v = this.hand(70, this.tick * (2 * Math.PI) / 400)
    }

    const v = this.hand(arms[0].radius, this.tick * arms[0].speed)
    const v2 = this.hand(50, this.tick * (2 * Math.PI) / 90, v)
    const v3 = this.hand(80, this.tick * (2 * Math.PI) / 200, v2)
    const v4 = this.hand(50, this.tick * (2 * Math.PI) / 100, v3)

    for (let i = 1; i < this.lines.length; i++) {
      this.line(this.lines[i - 1], this.lines[i])
    }

    this.lines.push(v4)

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
