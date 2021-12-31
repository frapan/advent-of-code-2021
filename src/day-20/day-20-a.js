const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test')
} else {
  input = require('./input')
}

const parseInput = (input) => {
  const inputImage = input.inputImageString.split('\n').map((r) => r.split(''))
  return { algorithm: input.algorithm, inputImage }
}

let { algorithm, inputImage } = parseInput(input)

const iterations = 2

const calculateAlgorithmIndex = (centerX, centerY, image) => {
  let str = ''
  for (let y = centerY - 1; y <= centerY + 1; y++) {
    for (let x = centerX - 1; x <= centerX + 1; x++) {
      if (y < 0 || x < 0 || y >= image.length || x >= image[0].length) {
        str += '0'
      } else {
        str += image[y][x] === '#' ? '1' : '0'
      }
    }
  }
  return parseInt(str, 2)
}

const generateImage = (image) => {
  const newImage = []
  const extraLines = 5
  for (let y = -extraLines; y < image.length + extraLines; y++) {
    for (let x = -extraLines; x < image[0].length + extraLines; x++) {
      newImage[y + extraLines] = newImage[y + extraLines] || []
      newImage[y + extraLines][x + extraLines] =
        algorithm[calculateAlgorithmIndex(x, y, image)]
    }
  }
  return newImage
}

const printImage = (inputImage) => {
  inputImage.forEach((row) => {
    console.log(row.join(''))
  })
}

// console.log(calculateAlgorithmIndex(2, 2, inputImage))

for (let i = 0; i < iterations; i++) {
  inputImage = generateImage(inputImage)
}

// printImage(inputImage)

const reducedImage = inputImage
  .filter((row) => row.join('').match(/#+\.{2,}#+\.+#+/g))
  .map((row) => row.slice(6, row.length - 4))
printImage(reducedImage)

const countLights = (image) =>
  image.reduce((acc, row) => {
    return acc + row.reduce((acc2, char) => (char === '#' ? acc2 + 1 : acc2), 0)
  }, 0)

console.log(countLights(reducedImage)) // 5179
