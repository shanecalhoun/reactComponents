/**
 */
/**
 * This file exists only to toggle between the two different configureStore
 * versions, based on the type of environment Node is running in.
 * The development environment contains many debugging tools, and the
 * production version is built for speed.
 */

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./configureStore.prod');
} else {
	module.exports = require('./configureStore.dev');
}


