/**
 * app.js
 */
/* Parse all .js files using babel.
require('babel-register');
/* The below is required to force Babel to ignore trying to parse
* LESS files as JS. */
require.extensions['.less'] = () => {};

const express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),

	app = express(),

	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config'),
	compiler = webpack(webpackConfig),

	envConfig = require('config'),

	handleRender = require('./src/server-entry');

/* uncomment this init of the Morgan logger to show all
* the incoming http requests in the console. I'm commenting
* this by default, since it's unnecessary most of the time.
*/
/*const logger = require('morgan');
app.use(logger('dev'));*/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/* Handle CORS */
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


/* Adding support for EJS to ease server-side rendering of the
* first page's React components. */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

/*
* Handle all valid routes with index.html
* Any URL that ends with alphanumeric characters is considered
* to be a valid route. Any use of a literal '.' character in
* the URL is assumed to be a static file request such as .js
* or .css, etc., and should not be forwarded the contents of
* index.html. Any '_' character will also invalidate this filter
* (this allows the __webpack_hmr route to work).
* This RegEx may need to become more specific as the app grows.
* 10/10/17 - changing from sendFile() to res.render() in order to
* support server-side initial rendering of content.
*/
app.get(/.*\/[a-zA-Z0-9\-]*$/, function (req, res) {
	console.log(`Resolving path: ${req.originalUrl}`);
	/*res.sendFile(path.resolve(__dirname, 'public', 'index.html'));*/


	res.render( 'indexdev', {
		initialContent: ''
	});
});

app.get('/test', function (req, res) {
	res.send({'test': 'Hello'});
});

/* catch 404 and forward to error handler */
/*app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/!* error handlers
* development error handler
* will print stacktrace *!/
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
        message: err.message,
        error: err
     });
  });
}

/!* production error handler
* no stacktraces leaked to user *!/
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
     message: err.message,
     error: {}
  });
});*/

console.log(`env: ${app.get('env')}`);

/* Webpack */
/* if this is a local dev environment, use hot module reloading */
if (app.get('env') === 'development') {
	const webpackHotMiddleware = require('webpack-hot-middleware');
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		hot: app.get('env') === 'development',
		filename: 'bundle.js',
		publicPath: '/',
		stats: {
			colors: false
		},
		historyApiFallback: true
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}));
} else {
	/* Turn on gzip compression for prod environment */
	console.log('Enabling GZip compression for production mode');
	app.use(require('compression')());
}

module.exports = app;
