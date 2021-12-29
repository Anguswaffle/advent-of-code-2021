const fs = require('fs');

const template = `OKSBBKHFBPVNOBKHBPCO`.split('')

const rules = fs.readFileSync('./input.txt').toString().split('\n')

const insertPolymers = (polymer, rules) => {

  // Deconstructs a given polymer into pairs
  const polymerMap = {};
  // const elementCount = {};
  for (var i = 0; i < polymer.length - 1; i++) {
    const currentPair = [polymer[i], polymer[i + 1]].join('')
    polymerMap[currentPair] = 1 + polymerMap[currentPair] || 1;
  }

  // Deconstructs the rules into a map object
  const rulesMap = {};
  rules.forEach(line => {
    const [x, y] = line.split(' -> ')
    rulesMap[x] = y;
    // Checks to see if a given pair is in the polymer map and adds it if not
    x in polymerMap ? null : polymerMap[x] = 0;
  })

  // For part one, set iterations to 10
  for (let i = 0; i < 40; i++) {
    for (const [pair, count] of Object.entries(polymerMap)) {
      const [a, b] = pair.split('');
      const c = rulesMap[pair];

      polymerMap[[a, b].join('')] -= count;
      polymerMap[[a, c].join('')] += count;
      polymerMap[[c, b].join('')] += count;
    }
  }

  const countMap = {};
  for (const [[element], count] of Object.entries(polymerMap)) {
    countMap[element] = countMap[element] + count || count;
  }
  // Adds the final element from the original polymer to the count
  countMap[[polymer[polymer.length -1]]]++

  // Returns an array of element counts by increasing order
  return Object.entries(countMap).sort(([char1, count1], [char2, count2]) => {
    if (count1 > count2) return 1;
    if (count1 < count2) return -1;
  });

}

const init = (polymer, rules) => {
  const newPoly = insertPolymers(polymer, rules)
  console.log(`The answer is ${newPoly[newPoly.length-1][1]-newPoly[0][1]}`)
}

init(template, rules)