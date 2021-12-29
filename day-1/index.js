const fs = require('fs');

// Number array
const numArr = fs.readFileSync('./input.txt').toString().split('\n').map(num => Number(num));

// Coverting the string into an array of Numbers


// First part of puzzle
let deepers = 0;
let previousEntry = numArr[0]

numArr.forEach(num => {
  if(num > previousEntry) deepers++;
  previousEntry = num;
})
console.log(`There were ${deepers} depth entries deeper than the prior.`)

// Second part of puzzle
deepers = 0;
const previousEntries = [numArr[0], numArr[1], numArr[2]]
let previousDepth = previousEntries[0] + previousEntries[1] + previousEntries[2]

for( let i = 3 ; i < numArr.length ; i++) {
  const newDepth = previousEntries[0] + previousEntries[1] + previousEntries[2]

  if(previousDepth < newDepth) deepers++;

  previousEntries.shift()
  previousEntries.push(numArr[i])

  previousDepth = newDepth;
}

console.log(`There were ${deepers} three measurement sliding windows deeper than previous three measurement sliding window.`)