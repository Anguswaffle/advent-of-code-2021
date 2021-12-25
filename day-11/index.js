const fs = require('fs');

const input = fs.readFile('./input.txt', (err, data) => {
  if(err) throw err;
  return data.toString().split('\n')
});

console.log(input)