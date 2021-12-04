const axios = require('axios');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const getAndStore = async (dayNum) => {
  const url = `https://adventofcode.com/2021/day/${dayNum}/input`;
  const data = await axios
    .get(url, {
      withCredentials: true,
      headers: {
        cookie: process.env.SESSION,
      },
    })
    .catch((err) => {
      throw new Error(`Could not get data! ${err}`);
    });
  const split = data.data.split('\n');
  const final = split.slice(0, split.length - 1);
  fs.writeFileSync(path.resolve(__dirname, `../data/day${dayNum}.json`), JSON.stringify(final));
  console.log(`Done! Day ${dayNum} added and can now be referenced.`);
  return data;
};

module.exports = {
  raw: {
    get: (url) => {
      return axios.get(url, {
        withCredentials: true,
        headers: {
          cookie: process.env.SESSION,
        },
      });
    },
    store: async (url, dayNum) => {
      const data = await axios.get(url, {
        withCredentials: true,
        headers: {
          cookie: process.env.SESSION,
        },
      });
      console.log(data);
      const split = data.data.split('\n');
      const final = split.slice(0, split.length - 1);
      fs.writeFileSync(path.resolve(__dirname, `../data/day${dayNum}.json`), JSON.stringify(final));
    },
  },
  input: {
    get: async (dayNum) => {
      console.log(`Getting day${dayNum}.json`);
      return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `../data/day${dayNum}.json`), async (err, data) => {
          if (err) {
            console.info('Error retrieving file, attempting to get and store new input.');
            console.info(`Input day: ${dayNum}.`);
            const newData = await getAndStore(dayNum).catch((err) => {
              console.log(`Couldn't get the data for day ${dayNum}!`);
              reject();
            });
            resolve(newData);
          } else {
            console.info('Got the input data...');
            resolve(JSON.parse(data));
          }
        });
      });
    },
  },
};
