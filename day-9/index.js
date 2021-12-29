const fs = require('fs')
const inputMap = fs.readFileSync('./input.txt').toString().split('\n')
const pt2Map = inputMap.map(line => line.split('').map(num => parseInt(num, 10)))

// Part 1
const findAdjacentLows = arr => {
  const locationMap = {}
  for (let i = 0; i < arr.length; i++) {
    const currentLat = arr[i]
    for (let j = 0; j < currentLat.length; j++) {
      const longArr = arr.map(arr => arr[j])
      const currentTarget = currentLat[j];
      const nextLatSpot = (currentLat[j + 1] || 9)
      const previousLatSpot = (currentLat[j - 1] || 9)
      const previousLong = (longArr[i - 1] || 9)
      const nextLong = (longArr[i + 1] || 9)
      if (currentTarget < nextLatSpot && currentTarget < previousLatSpot && currentTarget < previousLong && currentTarget < nextLong) locationMap[j + ',' + i] = Number(currentTarget);
    }
  }
  return locationMap;
}

const calculateDanger = locationMap => {
  const heightArr = Object.values(locationMap);
  let total = 0;
  heightArr.forEach(num => total += (1 + num))
  return total;
}

const partOneInit = arr => {
  const dangerZones = findAdjacentLows(arr)
  const total = calculateDanger(dangerZones);
  console.log(`The answer to part one is ${total}.`);
}

partOneInit(inputMap);

// Part 2
const getHeight = (map, x, y) => {
  return map[y][x];
}

const getAdjacent = (map, x, y) => {
  return [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y]
  ].filter(([x, y]) => y in map && x in map[y]);
}

function scanBasin(map, x, y, low = null, points = []) {
	const height = getHeight(map, x, y);

	if (low === null) {
		low = height;
	}

	points.push([x,y].join());

	for (const [xx, yy] of getAdjacent(map, x, y)) {
		if (points.includes([xx,yy].join())) {
			continue;
		}

		const adjacentHeight = getHeight(map, xx, yy);

		if (adjacentHeight >= 9) {
			continue;
		}

		if (adjacentHeight < low) {
			return false;
		}

		if (!scanBasin(map, xx, yy, low, points)) {
			return false;
		}
	}

	return points;
}

const partTwoInit = map => {
  const sizes = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const points = scanBasin(map, x, y);

      if (points) {
        sizes.push(points.length);
      }
    }
  }

  const result = sizes.sort((a, b) => b - a).slice(0, 3).reduce((n, res) => res *= n);

  console.log(`The answer to part two is ${result}.`);

}

partTwoInit(pt2Map)