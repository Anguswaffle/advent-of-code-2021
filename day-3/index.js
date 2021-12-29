const fs = require('fs')

// Input
const inputArr = fs.readFileSync('./input.txt').toString().split('\n')

// Part one of solution
let gamma = '';
let epsilon = '';

for (let i = 0; i < 12; i++) {
  let counter = [0, 0]
  inputArr.forEach(input => {
    if (input.at(i) === '0') counter[0]++;
    else counter[1]++;
  })
  if (counter[0] > counter[1]) {
    gamma += '0';
    epsilon += '1';
  } else {
    gamma += '1';
    epsilon += '0';
  }
}

gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);

console.log(`The first answer is ${gamma * epsilon}`)


// Part two of solution

let oxyArr = inputArr;
let c02Arr = inputArr;

for (let i = 0; i < 12; i++) {
  let oxyCounter = [0, 0]
  let c02Counter = [0, 0]
  oxyArr.forEach(input => {
    if (input.at(i) === '0') oxyCounter[0]++;
    else oxyCounter[1]++;
  })
  c02Arr.forEach(input => {
    if (input.at(i) === '0') c02Counter[1]++;
    else c02Counter[0]++;
  })

  let oxyModifier;  
  if(oxyCounter[0] < oxyCounter[1] || oxyCounter[0] === oxyCounter[1]) oxyModifier = '1';
  else oxyModifier = '0';

  let c02Modifier;  
  if(c02Counter[0] > c02Counter[1] || c02Counter[0] === c02Counter[1]) c02Modifier = '0';
  else c02Modifier = '1';

  if(oxyArr.length > 1) oxyArr = oxyArr.filter(input => input.at(i) === oxyModifier)
  
  if(c02Arr.length > 1) c02Arr = c02Arr.filter(input => input.at(i) === c02Modifier)
}

const oxyRating = parseInt(oxyArr[0], 2);
const c02Rating = parseInt(c02Arr[0], 2);

console.log(`The second answer is ${oxyRating * c02Rating}`)