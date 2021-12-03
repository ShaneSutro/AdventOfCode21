const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
};
