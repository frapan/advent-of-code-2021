const useTestInput = false
let input
if (useTestInput) {
  input = require('./input-test')
} else {
  input = require('./input')
}

let inpCount = 0

const translate = (instruction) => {
  const firstSpace = instruction.indexOf(' ')
  const command = instruction.slice(0, firstSpace)
  const vars = instruction.slice(firstSpace + 1).split(' ')
  switch (command) {
    case 'inp':
      return (
        'w = ' +
        String.fromCharCode('a'.charCodeAt(0) + inpCount++) +
        `\nconsole.log('\\ninp', ${vars[0]})`
      )
    case 'add':
      return `${vars[0]} += ${vars[1]}\nconsole.log('add', ${vars[0]}, ${vars[1]})`
    case 'mul':
      return `${vars[0]} *= ${vars[1]}\nconsole.log('mul', ${vars[0]}, ${vars[1]})`
    case 'div':
      return `${vars[0]} = Math.floor(${vars[0]} / ${vars[1]})\nconsole.log('div', ${vars[0]}, ${vars[1]})`
    case 'mod':
      return `${vars[0]} = ${vars[0]} % ${vars[1]}\nconsole.log('mod', ${vars[0]}, ${vars[1]})`
    case 'eql':
      return `${vars[0]} = ${vars[0]} === ${vars[1]} ? 1 : 0\nconsole.log('eql', ${vars[0]}, ${vars[1]})`
  }
}

const createFunction = (input) => {
  const instructions = input.split('\n')
  let body = `
  let w = 0
  let x = 0
  let y = 0
  let z = 0
  `
  body += instructions.map((instruction) => translate(instruction)).join('\n')
  body += '\nreturn z\n'
  // console.log(body)
  // eslint-disable-next-line no-new-func
  return new Function(
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    body
  )
}

const fn = createFunction(input)
console.log(fn(...String(59692994994998).split('').map(Number)))
