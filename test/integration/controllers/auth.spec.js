'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let helper = require('../../helper.js');

describe('api/auth', function() {
  describe('401 (Not authorized) authentication failed', function() {
    it('POST /api/auth', function(done) {
      request(helper.API)
        .post('/auth')
        .field('email', helper.user.email)
        .field('password', helper.user.invalidPassword)
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });
  });

  describe('400 (Bad request) invalid clientId', function() {
  	it('POST /api/auth/github', function(done) {
      request(helper.API)
        .post('/auth/github')
        .field('clientId', 'akjsdflkjasdf')
        .end(function(err, res) {
          res.statusCode.should.equal(400);
          res.body.should.have.property('message', 'invalid clientId');
          done();
        });
    });
  });

  describe('400 (Bad request) invalid params, pass clientId, code and redirectURI', function() {
  	it('POST /api/auth/github', function(done) {
      request(helper.API)
        .post('/auth/github')
        .field('clientId', helper.github.clientId)
        .end(function(err, res) {
          res.statusCode.should.equal(400);
          res.body.should.have.property('message', 'invalid params, pass clientId, code and redirectURI');
          done();
        });
    });
  });

  describe('400 (Bad request) Not Found, when code invalid', function() {
  	it('POST /api/auth/github', function(done) {
      request(helper.API)
        .post('/auth/github')
        .field('clientId', helper.github.clientId)
        .field('code', '0982093809283') // invalid code
        .field('redirectURI', 'http://localhost:5000')
        .end(function(err, res) {
          res.statusCode.should.equal(400);
          res.body.should.have.property('message', 'auth invalid fields');
          res.body.should.have.property('error', 'Not Found');
          done();
        });
    });
  });


  describe('200 (Success) user id, token', function() {
    it('POST /auth', function(done) {
      request(helper.API)
        .post('/auth')
        .field('email', helper.user.email)
        .field('password', helper.user.password)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.have.property('id', helper.user._id.toString());
          res.body.should.have.property('token');
          done();
        });
    });
  });
});

