// @flow

import React, { Component } from 'react';
import Victor from 'victor'

import * as Pendulum from './Pendulum'


type tVictor = {
  x: number,
  y: number,
  rotate: (number) => tVictor,
  add: (tVictor) => tVictor,
  clone: () => tVictor
}
type Props = {
  arms: Array<{ speed: number, radius: number}>
}

class Canvas extends Component<void, Props, any> {
  lines: Array<any>
  points: Array<tVictor>
  ctx: any
  cx: number
  cy: number
  canvas: any
  vCenter: tVictor
  pendulumPoints: Array<tVictor>
  pendulum: Array<tVictor>
  speeds: Array<number>


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

    this.pendulumPoints =Pendulum.buildPendulumPoints(
      Pendulum.getScaledPoints(arms.map(arm => arm.radius),
      Math.min(this.canvas.width, this.canvas.height))
    )
    this.pendulum = Pendulum.buildPendulum(this.pendulumPoints)
    this.speeds = [0, ...arms.map(arm => arm.speed)]

    requestAnimationFrame(this.loop.bind(this))
  }

  line(v1: tVictor, v2: tVictor) {
    this.ctx.beginPath();
    this.ctx.moveTo(v1.x, v1.y);
    this.ctx.lineTo(v2.x, v2.y)
    this.ctx.stroke();
  }

  drawPendulum() {
    this.ctx.beginPath();

    for ( let i = 1; i < this.pendulum.length; i++ ) {
      const prev = this.pendulum[i - 1]
      const cur = this.pendulum[i]

      this.ctx.moveTo(prev.x, prev.y);
      this.ctx.lineTo(cur.x, cur.y)
    }

    this.ctx.stroke();
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.pendulumPoints = Pendulum.rotatePoints(this.pendulumPoints, this.speeds)
    this.pendulum = Pendulum.buildPendulum(this.pendulumPoints, this.vCenter)
    this.drawPendulum()

    this.lines.push(this.pendulum.slice(-1)[0])
    for (let i = 1, len = this.lines.length; i < len; i++) {
      this.line(this.lines[i - 1], this.lines[i])
    }


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
