let input = [
  5, 3, 2, 2, 1, 1, 4, 1, 5, 5, 1, 3, 1, 5, 1, 2, 1, 4, 1, 2, 1, 2, 1, 4, 2, 4,
  1, 5, 1, 3, 5, 4, 3, 3, 1, 4, 1, 3, 4, 4, 1, 5, 4, 3, 3, 2, 5, 1, 1, 3, 1, 4,
  3, 2, 2, 3, 1, 3, 1, 3, 1, 5, 3, 5, 1, 3, 1, 4, 2, 1, 4, 1, 5, 5, 5, 2, 4, 2,
  1, 4, 1, 3, 5, 5, 1, 4, 1, 1, 4, 2, 2, 1, 3, 1, 1, 1, 1, 3, 4, 1, 4, 1, 1, 1,
  4, 4, 4, 1, 3, 1, 3, 4, 1, 4, 1, 2, 2, 2, 5, 4, 1, 3, 1, 2, 1, 4, 1, 4, 5, 2,
  4, 5, 4, 1, 2, 1, 4, 2, 2, 2, 1, 3, 5, 2, 5, 1, 1, 4, 5, 4, 3, 2, 4, 1, 5, 2,
  2, 5, 1, 4, 1, 5, 1, 3, 5, 1, 2, 1, 1, 1, 5, 4, 4, 5, 1, 1, 1, 4, 1, 3, 3, 5,
  5, 1, 5, 2, 1, 1, 3, 1, 1, 3, 2, 3, 4, 4, 1, 5, 5, 3, 2, 1, 1, 1, 4, 3, 1, 3,
  3, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 5, 1, 2, 2, 5, 2, 4, 1, 1, 2, 4, 1, 2, 3, 4,
  1, 2, 1, 2, 4, 2, 1, 1, 5, 3, 1, 4, 4, 4, 1, 5, 2, 3, 4, 4, 1, 5, 1, 2, 2, 4,
  1, 1, 2, 1, 1, 1, 1, 5, 1, 3, 3, 1, 1, 1, 1, 4, 1, 2, 2, 5, 1, 2, 1, 3, 4, 1,
  3, 4, 3, 3, 1, 1, 5, 5, 5, 2, 4, 3, 1, 4,
]

//input = [3, 4, 3, 1, 2]
const totalDays = 80

for (let day = 1; day <= totalDays; day++) {
  const addedFishes = []
  for (let fishIndex = 0; fishIndex < input.length; fishIndex++) {
    if (input[fishIndex] === 0) {
      input[fishIndex] = 6
      addedFishes.push(8)
    } else {
      input[fishIndex]--
    }
  }
  input.push(...addedFishes)
}

console.log(input.length)
