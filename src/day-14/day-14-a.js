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

for (let step = 0; step < 10; step++) {
  input = input.split('').reduce((acc, char, i) => {
    if (i === input.length - 1) {
      return acc + input[i]
    }
    return acc + input[i] + ruleMap[input[i] + input[i + 1]]
  }, '')
}

const countMap = new Map()
input
  .split('')
  .forEach((char) => countMap.set(char, (countMap.get(char) || 0) + 1))

const sortedCounts = [...countMap.values()].sort((a, b) => a - b)
console.log(sortedCounts[sortedCounts.length - 1] - sortedCounts[0])
