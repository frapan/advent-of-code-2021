let input = 'BNBBNCFHHKOSCHBKKSHN'

let rules = [
  'CH -> S',
  'KK -> V',
  'FS -> V',
  'CN -> P',
  'VC -> N',
  'CB -> V',
  'VK -> H',
  'CF -> N',
  'PO -> O',
  'KC -> S',
  'HC -> P',
  'PP -> B',
  'KO -> B',
  'BK -> P',
  'BH -> N',
  'CC -> N',
  'PC -> O',
  'FK -> N',
  'KF -> F',
  'FH -> S',
  'SS -> V',
  'ON -> K',
  'OV -> K',
  'NK -> H',
  'BO -> C',
  'VP -> O',
  'CS -> V',
  'KS -> K',
  'SK -> B',
  'OP -> S',
  'PK -> S',
  'HF -> P',
  'SV -> P',
  'SB -> C',
  'BC -> C',
  'FP -> H',
  'FC -> P',
  'PB -> N',
  'NV -> F',
  'VO -> F',
  'VH -> P',
  'BB -> N',
  'SF -> F',
  'NB -> K',
  'KB -> S',
  'VV -> S',
  'NP -> N',
  'SO -> O',
  'PN -> B',
  'BP -> H',
  'BV -> V',
  'OB -> C',
  'HV -> N',
  'PF -> B',
  'SP -> N',
  'HN -> N',
  'CV -> H',
  'BN -> V',
  'PS -> V',
  'CO -> S',
  'BS -> N',
  'VB -> H',
  'PV -> P',
  'NN -> P',
  'HS -> C',
  'OS -> P',
  'FB -> S',
  'HO -> C',
  'KH -> H',
  'HB -> K',
  'VF -> S',
  'CK -> K',
  'FF -> H',
  'FN -> P',
  'OK -> F',
  'SC -> B',
  'HH -> N',
  'OH -> O',
  'VS -> N',
  'FO -> N',
  'OC -> H',
  'NF -> F',
  'PH -> S',
  'HK -> K',
  'NH -> H',
  'FV -> S',
  'OF -> V',
  'NC -> O',
  'HP -> O',
  'KP -> B',
  'BF -> N',
  'NO -> S',
  'CP -> C',
  'NS -> N',
  'VN -> K',
  'KV -> N',
  'OO -> V',
  'SN -> O',
  'KN -> C',
  'SH -> F',
]

/*input = 'NNCB'

rules = [
  'CH -> B',
  'HH -> N',
  'CB -> H',
  'NH -> C',
  'HB -> C',
  'HC -> B',
  'HN -> C',
  'NN -> C',
  'BH -> H',
  'NC -> B',
  'NB -> B',
  'BN -> B',
  'BB -> N',
  'BC -> B',
  'CC -> N',
  'CN -> C',
]*/

const ruleMap = rules.reduce((acc, rule) => {
  const [pair, newChar] = rule.split(' -> ')
  acc[pair] = newChar
  return acc
}, {})

const calculateOccurencesForPairAtStep = (pair, step) => {
  const cacheKey = pair + step
  if (calculateOccurencesForPairAtStep[cacheKey]) {
    return calculateOccurencesForPairAtStep[cacheKey]
  }
  // console.log(pair, step)
  const res = {}
  if (step === 0) {
    // res[pair[0]] = (res[pair[0]] || 0) + 1
    res[pair[1]] = (res[pair[1]] || 0) + 1
    return res
  }
  const middleChar = ruleMap[pair]
  // res[middleChar] = 1
  const resNewPair1 = calculateOccurencesForPairAtStep(
    pair[0] + middleChar,
    step - 1
  )
  const resNewPair2 = calculateOccurencesForPairAtStep(
    middleChar + pair[1],
    step - 1
  )
  Object.keys(resNewPair1).forEach((key) => {
    res[key] = (res[key] || 0) + resNewPair1[key]
  })
  Object.keys(resNewPair2).forEach((key) => {
    res[key] = (res[key] || 0) + resNewPair2[key]
  })
  // console.log(`${pair} -> ${middleChar}`)
  calculateOccurencesForPairAtStep[cacheKey] = res
  return res
}

/*
const result = calculateOccurencesForPairAtStep('NN', 4)
result['N']++
console.log(result)
*/

const result = { [input[0]]: 1 }
for (let i = 0; i < input.length - 1; i++) {
  console.log(`Pair ${i}`)
  const newRes = calculateOccurencesForPairAtStep(input[i] + input[i + 1], 40)
  Object.keys(newRes).forEach((key) => {
    result[key] = (result[key] || 0) + newRes[key]
  })
}
console.log(result)

const sortedCounts = Object.values(result).sort((a, b) => a - b)
console.log(sortedCounts)
console.log(sortedCounts[sortedCounts.length - 1] - sortedCounts[0])

/*
const calculateOccurencesForPair = (pair) => {
  let str = pair
  for (let step = 0; step < 10; step++) {
    str = str.split('').reduce((acc, char, i) => {
      if (i === str.length - 1) {
        return acc + str[i]
      }
      return acc + str[i] + ruleMap[str[i] + str[i + 1]]
    }, '')
  }
  console.log(`${pair} -> ${str}`)
  return str
}

const ruleCountMap = Object.keys(ruleMap).reduce((acc, pair) => {
  acc[pair] = calculateOccurencesForPair(pair)
  return acc
}, {})
*/

/*
const countMap = new Map()
input
  .split('')
  .forEach((char) => countMap.set(char, (countMap.get(char) || 0) + 1))

const sortedCounts = [...countMap.values()].sort((a, b) => a - b)
console.log(sortedCounts[sortedCounts.length - 1] - sortedCounts[0])
*/
