const funcs = require('../shared/functions');
require('dotenv').config();

funcs.raw
  .get('https://adventofcode.com/2021/day/1/input')
  .then((data) => data.data.split('\n'))
  .then((list) => {
    counter = 0;

    for (let i = 3; i < list.length - 1; i++) {
      const one = Number(list[i - 3]);
      const two = Number(list[i - 2]);
      const three = Number(list[i - 1]);
      const four = Number(list[i]);
      if (two + three + four > one + two + three) {
        counter++;
      }
    }
    console.log(counter);
  })
  .catch((err) => console.error(err));
