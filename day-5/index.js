const fs = require('fs')

const inputArr = fs.readFileSync('./input.txt').toString().replaceAll(' -> ', ',').replaceAll('\n', ',').split(',');

// Parts 1 and 2

class Vents {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  isLine() {
    if (this.x1 === this.x2 || this.y1 === this.y2) return true;
    return false;
  }

  isDiagonal() {
    let xDif = this.x1 - this.x2;
    let yDif = this.y1 - this.y2;
    if (xDif < 0) xDif = xDif * -1;
    if (yDif < 0) yDif = yDif * -1;

    return xDif === yDif
  }

  getLineAxis() {
    if (this.x1 === this.x2) return 'y'
    return 'x'
  }

  getLine() {
    const pointArr = [];
    if (this.getLineAxis() === 'y') {
      if (this.y1 > this.y2) {
        for (let i = this.y2; i <= this.y1; i++) pointArr.push(i);
      } else {
        for (let i = this.y1; i <= this.y2; i++) pointArr.push(i);
      }
    } else if (this.getLineAxis() === 'x') {
      if (this.x1 > this.x2) {
        for (let i = this.x2; i <= this.x1; i++) pointArr.push(i);
      } else {
        for (let i = this.x1; i <= this.x2; i++) pointArr.push(i);
      }
    } 
      return pointArr;
  }

  getDiagonalLine() {
    const pointArr = [];
    let startingX;
    let endingX;
    let startingY;
    let endingY;
    if (this.x1 > this.x2) {
      startingX = this.x2
      endingX = this.x1
      startingY = this.y2
      endingY = this.y1
    } else {
      startingX = this.x1
      endingX = this.x2
      startingY = this.y1
      endingY = this.y2
    }
    const diff = endingX - startingX;
    for(let i = 0; i <= diff; i++) {
      pointArr.push(startingX + i)
      if(startingY > endingY) pointArr.push(startingY - i)
      else pointArr.push(startingY + i)
    }
    return pointArr;
  }
}


const plotPoints = (vents) => {
  let plotPointsMap = {};
  vents.forEach(vent => {
    if (vent.isLine() && vent.getLineAxis() === 'x') {
      vent.getLine().forEach(point => {
        const plotSpot = `${point},${vent.y1}`;
        if (!plotPointsMap.hasOwnProperty(plotSpot)) plotPointsMap[plotSpot] = 1;
        else plotPointsMap[plotSpot]++;
      })
    }
    if (vent.isLine() && vent.getLineAxis() === 'y') {
      vent.getLine().forEach(point => {
        const plotSpot = `${vent.x1},${point}`;
        if (!plotPointsMap.hasOwnProperty(plotSpot)) plotPointsMap[plotSpot] = 1;
        else plotPointsMap[plotSpot]++;
      })
    }

    // This is for part 2. Comment out to get Part 1's answer.
    if (vent.isDiagonal()) {
      const ventLine = vent.getDiagonalLine();
      for (let i = 0; i < ventLine.length; i = i + 2) {
        const plotSpot = `${ventLine[i]},${ventLine[i+1]}`;
        if (!plotPointsMap.hasOwnProperty(plotSpot)) plotPointsMap[plotSpot] = 1;
        else plotPointsMap[plotSpot]++;
      }
    }
  })
  return plotPointsMap;
}

const determineDangerZones = (plotMap) => {
  const ventPlotArr = Object.values(plotMap);
  const answerArr = ventPlotArr.filter(num => num > 1);
  console.log(`There are ${answerArr.length} dangerous spots.`)
}

const constructVents = (pointsArr) => {
  const ventsArr = [];
  for (let i = 0; i < pointsArr.length; i = i + 4) {
    const x1 = Number(pointsArr[i])
    const y1 = Number(pointsArr[i + 1])
    const x2 = Number(pointsArr[i + 2])
    const y2 = Number(pointsArr[i + 3])
    ventsArr.push(new Vents(x1, y1, x2, y2));
  }
  return ventsArr;
}

const init = () => {
  const ventsArr = constructVents(inputArr);
  const plotMap = plotPoints(ventsArr)
  determineDangerZones(plotMap)
}

init();
