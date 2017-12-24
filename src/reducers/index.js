/**
 * index.js
 * Created by shanecalhoun on 12/23/17
 * Traditionally, the root reducer file is named index.js
 *
 * This rootReducer config object is passed to Redux.createStore() in
 * configurestore.{env}.js.
 */
import {combineReducers} from 'redux';
import main from './Main';
import errors from './Errors';


/* All of the application's reducers will be combined into this
* rootReducer. Be careful of what you name these objects! The names
* you choose will be referred to through the state object every
* time you access it.
*
* All combineReducers() does is generate a function that calls your
* reducers with slices of state according to their keys.
* Ref: http://redux.js.org/docs/api/combineReducers.html
*/
const rootReducer = combineReducers({
	main,
	errors
});

export default rootReducer;
