const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const main = async () => {
  const input = await funcs.input.get(/* Put the day number (int) here! */);

  // Do something with the prompt data here
};

/**
 * If you are using Quokka to run these tests,
 * or are running this file directly,
 * uncomment the below line
 * main();
 */

module.exports = main;
