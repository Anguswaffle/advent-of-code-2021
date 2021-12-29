const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n')

const isSmallCave = cave => {
  return cave === cave.toLowerCase();
}

const init = input => {
  const pathMap = {};

  input.forEach(line => {
    const [a,b] = line.split('-');

    pathMap[a] ? pathMap[a].push(b) : pathMap[a] = [b];
    pathMap[b] ? pathMap[b].push(a) : pathMap[b] = [a];
  })

  console.log(pathMap)
}

init(testInput)