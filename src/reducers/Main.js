/**
 * Main.js
 * Created by shanecalhoun on 12/24/17
 * Remember: always add new reducers to the /reducers/index.js file!
 */

import * as types from '../actions/actiontypes';//just externalizes action name constants
import initialState from './initialstate';

/**
 * This reducer function handles all the actions related to the top-level Main objects.
 * @param {Object} state - A portion of the overall state which represents the main
 *      objects currently in memory.
 * @param {Object} action - Action object containing type and other values
 * @return {Object} form objects
 */
export default function mainReducer(state = initialState.main, action) {
	switch (action.type) {
		case types.GET_MAIN_SUCCESS:
			return action.main;
		default:
			return state;
	}
}


