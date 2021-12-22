const useTestInput = false
let targetXRange
let targetYRange
if (useTestInput) {
  targetXRange = [20, 30]
  targetYRange = [-10, -5]
} else {
  targetXRange = [156, 202]
  targetYRange = [-110, -69]
}

const maxVelocityY = 0 - targetYRange[0] - 1
const maxHeight = (maxVelocityY * (maxVelocityY + 1)) / 2
console.log(maxHeight)
