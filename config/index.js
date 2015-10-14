'use strict';

let config = {
  development: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/github-search'
    },
    secret: 'hkswpnx',
    token: {
      expiresIn: 1440 // 24 hours
    }
  },
  production: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/github-search'
    },
    secret: 'hkswpnx',
    token: {
      expiresInMinutes: 1440 // 24 hours
    }
  }
};

let shell = require('shell-arguments');
let env = shell.env || process.env.ENV || 'production';

module.exports = config[env];
