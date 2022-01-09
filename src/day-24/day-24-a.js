const input = require('./input')

const getValues = (input) => {
  const singleDigitAlgorithms = input.split('add z y\n')
  return singleDigitAlgorithms.reduce((acc, singleDigitAlgorithm) => {
    const [x, y] = singleDigitAlgorithm
      .split('\n')
      .map((instruction) => instruction.slice(instruction.lastIndexOf(' ') + 1))
      .filter((_, i) => i === 5 || i === 15)
      .map(Number)
    return acc.concat({ x, y })
  }, [])
}

const values = getValues(input)

const code = []
code[4] = Math.min(9, 9 + values[3].y + values[4].x)
code[6] = Math.min(9, 9 + values[5].y + values[6].x)
code[8] = Math.min(9, 9 + values[7].y + values[8].x)
code[9] = Math.min(9, 9 + values[7].y + values[9].x)
code[10] = Math.min(9, 9 + values[7].y + values[10].x)
code[11] = Math.min(9, 9 + values[7].y + values[11].x)
code[13] = Math.min(9, 9 + values[12].y + values[13].x)
code[12] = code[13] - values[13].x - values[12].y
code[7] = code[8] - values[8].x - values[7].y
code[5] = code[6] - values[6].x - values[5].y
code[3] = code[4] - values[4].x - values[3].y
code[2] = code[9] - values[9].x - values[2].y
code[1] = code[10] - values[10].x - values[1].y
code[0] = code[11] - values[11].x - values[0].y
console.log(code.join(''))
