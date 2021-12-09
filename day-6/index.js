const testInput = `3,4,3,1,2`;
const testArr = testInput.split(',').map(num => Number(num));

const input = `2,4,1,5,1,3,1,1,5,2,2,5,4,2,1,2,5,3,2,4,1,3,5,3,1,3,1,3,5,4,1,1,1,1,5,1,2,5,5,5,2,3,4,1,1,1,2,1,4,1,3,2,1,4,3,1,4,1,5,4,5,1,4,1,2,2,3,1,1,1,2,5,1,1,1,2,1,1,2,2,1,4,3,3,1,1,1,2,1,2,5,4,1,4,3,1,5,5,1,3,1,5,1,5,2,4,5,1,2,1,1,5,4,1,1,4,5,3,1,4,5,1,3,2,2,1,1,1,4,5,2,2,5,1,4,5,2,1,1,5,3,1,1,1,3,1,2,3,3,1,4,3,1,2,3,1,4,2,1,2,5,4,2,5,4,1,1,2,1,2,4,3,3,1,1,5,1,1,1,1,1,3,1,4,1,4,1,2,3,5,1,2,5,4,5,4,1,3,1,4,3,1,2,2,2,1,5,1,1,1,3,2,1,3,5,2,1,1,4,4,3,5,3,5,1,4,3,1,3,5,1,3,4,1,2,5,2,1,5,4,3,4,1,3,3,5,1,1,3,5,3,3,4,3,5,5,1,4,1,1,3,5,5,1,5,4,4,1,3,1,1,1,1,3,2,1,2,3,1,5,1,1,1,4,3,1,1,1,1,1,1,1,1,1,2,1,1,2,5,3`
const inputArr = input.split(',').map(num => Number(num));

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


