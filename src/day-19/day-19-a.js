const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test')
} else {
  input = require('./input')
}

const parseInput = (input) => {
  const scanners = input.replace(/---.*/g, '---').split('---')
  return scanners
    .map((scanner) =>
      scanner
        .split('\n')
        .filter((r) => r)
        .map((p) => p.split(',').map(Number))
    )
    .filter((r) => r.length)
  // console.log(scannerPoints, scannerPoints.length)
}

const scannerPoints = parseInput(input)

const signOrientations = [
  (p) => [p[0], p[1], p[2]],
  (p) => [p[0], p[1], -p[2]],
  (p) => [p[0], -p[1], p[2]],
  (p) => [p[0], -p[1], -p[2]],
  (p) => [-p[0], p[1], p[2]],
  (p) => [-p[0], p[1], -p[2]],
  (p) => [-p[0], -p[1], p[2]],
  (p) => [-p[0], -p[1], -p[2]],
]
const axisOrientations = [
  (p) => [p[0], p[1], p[2]],
  (p) => [p[0], p[2], p[1]],
  (p) => [p[1], p[0], p[2]],
  (p) => [p[1], p[2], p[0]],
  (p) => [p[2], p[0], p[1]],
  (p) => [p[2], p[1], p[0]],
]
const orientations = []
for (let i = 0; i < axisOrientations.length; i++) {
  for (let j = 0; j < signOrientations.length; j++) {
    const orientation = (p) => signOrientations[j](axisOrientations[i](p))
    orientation.toString = () => `(orientation axis ${i}, sign ${j})`
    orientations.push(orientation)
  }
}

const applyOrientationToPoints = (points, orientation) => {
  return points.map((p) => orientation(p))
}

const countMatchingPointsBetweenScanners = (
  s1Points,
  orientatedS2Points,
  s2Origin
) => {
  const matchedS2Points = new Set()
  for (const p1 of s1Points) {
    const relatedS2Point = [
      p1[0] - s2Origin[0],
      p1[1] - s2Origin[1],
      p1[2] - s2Origin[2],
    ]
    if (
      orientatedS2Points.find(
        (p) =>
          p[0] === relatedS2Point[0] &&
          p[1] === relatedS2Point[1] &&
          p[2] === relatedS2Point[2]
      )
    ) {
      matchedS2Points.add(relatedS2Point)
    }
  }
  return matchedS2Points.size
}

const mapCoordsToString = (p) => p.join(',')
const mapStringToCoords = (p) => p.split(',')

const mergePoints = (s1Points, orientatedS2Points, s2Origin) => {
  const s1Set = new Set(s1Points.map(mapCoordsToString))
  for (const p2 of orientatedS2Points) {
    const p2InS1Coordinates = [
      p2[0] + s2Origin[0],
      p2[1] + s2Origin[1],
      p2[2] + s2Origin[2],
    ]
    s1Set.add(mapCoordsToString(p2InS1Coordinates))
  }
  return [...s1Set].map(mapStringToCoords)
}

const comparePointsOfTwoScanners = (s1Points, s2Points) => {
  for (const orientation of orientations) {
    const orientatedS2Points = applyOrientationToPoints(s2Points, orientation)
    const visitedS2Origin = []
    for (const p1 of s1Points) {
      for (const p2 of orientatedS2Points) {
        const s2OriginX = p1[0] - p2[0]
        const s2OriginY = p1[1] - p2[1]
        const s2OriginZ = p1[2] - p2[2]
        if (
          visitedS2Origin.find(
            (o) =>
              o[0] === s2OriginX && o[1] === s2OriginY && o[2] === s2OriginZ
          )
        ) {
          continue
        }
        const s2Origin = [s2OriginX, s2OriginY, s2OriginZ]
        visitedS2Origin.push(s2Origin)
        const count = countMatchingPointsBetweenScanners(
          s1Points,
          orientatedS2Points,
          s2Origin
        )
        if (count >= 12) {
          console.log(s2Origin, orientation.toString(), count)
          return mergePoints(s1Points, orientatedS2Points, s2Origin)
        }
      }
    }
  }
  return null
}

let globalScannerPoints = scannerPoints[0]
const scannerIndexesToCompare = scannerPoints.map((_, i) => i).slice(1)
for (let i = 0; i < scannerIndexesToCompare.length; i++) {
  console.log(`Compare with scanner ${scannerIndexesToCompare[i]}`)
  const result = comparePointsOfTwoScanners(
    globalScannerPoints,
    scannerPoints[scannerIndexesToCompare[i]]
  )
  if (result) {
    globalScannerPoints = result
  } else {
    scannerIndexesToCompare.push(scannerIndexesToCompare[i])
  }
}

console.log(globalScannerPoints.length) // 467
