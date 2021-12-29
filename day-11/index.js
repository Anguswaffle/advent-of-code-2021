const fs  = require('fs');

const input = fs.readFileSync('./input.txt').toString().split('\n').map(line => line.split('').map(num => parseInt(num, 10)));


const isFlashed = (currentState) => currentState === 0

const findAdjacent = (map, x, y) => {
  return [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1]
  ].filter(([x, y]) => y in map && x in map[y]);
}

const flashOctos = octopusArr => {
  let flashCount = 0;
  let cycles = 0;
  while (true) {

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        octopusArr[y][x]++;
      }
    }

    while (octopusArr.flat(2).find(element => element > 9)) {
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (octopusArr[y][x] > 9) {
            octopusArr = flashSurround(octopusArr, x, y)
            octopusArr[y][x] = 'flash';
          }
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (octopusArr[y][x] === 'flash') {
          octopusArr[y][x] = 0;
          flashCount++
        }
      }
    }

    // For part 2 only. Comment this line out to get part 1 solution
    if(octopusArr.flat(2).every(isFlashed)) return ++cycles;

    
    cycles++;
  }
  return flashCount
}

const flashSurround = (octopusArr, x, y) => {
  const surroundingOcto = findAdjacent(octopusArr, x, y);
  for (const [x, y] of surroundingOcto) {
    if (octopusArr[y][x] !== 'flash') octopusArr[y][x]++;
  }
  return octopusArr;
}

const init = octopusArr => {
  const count = flashOctos(octopusArr);
  console.log(`The answer to part one is ${count}.`)
}

init(input)