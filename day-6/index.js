const fs = require('fs')

const inputArr = fs.readFileSync('./input.txt').toString().split(',').map(num => Number(num));

const fishCountMap = arr => {
  let fishCount = {};
  arr.forEach(fish => {
    if (!fishCount.hasOwnProperty(fish)) fishCount[fish] = 1;
    else fishCount[fish]++;
  })
  return fishCount;
}

const moveFish = fishCount => {
  const fishArr = Object.entries(fishCount);
  const newFishCount = {};

  for (let [key, value] of fishArr) {
    if (key > -1) newFishCount[--key] = value;
  }
  if (newFishCount[-1] > 0) {
    newFishCount[6] = newFishCount[-1] + (newFishCount[6] || 0);
    newFishCount[8] = newFishCount[-1];
    newFishCount[-1] = 0;
  }
  return newFishCount;
}

const init = inputArr => {
  let fishMap = fishCountMap(inputArr);
  for (let i = 0; i < 256; i++) {
    fishMap = moveFish(fishMap);
  }

  const totalFishArr = Object.values(fishMap);
  let total = 0;
  totalFishArr.forEach(fish => 
    total += fish)
  console.log(`There will be ${total} fish after 256 days.`)

}

init(inputArr);






// Tried doing this before I realized I don't have nearly enough memory for this type of solution

// for (let i = 0 ; i < 256; i++){
//   let newFish = 0;
//   for(let j = 0 ; j < inputArr.length ; j++) {
//         inputArr[j]--;
//         if(inputArr[j] < 0){
//           inputArr[j] = 6;
//           newFish++;
//         }
//       }
//   for(let j = 0; j < newFish; j++) inputArr.push(8);
//   console.log(`day ${i}: ${inputArr.length} fish`);
// }

// console.log(`There will be ${inputArr.length} Lanternfish after 256 days.`);


