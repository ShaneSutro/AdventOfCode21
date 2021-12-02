const axios = require('axios');

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
  },
};
