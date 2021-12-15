let input = [
  'start-YA',
  'ps-yq',
  'zt-mu',
  'JS-yi',
  'yq-VJ',
  'QT-ps',
  'start-yq',
  'YA-yi',
  'start-nf',
  'nf-YA',
  'nf-JS',
  'JS-ez',
  'yq-JS',
  'ps-JS',
  'ps-yi',
  'yq-nf',
  'QT-yi',
  'end-QT',
  'nf-yi',
  'zt-QT',
  'end-ez',
  'yq-YA',
  'end-JS',
]

// input = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end']
// input = [
//   'dc-end',
//   'HN-start',
//   'start-kj',
//   'dc-start',
//   'dc-HN',
//   'LN-dc',
//   'HN-end',
//   'kj-sa',
//   'kj-HN',
//   'kj-dc',
// ]
// input = [
//   'fs-end',
//   'he-DX',
//   'fs-he',
//   'start-DX',
//   'pj-DX',
//   'end-zg',
//   'zg-sl',
//   'zg-pj',
//   'pj-he',
//   'RW-he',
//   'fs-DX',
//   'pj-RW',
//   'zg-RW',
//   'start-pj',
//   'he-WI',
//   'zg-he',
//   'pj-fs',
//   'start-RW',
// ]

const nodes = {
  // start: {
  //   name: 'start',
  //   isBig: false,
  //   links: [],
  // },
}

const newNode = (name) => ({
  name,
  isBig: name === name.toUpperCase(),
  links: [],
})

for (const link of input) {
  const [from, to] = link.split('-')
  nodes[from] = nodes[from] || newNode(from)
  nodes[to] = nodes[to] || newNode(to)
  nodes[from].links.push(nodes[to])
  nodes[to].links.push(nodes[from])
}

const paths = []
const move = (from, currentPath, visitedSingleCave) => {
  for (const link of from.links) {
    const newPath = [...currentPath, link.name]
    if (link.name === 'end') {
      paths.push(newPath)
    } else {
      if (link.isBig || !currentPath.includes(link.name)) {
        move(link, newPath, visitedSingleCave)
      }
      if (
        !link.isBig &&
        !visitedSingleCave &&
        currentPath.includes(link.name) &&
        link.name !== 'start'
      ) {
        move(link, newPath, true)
      }
    }
  }
}

move(nodes.start, ['start'], false)
// console.log(paths.map((path) => path.join('-')))
console.log(paths.length)
