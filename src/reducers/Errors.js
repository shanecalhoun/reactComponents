/**
 * Errors.js
 * Created by shanecalhoun on 12/24/17
 */

import * as types from '../actions/actiontypes';//just externalizes action name constants
import initialState from './initialstate';

/**
 * This reducer function handles all the actions related to the top-level Error objects.
 * @param {Object} state - A portion of the overall state which represents the error
 *      objects currently in memory.
 * @param {Object} action - Action object containing type and other values
 * @return {Object} form objects
 */
export default function errorsReducer(state = initialState.errors, action) {
	switch (action.type) {
		case types.DISPLAY_ERROR:
			return action.error;
		default:
			return state;
	}
}

