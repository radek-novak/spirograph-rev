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
  ctx: any
  cx: number
  cy: number
  canvas: any
  vCenter: tVictor
  pendulumPoints: Array<tVictor>
  pendulum: Array<tVictor>
  speeds: Array<number>
  raf: any


  constructor() {
    super();

    this.state = {}
    this.lines = []
  }

  componentDidMount() {
    const { arms } = this.props

    this.ctx = this.canvas.getContext('2d')
    // this.ctx.translate(0.5, 0.5);

    this.cx = this.canvas.width / 2
    this.cy = this.canvas.height / 2
    this.vCenter = new Victor(this.canvas.width / 2, this.canvas.height / 2)

    this.pendulumPoints =Pendulum.buildPendulumPoints(
      Pendulum.getScaledPoints(arms.map(arm => arm.radius),
      Math.min(this.canvas.width, this.canvas.height))
    )
    this.pendulum = Pendulum.buildPendulum(this.pendulumPoints)
    this.speeds = [0, ...arms.map(arm => arm.speed)]

    this.raf = requestAnimationFrame(this.loop.bind(this))
  }

  line(v1: tVictor, v2: tVictor) {
    this.ctx.beginPath();
    this.ctx.moveTo(v1.x, v1.y);
    this.ctx.lineTo(v2.x, v2.y)
    this.ctx.stroke();
  }

  drawVectors(vectors) {
    this.ctx.beginPath();

    for ( let i = 1; i < vectors.length; i++ ) {
      const prev = vectors[i - 1]
      const cur = vectors[i]

      this.ctx.moveTo(prev.x, prev.y);
      this.ctx.lineTo(cur.x, cur.y)
    }

    this.ctx.stroke();
  }

  drawLastSegment() {
    this.line(this.lines.slice(-2)[0], this.lines.slice(-1)[0])
  }

  loop() {
    if (this.props.showArms)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.pendulumPoints = Pendulum.rotatePoints(this.pendulumPoints, this.speeds)
    this.pendulum = Pendulum.buildPendulum(this.pendulumPoints, this.vCenter)

    if (this.props.showArms)
      this.drawVectors(this.pendulum)

    this.lines.push(this.pendulum.slice(-1)[0])

    if (this.props.showArms)
      this.drawVectors(this.lines)
    else if (this.lines.length > 1)
      this.drawLastSegment()

    this.raf = requestAnimationFrame(this.loop.bind(this))
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
