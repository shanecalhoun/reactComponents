/**
 */
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

/**
 * Configures and creates a Redux store that includes all reducers and
 * the initial state of the application.
 * The devToolsExtension reference in the compose() call is the Chrome
 * implementation of the Redux development tool. Refer to:
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
 * Note that the reduxImmutableStateInvariant middleware is needed only
 * in dev mode to prevent developers from modifying the state directly.
 * Doing so will produce an error.
 * Thunk is here to use for async operations like Ajax.
 * @param {Object} initialState - The initial state of your application.
 *      Particularly useful for server side rendering.
 * @return {*} A Redux Store instance
 */
export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, reduxImmutableStateInvariant()),
			/* adding devTools call here for Chrome Redux */
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);
}


