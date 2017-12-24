/* Don't allow NODE_ENV to be blank. */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*
* Note: if you have problems with HMR infinitely reloading, check to make
* sure your /public folder is emptied of all the generated .js files.
* Also make sure that if there are multiple webpack configs below, that
* each contains a different "name" property.
*/

/*
* Because the server side rendering is running in Node, and the DefinePlugin
* runs last of all the plugins, any variables declared in the DefinePlugin
* configuration will be missing when webpack tries to compile the server side
* code. To get around this, require the config file, then assign the same
* variables to Node's "global" namespace. That will make them available to
* be parsed on the server. */
const envConfig = require('config'),
	nodeEnv = JSON.stringify(process.env.NODE_ENV);

global._config_serviceUrl_= JSON.stringify(envConfig.get('serviceUrl'));
global.__ENV = global.__NODE_ENV = nodeEnv;

const path = require('path'),
	webpack = require('webpack'),
	nodeExternals = require('webpack-node-externals'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'), packageJson = require('./package.json'),
	//BundleAnalyzerPlugin = require('webpack-bundle-analyzer')BundleAnalyzerPlugin,
	//
	/*
     * The below envPlugin uses Webpack's built-in DefinePlugin to
     * dynamically rewrite all instances of the object key names inside
     * the .js source code, replacing the literal variable key name with
     * the value from the Node environment. This results in being
     * able to pass Node environment variables to the front-end code.
     */
	/* TODO: replace this list of vendor files with a dynamic read of package.json */
	vendorLibraries = [
		'adal-angular',
		'axios',
		'babel-polyfill',
		'jquery',
		'lodash',
		'prop-types',
		'react',
		'react-bootstrap',
		'react-select',
		'react-dom',
		'react-fontawesome',
		'react-onclickoutside',
		'react-redux',
		'react-router',
		'react-router-dom',
		'redux',
		'redux-thunk',
		'uuid'
	],
	envPlugin = new webpack.DefinePlugin({
		'process.env.NODE_ENV': nodeEnv,
		NODE_ENV: nodeEnv,//adding this for prod React build
		__ENV: nodeEnv,
		__NODE_ENV: nodeEnv,
		_config_serviceUrl_: _config_serviceUrl_
	}),
	/*
     * The below swaps between development and production mode based
     * on the Node process's environment variable, defaulting to
     * development mode if the variable hasn't been set.
     */
	isProduction = process.env.NODE_ENV !== 'development',
	jsLoaders = isProduction ? ['babel-loader'] : ['react-hot-loader', 'babel-loader'],
	/*
     * Create an extractor for both CSS and LESS, and assign them unique names
     * for reference in the plugins options.
     * This forces CSS and LESS files loaded by webpack to be placed in their
     * own discrete CSS file that will be loaded separately of their "import"ing
     * source JS file, which is necessary for server-side rendering to work.
     * https://github.com/webpack-contrib/extract-text-webpack-plugin
     */
	/*cssExtractor = new ExtractTextPlugin({
       filename:'[name]-css.css',
       allChunks: true
    }),
    lessExtractor = new ExtractTextPlugin({
       filename:'[name]-less.css',
       allChunks: true
    }),
    */
	plugins = isProduction ? [
		envPlugin,
		//new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		/* move all chunks common to all entries into vendor.js */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' // Specify the common bundle's name.
		}),
		new ExtractTextPlugin('bundle.css')/*,
     cssExtractor,
     lessExtractor*/
	] : [
		envPlugin,
		//new BundleAnalyzerPlugin(),
		//assigns lower, shorter ids to modules used more often. So, smaller file sizes.
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		//keeps errors from breaking HMR. Shows formatted error msg instead
		new webpack.NoEmitOnErrorsPlugin(),
		/* CommonsChunkPlugin extracts common pieces of the entry point chunks and
         * assigns those to a single output file. This enables code splitting.
         * Ref: https://webpack.js.org/guides/code-splitting-libraries/ */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' // Specify the common bundle's name.
		}),
		new ExtractTextPlugin('bundle.css')/*,
     cssExtractor,
     lessExtractor*/
	],
	//TODO: turn off source maps for production version, once released.
	devtool = isProduction ? 'source-map' : 'inline-source-map';



