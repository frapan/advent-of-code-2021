const useTestInput = false
let input
if (useTestInput) {
  input = { p1: 4, p2: 8 }
} else {
  input = { p1: 3, p2: 4 }
}

const rollDie = () => {
  rollDie.last = rollDie.last || 0
  const sum =
    (rollDie.last % 100) +
    1 +
    ((rollDie.last + 1) % 100) +
    1 +
    ((rollDie.last + 2) % 100) +
    1
  rollDie.last = ((rollDie.last + 2) % 100) + 1
  return sum
}
// for (let i = 0; i < 40; i++) {
//   console.log(i, rollDie())
// }

let position1 = input.p1
let position2 = input.p2
let score1 = 0
let score2 = 0
let rollsCount = 0
while (true) {
  position1 = ((position1 + rollDie() - 1) % 10) + 1
  score1 += position1
  rollsCount += 3
  if (score1 >= 1000) {
    console.log(
      'end: p1 wbins',
      score1,
      score2,
      rollsCount,
      score2 * rollsCount
    )
    break
  }
  position2 = ((position2 + rollDie() - 1) % 10) + 1
  score2 += position2
  rollsCount += 3
  if (score2 >= 1000) {
    console.log(
      'end: p2 wbins',
      score2,
      score1,
      rollsCount,
      score1 * rollsCount
    )
    break
  }
}
