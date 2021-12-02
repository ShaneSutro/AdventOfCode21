const funcs = require('../shared/functions');
require('dotenv').config();

funcs.raw
  .get('https://adventofcode.com/2021/day/2/input')
  .then((data) => data.data.split('\n'))
  .then((list) => {
    list = list.slice(0, list.length - 1); // Slice off blank row at the end

    let horizontal = 0;
    let vertical = 0;

    for (let i = 0; i < list.length; i++) {
      const splitValues = list[i].split(' ');
      const direction = splitValues[0];
      const value = Number(splitValues[1]);

      if (direction === 'forward') {
        horizontal += value;
      } else if (direction === 'down') {
        vertical += value;
      } else if (direction === 'up') {
        vertical -= value;
      }
    }

    console.log('Answer:', horizontal * vertical);
  })
  .catch((err) => console.error(err));
