const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test')
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

const mapCoordsToString = (x, y, z) => x + ',' + y + ',' + z
const mapStringToCoords = (p) => p.split(',')

const cubes = {}

const executeCommands = (commands) => {
  for (const command of commands) {
    const cmd = command.cmd
    for (
      let x = Math.max(command.x.from, -50);
      x <= Math.min(command.x.to, 50);
      x++
    ) {
      for (
        let y = Math.max(command.y.from, -50);
        y <= Math.min(command.y.to, 50);
        y++
      ) {
        for (
          let z = Math.max(command.z.from, -50);
          z <= Math.min(command.z.to, 50);
          z++
        ) {
          // console.log(command, x, y, z)
          cubes[mapCoordsToString(x, y, z)] = cmd
        }
      }
    }
  }
}

executeCommands(commands)
console.log(Object.values(cubes).filter((v) => v === 'on').length)
