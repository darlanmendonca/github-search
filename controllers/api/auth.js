'use strict';

let AuthController = {};
let Users = require('../../models').users;
let config = require('../../config');
let jwt = require('jsonwebtoken');
let encode = require('../../helpers/encode.js');
let publicFields = '-__v -password';

AuthController.local = function(req, res) {
	/**
    * @api {POST} /auth local
    * @apiDescription Authentication user with local strategy
    * @apiName local
    * @apiGroup Auth
    * @apiPermission Public
    *
    * @apiParam {String} email email of user
    * @apiParam {String} password password of user
    */
  let password = encode(req.body.password);
  Users
    .findOne({email: req.body.email, password: password}, publicFields)
    .then(function(user) {
      if (!user) {
        return res.status(401).json({
          message: 'authentication failed'
        });
      }

      res.json({
        id: user._id,
        token: jwt.sign(user, config.secret, config.token)
      });
    });
};

AuthController.github = function(req, res) {
	/**
    * @api {POST} /auth/github github
    * @apiDescription Authentication user with github account
    * @apiName github
    * @apiGroup Auth
    * @apiPermission Public
    *
    * @apiParam {String=7ba3653bf81205a7c30a} clientId id of application
    * @apiParam {String} code github code to get access
    * @apiParam {String} redirectUri url to redirect
    */

  let validParams = req.body.clientId && req.body.code && req.body.redirectUri;
  let validClientId = req.body.clientId === config.github.clientId;
  let request = require('request');


  if (!validClientId) {
  	return res.status(400).json({
  		message: 'invalid clientId'
  	});
  }

  if (!validParams) {
  	return res.status(400).json({
  		message: 'invalid params, pass clientId, code and redirectUri'
  	});
  }

  let getAccessToken = {
  	url: 'https://github.com/login/oauth/access_token',
  	qs: {
  		code: req.body.code,
  		client_id: req.body.clientId,
  		client_secret: config.github.secret
  	},
  	json: true
  };

  request.get(getAccessToken, callbackAccessToken);

  function callbackAccessToken(err, response, accessToken) {
  	let error = err || response.body.error;
  	if (error) {
      return res
        .status(400)
        .send({
          message: 'auth invalid fields',
          error: error
        });
    } else {
			res.json({
				token: accessToken.access_token
			});
    }

  }

};

module.exports = AuthController;
