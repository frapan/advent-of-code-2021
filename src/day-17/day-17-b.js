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

const matches = (velocityX, velocityY) => {
  let x = velocityX
  let y = velocityY
  while (true) {
    if (
      x >= targetXRange[0] &&
      x <= targetXRange[1] &&
      y >= targetYRange[0] &&
      y <= targetYRange[1]
    ) {
      return true
    }
    if (x > targetXRange[1] || y < targetYRange[0]) {
      return false
    }
    velocityX = velocityX === 0 ? 0 : velocityX - 1
    velocityY = velocityY - 1
    x += velocityX
    y += velocityY
  }
}

const results = new Set()
for (let y = targetYRange[0]; y < 0 - targetYRange[0]; y++) {
  for (
    let x = Math.floor(Math.sqrt(targetXRange[0]));
    x <= targetXRange[1];
    x++
  ) {
    if (matches(x, y)) {
      results.add(x + ',' + y)
    }
  }
}

console.log(results.size)