const clientConfig = {
	//the below name must match that of the entry.bundle[1] name
	name: 'client',
	//Target specifies what environment webpack should output content for. 'node' for NodeJS
	target: 'web',
	//Turn on source maps.
	devtool: devtool,
	//Stop the console from showing verbose file output
	//noInfo: true,
	//This is the path to your client-side JS folder. Must be absolute path.
	context: path.join(__dirname, 'src'),
	//This is the entry point for your application,
	entry: isProduction ? { //No hot modules in production
		bundle: ['./main.js'],
		vendor: vendorLibraries
	} : {
		//adding reload=true here to force a full page refresh if the HMR fails for some reason
		/* adding the "name" property here seems to solve the
         * issue of having two configs (client and server) inside the webpack.config
         * file causing the resulting page to reload infinitely,
         * but it also stops hot reloading from working :( */
		bundle: ['./main.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true&name=client'],
		vendor: vendorLibraries
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: jsLoaders
			},
			{
				test: /\.less$/,
				loader: ['style-loader', 'css-loader', 'less-loader']
				/*loader: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: ['css-loader', 'less-loader']
                })*/
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
				/*loader: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: ['css-loader']
                })*/

			},
			/* All this kendo RegEx foolishness is to prevent the webpack css loader
             * from choking on the kendo CSS files, which for some reason are
             * throwing errors when imported into React components.
             * TODO: figure out why this is and remedy. */
			/*{
               test: /kendo\.[a-zA-Z0-9.]+\.css$/,
               loader: 'null-loader'
            },*/
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: [
					'file-loader', {
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 7
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							webp: {
								quality: 75
							}
						}
					}
				]
			}
		]
	},
	//Where Webpack should look for loaders, like the Babel loader above."
	resolveLoader: {
		modules: [
			path.join(__dirname, 'node_modules')
		]
		/*
        root: [
           path.join(__dirname, 'node_modules')
        ]*/
	},
	//Where Webpack should look for files referenced by an import or require() statement.
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules')
		]
		/*
        root: [
           path.join(__dirname, 'node_modules')
        ]*/
	},
	plugins: plugins
};

const serverConfig = {
	/* just specify the differences between server and client configs */
	name: 'server',
	target: 'node',
	externals: [nodeExternals()],
	context: path.join(__dirname, 'src'),
	entry: {serverEntry: ['./server-entry.js']},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: 'public'
	},
	resolveLoader: {
		modules: [
			path.join(__dirname, 'node_modules')
		]
	},
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules')
		]
	},
	plugins: plugins,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: jsLoaders
			},
			{
				test: /\.less$/,
				/*loader: ['style-loader', 'css-loader', 'less-loader']*/
				//loader: lessExtractor.extract(['style-loader',  'css-loader', 'less-loader'])/*
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
			},
			{
				test: /\.css$/,
				/*loader: ['style-loader', 'css-loader']*/
				//loader: cssExtractor.extract(['style-loader', 'css-loader'])
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'null-loader'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: [
					'null-loader'
				]
			}
		]
	}
};

/* eslint-disable no-console*/
console.log(`NODE_ENV: ${envConfig.util.getEnv('NODE_ENV')}`);
console.log(`HOSTNAME: ${envConfig.util.getEnv('HOSTNAME')}`);
console.log(`NODE_CONFIG_DIR: ${envConfig.util.getEnv('NODE_CONFIG_DIR')}`);
console.log(`Config serviceUrl: ${envConfig.get('serviceUrl')}`);
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
/* eslint-enable */


module.exports = clientConfig;
