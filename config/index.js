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
    secret: 'hk1s4wp6nx',
    token: {
      expiresIn: 1440 // 24 hours
    },
    github: {
    	clientId: '7ba3653bf81205a7c30a',
    	secret: 'afa0850a80f9c139f4c8af4aa6a3d43a49eecf67'
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
    secret: 'hk1s4wp6nx',
    token: {
      expiresInMinutes: 1440 // 24 hours
    },
    github: {
    	clientId: '7ba3653bf81205a7c30a',
    	secret: 'afa0850a80f9c139f4c8af4aa6a3d43a49eecf67'
    }
  }
};

let shell = require('shell-arguments');
let env = shell.env || process.env.ENV || 'production';

module.exports = config[env];
