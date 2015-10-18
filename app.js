'use strict';

let express = require('express');
let http = require('http');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let compress = require('compression');
let methodOverride = require('method-override');
let multer = require('multer')();
let config = require('./config');
let routes = require('./routes');
let shell = require('shell-arguments');
let favicon = require('serve-favicon');

let app = express();
let server = http.createServer(app);

app.set('env', shell.env || process.env.ENV || 'production');
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'assets', 'views'));
app.set('view engine', 'jade');

// if (app.get('env') === 'development') {
// 	let morgan = require('morgan');
//   app.use(morgan('dev'));
// }

app
  .use(compress())
  .use(favicon(__dirname + '/public/imgs/favicons/icon.ico'))
  .use(methodOverride())
  .use(multer.array())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api', routes.api)
  .use('/', routes.pages);

mongoose.connect(config.database.url, function() {
  server.listen(app.get('port'), function () {
    console.log('> localhost:' + app.get('port'));

    if (app.get('env') === 'development' && process.env.open === 'true') {
      var open = require('open');
      open('http://localhost:'+config.server.proxy, 'google chrome');
    }
  });
});

mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});
