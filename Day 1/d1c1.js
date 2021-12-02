const funcs = require('../shared/functions');
require('dotenv').config();

funcs.raw
  .get('https://adventofcode.com/2021/day/1/input')
  .then((data) => data.data.split('\n'))
  .then((list) => {
    counter = 0;
    for (let i = 1; i < list.length - 1; i++) {
      if (Number(list[i]) > Number(list[i - 1])) {
        counter++;
      }
    }
    console.log(counter);
  })
  .catch((err) => console.error(err));
