// const useTestInput = false

const str = '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]\n'

const explodeValueToLeft = (str, value) => {
  for (let i = str.length - 1; i > 0; i--) {
    if (str[i] >= '0' && str[i] <= '9') {
      return str.slice(0, i) + (Number(str[i]) + value) + str.slice(i + 1)
    }
  }
  return str
}

const explodeValueToRight = (str, value) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
      return str.slice(0, i) + (Number(str[i]) + value) + str.slice(i + 1)
    }
  }
  return str
}

const explode = (str) => {
  let openedBrackets = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      openedBrackets++
    }
    if (str[i] === ']') {
      openedBrackets--
    }
    if (openedBrackets === 5) {
      const explodingLeftValue = Number(str[i + 1])
      const explodingRightValue = Number(str[i + 3])
      const leftStr = explodeValueToLeft(str.slice(0, i), explodingLeftValue)
      const rightStr = explodeValueToRight(
        str.slice(str.indexOf(']', i) + 1),
        explodingRightValue
      )
      return leftStr + '0' + rightStr
    }
  }
}

console.log(explode(str))

// Explode funziona, almeno quando i numeri sono di una cifra
// Devo fare in modo che funzioni anche con numeri di più cifre
// Poi devo fare lo split
// Poi devo fare il loop che fa la reduce (explode finché si può e poi split)
