// @flow

import Victor from 'victor'

type tVictor = {x: number, y: number}

export function buildPendulum(radii: Array<number>, cv: tVictor): Array<tVictor> {
  const ret = [ cv ]
  const scaledPoints = radii.map(pt => new Victor(0, ))

  for (let i = 1, len = radii.length; i < len; i++) {
    const prev = ret[i - 1]
    const cur = radii[i]
    ret.push((new Victor(0, -cur)).add(prev))
  }

  return ret
}

// buildPendulum(points: Array<tVictor>) {
//   for (let i = 1, len = points.length; i < len; i++) {
//     const cur = points[i]
//     const prev = points[i-1]
//
//     const vec = new Victor(radius, 0)
//     vec.rotate(angle)
//     vec.add(vector)
//   }
// }

// function getScaledPoints(arms: Array<number>, canvasWidth: number): Array<number> {
//   const length = arms.reduce((acc, cur) => acc + cur, 0)
//   const maxPendulumLength = 0.9 * canvasWidth / 2
//   const ratio = maxPendulumLength / length
//
//   return arms.map( arm => arm * ratio)
// }

// function * rotatePendulum(arms: Array<{point: tVictor, speed: number}>): Array<tVictor> {
//   while(true) {
//     for (let i = 1, len = arms.length; i < len; i++) {
//       const vec = new Victor(radius, 0)
//       vec.rotate(angle)
//       vec.add(vector)
//
//     }
//     yield []
//   }
// }
