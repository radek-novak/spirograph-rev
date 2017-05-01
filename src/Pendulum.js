// @flow

import Victor from 'victor'
import { cloneDeep } from 'lodash'

type tVictor = {
  x: number,
  y: number,
  rotate: (number) => tVictor,
  add: (tVictor) => tVictor,
  clone: () => tVictor
}

export function buildPendulumPoints(radii: Array<number>): Array<tVictor> {
  const ret = [ new Victor(0, 0) ]

  for (let i = 0, len = radii.length; i < len; i++) {
    const cur = radii[i]
    ret.push(new Victor(0, -cur))
  }

  return ret
}

export function buildPendulum(pendulumPoints: Array<tVictor>, cx: tVictor = new Victor(0, 0)): Array<tVictor> {
  const newPoints = cloneDeep(pendulumPoints)

  newPoints[0].add(cx)

  for (let i = 1, len = newPoints.length; i < len; i++) {
    const cur = newPoints[i]
    const prev = newPoints[i - 1]

    cur.add(prev)
  }

  return newPoints
}

export function rotatePoints(pendulumPoints: Array<tVictor>, rotations: Array<number>): Array<tVictor> {
  return cloneDeep(pendulumPoints).map((pt, i) => pt.rotate(rotations[i]))
}


export function getScaledPoints(arms: Array<number>, canvasWidth: number): Array<number> {
  const length = arms.reduce((acc, cur) => acc + cur, 0)
  const maxPendulumLength = 0.9 * canvasWidth / 2
  const ratio = maxPendulumLength / length

  return arms.map( arm => arm * ratio)
}
