const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const main = async () => {
  const input = await funcs.input.get(3);
  let position = 0; // Keep track of which positional number we are working on

  const filterValues = (inputArray, position, type) => {
    // Base helper case for outer function:
    if (inputArray.length === 1) {
      return inputArray;
    }

    const ones = [];
    const ohs = [];
    let positionTotal = 0;

    // Loop through the input array
    for (let i = 0; i < inputArray.length; i++) {
      // In this case, we are only interested in the
      // number at this particular position in the string,
      // so we slice that number in particular and add it
      // to the position total, which will help us find out
      // if there are more 1s or 0s
      const positionalNumber = inputArray[i][position];
      positionTotal += Number(positionalNumber);

      // since we are already looping, we store the number
      // into an array based on the number at the current
      // position. That way it's just a matter of grabbing
      // one array or the other based on the result and we
      // won't have to loop again.
      if (positionalNumber === '1') {
        ones.push(inputArray[i]);
      } else {
        ohs.push(inputArray[i]);
      }
    }

    // Divide by two, but take the lower since the instructions
    // states that greater than or equal to half should be
    // used for the comparison
    const threshold = Math.floor(inputArray.length / 2);

    // Return the correct array back. If our position
    // total is greater than or equal to half of our
    // array, then we know there are more 1s than 0s.
    if (type === 'ogr') {
      if (positionTotal >= threshold) {
        return ones;
      } else {
        return ohs;
      }
    } else if (type === 'csr') {
      if (positionTotal >= threshold) {
        return ohs;
      } else {
        return ones;
      }
    }
  };

  // Main recursive function
  const narrowInput = (ogrValues, csrValues, position) => {

    // Filter out those that don't match the position total
    const ogrArray = filterValues(ogrValues, position, 'ogr');
    const csrArray = filterValues(csrValues, position, 'csr');

    // If either of the arrays have more than one, then we
    // want to recurse again. We let the inner filterValues
    // function handle the base case if there is just
    // one value in the array so that it doesn't break
    // our main recursive function.
    if (ogrValues.length > 1 || csrArray.length > 1) {
      return narrowInput(ogrArray, csrArray, position + 1);
    }

    // Once all done recursing, we kick back the final
    // values.
    return [ogrArray, csrArray];
  };

  // Kick off the recursion
  const finalNumbers = await narrowInput(input, input, 0);

  /**
   * Use parseInt() with base 2 to convert back to an integer,
   * then multiply.
   *
   * Final answer, Regis:
   */
  const answer = parseInt(finalNumbers[0][0], 2) * parseInt(finalNumbers[1][0], 2);
};

main();

module.exports = main;
