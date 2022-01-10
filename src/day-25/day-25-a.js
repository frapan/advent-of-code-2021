const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test')
} else {
  input = require('./input')
}

const matrix = input.split('\n').map((row) => row.split(''))

const printMatrix = () => {
  matrix.forEach((row) => {
    console.log(row.join(''))
  })
}

// printMatrix()

const width = matrix[0].length
const height = matrix.length
let someMovemenet = true
let cycle = 0
while (someMovemenet) {
  console.log('\ncycle x', ++cycle)
  someMovemenet = false
  for (let y = 0; y < height; y++) {
    let firstHasMoved = false
    for (let x = 0; x < width; x++) {
      const nextX = (x + 1) % width
      if (matrix[y][x] === '>' && matrix[y][nextX] === '.') {
        if (x < width - 1 || !firstHasMoved) {
          if (x === 0) {
            firstHasMoved = true
          }
          matrix[y][x] = '.'
          matrix[y][nextX] = '>'
          x++
          someMovemenet = true
        }
      }
    }
  }
  // printMatrix()
  // console.log('cycle y', cycle)
  for (let x = 0; x < width; x++) {
    let firstHasMoved = false
    for (let y = 0; y < height; y++) {
      const nextY = (y + 1) % height
      if (matrix[y][x] === 'v' && matrix[nextY][x] === '.') {
        if (y < height - 1 || !firstHasMoved) {
          if (y === 0) {
            firstHasMoved = true
          }
          matrix[y][x] = '.'
          matrix[nextY][x] = 'v'
          y++
          someMovemenet = true
        }
      }
    }
  }
  // if (cycle >= 57) {
  // printMatrix()
  // }
}

// printMatrix()
