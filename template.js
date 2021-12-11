const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const main = async () => {
  const input = await funcs.input.get(/* Put the day number (int) here! */);

  // Do something with the prompt data here
};

main();

module.exports = main;
