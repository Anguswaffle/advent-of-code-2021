const fs = require('fs')
const inputArr = fs.readFileSync('./input.txt').toString().split(',').map(num => Number(num));

const sortHelper = (a,b) => {
  return a-b;
}

const fuelMap = {}
const positionArr = [];
for (let i = 0 ; i <= inputArr[0] ; i++) {
  fuelMap[i] = 0;
  positionArr.push(i);
}


const findFuel = (arr) => {
  for(let i = 0 ; i < positionArr.length ; i++){
    let fuelUsed = 0;
    for(const crab of arr ){
      if(positionArr[i] > crab) fuelUsed += (getExtraFuel(positionArr[i]-crab))
      else fuelUsed += (getExtraFuel(crab-positionArr[i]))
    }
    fuelMap[i] = fuelUsed;
  }
  fuelArr = Object.values(fuelMap)
  fuelArr.sort((a,b) => sortHelper(a,b))
  console.log(`The most fuel efficient distance would consume ${fuelArr[0]} crab fuel units.`)
}


// Part 2 addition
const getExtraFuel = (num) => {
  let extraFuel = 0;
  for(let i = 0 ; i < num ; i++){
    extraFuel += (1 + i)
  }
  return extraFuel;
}


findFuel(inputArr);