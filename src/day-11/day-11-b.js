let input = [
  '1443582148',
  '6553734851',
  '1451741246',
  '8835218864',
  '1662317262',
  '1731656623',
  '1128178367',
  '5842351665',
  '6677326843',
  '7381433267',
]

// input = [
//   '5483143223',
//   '2745854711',
//   '5264556173',
//   '6141336146',
//   '6357385478',
//   '4167524645',
//   '2176841721',
//   '6882881134',
//   '4846848554',
//   '5283751526',
// ]

const matrix = input.map((row) => row.split('').map(Number))
let flashes = 0

const printMatrix = () => {
  console.log('Matrix')
  matrix.forEach((row) => {
    console.log(row.join(''))
  })
}

const flash = (rowIndex, charIndex) => {
  matrix[rowIndex][charIndex] = -1
  flashes++
  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let column = charIndex - 1; column <= charIndex + 1; column++) {
      if (
        row >= 0 &&
        row <= 9 &&
        column >= 0 &&
        column <= 9 &&
        matrix[row][column] >= 0 &&
        matrix[row][column] <= 9
      ) {
        matrix[row][column]++
        if (matrix[row][column] === 10) {
          flash(row, column)
        }
      }
    }
  }
}

for (let step = 0; step < 999; step++) {
  // Part 1: increase
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let charIndex = 0; charIndex < 10; charIndex++) {
      matrix[rowIndex][charIndex]++
    }
  }
  // Part 2: flash
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let charIndex = 0; charIndex < 10; charIndex++) {
      if (matrix[rowIndex][charIndex] === 10) {
        flash(rowIndex, charIndex)
      }
    }
  }
  // Part 3: reset flasehd
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let charIndex = 0; charIndex < 10; charIndex++) {
      if (matrix[rowIndex][charIndex] < 0 || matrix[rowIndex][charIndex] > 9) {
        matrix[rowIndex][charIndex] = 0
      }
    }
  }
  // Check synchronized flash
  const notSynced = matrix.find((row) => row.find((char) => char !== 0))
  if (!notSynced) {
    // printMatrix()
    console.log(step + 1)
    process.exit()
  }
}
