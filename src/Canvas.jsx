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
  arms: Array<{ speed: number, radius: number}>,
  showArms: bool
}


class Canvas extends Component<void, Props, any> {
  lines: Array<any>
  ctx: any
  cx: number
  cy: number
  canvas: HTMLCanvasElement
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

    this.setUpPendulum()

    this.raf = requestAnimationFrame(this.loop.bind(this))
  }

  componentWillMount() {
    this.setState({
      canvasSize: Math.min(window.innerWidth, window.innerHeight)
    })
  }

  componentWillReceiveProps(nextProps: {showArms: bool, arms: Array<any>}) {
    if (nextProps.showArms !== this.props.showArms && !nextProps.showArms) {
      cancelAnimationFrame(this.raf)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.drawVectors(this.lines)
      this.raf = requestAnimationFrame(this.loop.bind(this))
    }

    if (nextProps.arms !== this.props.arms) {
      cancelAnimationFrame(this.raf)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.setUpPendulum(nextProps.arms)
      this.drawVectors(this.lines)
      this.raf = requestAnimationFrame(this.loop.bind(this))
    }

  }

  setUpPendulum(arms : Array<any> = this.props.arms) {
    this.pendulumPoints = Pendulum.buildPendulumPoints(
      Pendulum.getScaledPoints(arms.map(arm => arm.radius),
      Math.min(this.canvas.width, this.canvas.height))
    )
    this.pendulum = Pendulum.buildPendulum(this.pendulumPoints)
    this.speeds = [0, ...arms.map(arm => arm.speed)]
    this.lines = []
  }

  line(v1: tVictor, v2: tVictor) {
    const { ctx } = this

    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.lineTo(v2.x, v2.y)
    ctx.stroke();
  }

  drawVectors(vectors) {
    const { ctx } = this

    ctx.beginPath();

    for ( let i = 1; i < vectors.length; i++ ) {
      const prev = vectors[i - 1]
      const cur = vectors[i]

      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(cur.x, cur.y)
    }

    ctx.stroke();
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
        width={this.state.canvasSize}
        height={this.state.canvasSize}
      ></canvas>
    );
  }
}

export default Canvas;
