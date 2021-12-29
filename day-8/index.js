const fs = require('fs')
const inputArr = fs.readFileSync('./input.txt').toString().replaceAll('\n', '|').split('|');

// Part 1
// const countEasyNum = arr => {
//   const numMap = {1: 0, 4: 0, 7: 0, 8: 0}
//   for(let i = 1; i < arr.length ; i = i + 2){
//     const numArr = arr[i].trim().split(' ');
//     numArr.forEach(num => {
//       if(num.length === 2) numMap[1]++;
//       if(num.length === 4) numMap[4]++;
//       if(num.length === 3) numMap[7]++;
//       if(num.length === 7) numMap[8]++;
//     })
//   }

//   let total = 0;
//   easyNumArr = Object.values(numMap);
//   easyNumArr.forEach(count => total += count)
//   console.log(`The answer to part 1 is ${total}.`);
// }

// countEasyNum(inputArr);


// Part 2
const sortString = string => {
  const charArr = string.split('');
  return charArr.sort().join('')
}

const hasOne = (str, oneStr) => {
  const oneArr = oneStr.split('');
  if (!(str.includes(oneArr[0]) && str.includes(oneArr[1]))) return false;
  return true;
}

const hasFour = (str, fourStr) => {
  const fourArr = fourStr.split('');
  for (const char of fourArr) if(!str.includes(char)) return false;
  return true;
}

const looksLikeSix = (str, sixStr) => {
  const fiveArr = str.split('');
  for (const char of fiveArr) if (!sixStr.includes(char)) return false;
  return true;
}


const findNums = arr => {
  const numMap = {};
  // Finds 1, 4, 7, 8
  arr.forEach(str => {
    str = sortString(str);
    if (str.length === 2) numMap[1] = str;
    if (str.length === 4) numMap[4] = str;
    if (str.length === 3) numMap[7] = str;
    if (str.length === 7) numMap[8] = str;
  })

  // Finds 3, 6, 9
  arr.forEach(str => {
    str = sortString(str);

    if (str.length === 5 && hasOne(str, numMap[1])) numMap[3] = str;
    if (str.length === 6 && !hasOne(str, numMap[1])) numMap[6] = str;
    if (str.length === 6 && hasFour(str, numMap[4])) numMap[9] = str;
  })

  // Finds 0, 2, 5
  arr.forEach(str => {
    str = sortString(str);
    if (str.length === 6 && !Object.values(numMap).includes(str)) numMap[0] = str;
    if (str.length === 5 && looksLikeSix(str, numMap[6])) numMap[5] = str;
    if (!Object.values(numMap).includes(str)) numMap[2] = str;
  })
  return numMap;
}

const findInputNums = arr => {
  numInputArr = [];
  for (i = 0; i < arr.length; i = i + 2) {
    const currentInput = arr[i].trim().split(' ');
    numInputArr.push(findNums(currentInput));
  }
  return numInputArr;
}

const gatherOutputNums = arr => {
  numOutputArr = [];
  for (i = 1; i < arr.length; i = i + 2) {
    const currentOutput = arr[i].trim().split(' ');
    const fixedOutput = currentOutput.map(string => sortString(string))
    numOutputArr.push(fixedOutput)
  }
  return numOutputArr;
}

const addOutputNums = (numMaps, outputStrings) => {
  let total = 0;
  console.log(outputStrings)
  for (let i = 0; i < numMaps.length; i++) {
    let currentOutputNum = '';
    const currentMap = numMaps[i];
    const currentOutput = outputStrings[i];
    for (let j = 0; j < currentOutput.length; j++) {
      for (const [key, value] of Object.entries(currentMap)) {
        if (currentOutput[j] === value) currentOutputNum += `${key}`
        console.log(currentOutputNum, currentOutput, currentMap)
      }
    }
    total += Number(currentOutputNum);
  }
  return total;
}

const init = arr => {
  const allNumMaps = findInputNums(arr);
  const allOutputStrings = gatherOutputNums(arr);
  const findAnswer = addOutputNums(allNumMaps, allOutputStrings);
  console.log(`The total output is ${findAnswer}.`)
}

init(inputArr);
