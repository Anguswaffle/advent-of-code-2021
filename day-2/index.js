const fs = require('fs');

// Input string
const inputArr = fs.readFileSync('./input.txt').toString().split('\n')

// First part of puzzle
let horizontal = 0;
let depth = 0;
inputArr.forEach(input => {
  const modifier = Number(input.at(-1))
  if(input.includes('forward')) horizontal += modifier
  else if(input.includes('down')) depth += modifier
  else if(input.includes('up')) depth -= modifier
})

// Answer
console.log(horizontal * depth)


// Second part of puzzle

horizontal = 0;
depth = 0;
aim = 0;
inputArr.forEach(input => {
  const modifier = Number(input.at(-1))
  if(input.includes('forward')) {
    horizontal += modifier
    depth += (aim * modifier)
  }
  else if(input.includes('down')) aim += modifier
  else if(input.includes('up')) aim -= modifier
})

// Answer 
console.log(horizontal * depth)