/**
 * This file is the entry point passed to the Webpack server-side rendering configuration.
 * This branches the rendering between a StaticRouter for the server, and a BrowserRouter
 * for the client side.
 * Very helpful reference:
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
 */
import React from 'react';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router';
import ReactDOMServer from 'react-dom/server';
//import Main from './main';
import Routes from './components/Routes';

import configureStore from './store/configurestore';

const handleRender = (req, res) => {
	/*const html = ReactDOMServer.renderToString(
       <Main />
    );*/
	const context = {};

	const store = configureStore(/* pass initial app state here, if needed */
		{forms: {}}
	);

	return ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<Routes />
			</StaticRouter>
		</Provider>
	);
};
/* TODO: not sure why, but using the ES6 export here causes issues.
* So, use CJS module.exports instead. */
//export default handleRender;
module.exports = handleRender;
