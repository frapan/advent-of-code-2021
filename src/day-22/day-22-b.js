const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test-b')
} else {
  input = require('./input')
}

const parseInput = (input) => {
  return input.split('\n').map((row) => {
    const [cmd, cuboid] = row.split(' ')
    const [cuboidX, cuboidY, cuboidZ] = cuboid.split(',')
    const [fromX, toX] = cuboidX.slice(2).split('..')
    const [fromY, toY] = cuboidY.slice(2).split('..')
    const [fromZ, toZ] = cuboidZ.slice(2).split('..')
    return {
      cmd,
      x: { from: Math.min(fromX, toX), to: Math.max(fromX, toX) },
      y: { from: Math.min(fromY, toY), to: Math.max(fromY, toY) },
      z: { from: Math.min(fromZ, toZ), to: Math.max(fromZ, toZ) },
    }
  })
}

const commands = parseInput(input)

const activeCuboids = []

const splitCurrentCuboid = (currentCuboid, newCuboid) => {
  if (
    !(
      newCuboid.x.to >= currentCuboid.x.from &&
      currentCuboid.x.to >= newCuboid.x.from &&
      newCuboid.y.to >= currentCuboid.y.from &&
      currentCuboid.y.to >= newCuboid.y.from &&
      newCuboid.z.to >= currentCuboid.z.from &&
      currentCuboid.z.to >= newCuboid.z.from
    )
  ) {
    return [currentCuboid]
  }
  const overlappedCuboid = {
    x: {
      from: Math.max(currentCuboid.x.from, newCuboid.x.from),
      to: Math.min(currentCuboid.x.to, newCuboid.x.to),
    },
    y: {
      from: Math.max(currentCuboid.y.from, newCuboid.y.from),
      to: Math.min(currentCuboid.y.to, newCuboid.y.to),
    },
    z: {
      from: Math.max(currentCuboid.z.from, newCuboid.z.from),
      to: Math.min(currentCuboid.z.to, newCuboid.z.to),
    },
  }
  const splittedCuboids = []
  const xSegmentsToKeep = [overlappedCuboid.x]
  if (currentCuboid.x.from < overlappedCuboid.x.from) {
    xSegmentsToKeep.push({
      from: currentCuboid.x.from,
      to: overlappedCuboid.x.from - 1,
    })
  }
  if (currentCuboid.x.to > overlappedCuboid.x.to) {
    xSegmentsToKeep.push({
      from: overlappedCuboid.x.to + 1,
      to: currentCuboid.x.to,
    })
  }
  const ySegmentsToKeep = [overlappedCuboid.y]
  if (currentCuboid.y.from < overlappedCuboid.y.from) {
    ySegmentsToKeep.push({
      from: currentCuboid.y.from,
      to: overlappedCuboid.y.from - 1,
    })
  }
  if (currentCuboid.y.to > overlappedCuboid.y.to) {
    ySegmentsToKeep.push({
      from: overlappedCuboid.y.to + 1,
      to: currentCuboid.y.to,
    })
  }
  const zSegmentsToKeep = [overlappedCuboid.z]
  if (currentCuboid.z.from < overlappedCuboid.z.from) {
    zSegmentsToKeep.push({
      from: currentCuboid.z.from,
      to: overlappedCuboid.z.from - 1,
    })
  }
  if (currentCuboid.z.to > overlappedCuboid.z.to) {
    zSegmentsToKeep.push({
      from: overlappedCuboid.z.to + 1,
      to: currentCuboid.z.to,
    })
  }
  for (let xIndex = 0; xIndex < xSegmentsToKeep.length; xIndex++) {
    for (let yIndex = 0; yIndex < ySegmentsToKeep.length; yIndex++) {
      for (let zIndex = 0; zIndex < zSegmentsToKeep.length; zIndex++) {
        if (xIndex === 0 && yIndex === 0 && zIndex === 0) {
          continue
        }
        splittedCuboids.push({
          x: {
            from: xSegmentsToKeep[xIndex].from,
            to: xSegmentsToKeep[xIndex].to,
          },
          y: {
            from: ySegmentsToKeep[yIndex].from,
            to: ySegmentsToKeep[yIndex].to,
          },
          z: {
            from: zSegmentsToKeep[zIndex].from,
            to: zSegmentsToKeep[zIndex].to,
          },
        })
      }
    }
  }
  return splittedCuboids
}

// console.log(
//   splitCurrentCuboid(
//     { x: { from: 1, to: 3 }, y: { from: 1, to: 3 }, z: { from: 1, to: 3 } },
//     { x: { from: 1, to: 1 }, y: { from: 1, to: 1 }, z: { from: 1, to: 1 } }
//   )
// )

const executeCommands = (commands) => {
  // let i = 0
  for (const command of commands) {
    // console.log(++i)
    const cmd = command.cmd
    const newCuboid = { ...command }
    delete newCuboid.cmd
    for (let j = 0; j < activeCuboids.length; j++) {
      const splittedCuboids = splitCurrentCuboid(activeCuboids[j], newCuboid)
      activeCuboids.splice(j, 1, ...splittedCuboids)
      j = j + splittedCuboids.length - 1
    }
    if (cmd === 'on') {
      activeCuboids.push(newCuboid)
    }
  }
}

executeCommands(commands)

const countActiveCubes = () => {
  return activeCuboids.reduce((acc, cuboid) => {
    return (
      acc +
      (cuboid.x.to - cuboid.x.from + 1) *
        (cuboid.y.to - cuboid.y.from + 1) *
        (cuboid.z.to - cuboid.z.from + 1)
    )
  }, 0)
}

// console.log('activeCuboids', activeCuboids)
console.log('count', countActiveCubes())
