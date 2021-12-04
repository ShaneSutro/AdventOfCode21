const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const main = async () => {
  const input = await funcs.input.get(3);
  const calculated = new Array(input[0].length).fill(0);

  let power = '';
  let otherThing = '';

  // Loop through each binary set in the array
  for (let i = 0; i < input.length; i++) {
    const entry = input[i];
    // For each binary, loop through the inner numbers one at a time
    for (let j = 0; j < entry.length; j++) {
      /** Add each respective number to the corresponding
       * position in the `calculated` array. Ex:
       * 10110100100 -> [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0]
       *     ++
       * 10010111010 -> [2, 0, 1, 2, 0, 2, 1, 1, 1, 1, 0]
       *     ++
       * 00100101110 -> [2, 0, 2, 2, 0, 3, 1, 2, 2, 2, 0], etc...
       * At the end, any slots that have values greater than 500 have more 1s than 0s
       */
      calculated[j] += Number(entry[j]);
    }
  }

  /**
   * One final loop through the calculated array to convert back to binary.
   * Since we're here, we can reverse the second array we need, reducing
   * the time complexity of our function even further (minimally, but hey 🤷‍♂️)
   */
  for (let i = 0; i < calculated.length; i++) {
    const calc = calculated[i];
    if (calc < 500) {
      power += String(0);
      otherThing += String(1);
    } else {
      power += String(1);
      otherThing += String(0);
    }
  }
  console.log(calculated);
  console.log(power);
  console.log(otherThing);
};

module.exports = main;
