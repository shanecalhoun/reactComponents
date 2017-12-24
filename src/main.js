/**
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'babel-polyfill';
import Routes from './components/Routes';
/*
import {checkLoggedIn} from './auth/ad';
*/

import configureStore from './store/configurestore';

document.addEventListener('DOMContentLoaded', () => {
	/* Check that the user is logged in through Azure AD before rendering the UI */
	//checkLoggedIn()
	//	.then(() => {
	const store = configureStore(/* pass initial app state here, if needed */
		{}
	);

	ReactDOM.render(
		/*Provider component attaches the store to React components*/
		<Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>,
		document.getElementById('mount')
	);
	//	})
	//	.catch((err) => {
	//		console.error(`checkLoggedIn failed - ${err}`);//eslint-disable-line
	//	});
});
