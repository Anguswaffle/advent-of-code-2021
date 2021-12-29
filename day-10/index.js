const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString().split('\n')

const isOpener = char => {
  if (char === '(' || char === '[' || char === '{' || char === '<') {
    return true;
  }
  return false;
}

const mapChunk = arr => {
  const expectArr = [];
  for (const char of arr) {
    if (isOpener(char)) {
      if (char === '(') expectArr.unshift(')');
      else if (char === '[') expectArr.unshift(']');
      else if (char === '{') expectArr.unshift('}');
      else if (char === '<') expectArr.unshift('>');
    } else if (char !== expectArr.shift()) return char;
  }
}

const mapIncomplete = arr => {
  const expectArr = [];
  for (const char of arr) {
    if (isOpener(char)) {
      if (char === '(') expectArr.unshift(')');
      else if (char === '[') expectArr.unshift(']');
      else if (char === '{') expectArr.unshift('}');
      else if (char === '<') expectArr.unshift('>');
    } else if (char === expectArr.shift()) continue;
  }
  return expectArr;
}

const calculateScore = (part, arr) => {
  let score = 0;
  if (part === 1) {
    for (const element of arr) {
      if (element === ')') score += 3;
      else if (element === ']') score += 57;
      else if (element === '}') score += 1197;
      else if (element === '>') score += 25137;
    }
  } else if (part === 2) {
    for (const element of arr) {
      if (element === ')') score = score * 5 + 1;
      else if (element === ']') score = score * 5 + 2;
      else if (element === '}') score = score * 5 + 3;
      else if (element === '>') score = score * 5 + 4;
    }
  }
  return score;
}

const init = arr => {
  const corruptArr = arr.map(line => mapChunk(line.split('')))
  const ptOneScore = calculateScore(1, corruptArr.filter(element => element !== undefined));
  console.log(`The answer to part one is ${ptOneScore}.`)

  // Returns an array of lines that are not corrupted
  const incompleteInput = arr.filter(line => {
    if (!mapChunk(line.split(''))) return line;
  });
  const incompleteArr = incompleteInput.map(line => mapIncomplete(line));
  const scoreArr = incompleteArr.map(arr => calculateScore(2, arr)).sort((a, b)=> a-b);
  console.log(incompleteArr, scoreArr[(scoreArr.length -1 ) / 2])
}

init(input)


/**
 * Check char
 * if opener, push corresponding closer into another array
 * if closer, shift closer array and compare to current index
 *    if they don't match, push closer in corrupt array then move on to next line
 */