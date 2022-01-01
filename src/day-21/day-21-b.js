const useTestInput = false
let input
if (useTestInput) {
  input = { p1: 4, p2: 8 }
} else {
  input = { p1: 3, p2: 4 }
}

const universesWithWin = [0, 0]
const scores = [0, 0]
const positions = [input.p1, input.p2]
const universesByRoll = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 }

const play = (positions, scores, player, universes) => {
  for (let i = 3; i <= 9; i++) {
    const newUniverses = universes * universesByRoll[i]
    const newPosition = ((positions[player] + i - 1) % 10) + 1
    const newScore = scores[player] + newPosition
    if (newScore >= 21) {
      universesWithWin[player] += newUniverses
    } else {
      const newPositions = [...positions]
      newPositions[player] = newPosition
      const newScores = [...scores]
      newScores[player] = newScore
      play(newPositions, newScores, 1 - player, newUniverses)
    }
  }
}

play(positions, scores, 0, 1)
console.log(universesWithWin, Math.max(...universesWithWin))
