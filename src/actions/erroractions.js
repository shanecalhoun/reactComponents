/**
 * erroractions.js
 * Created by shanecalhoun on 12/24/17
 */

import * as types from './actiontypes';

export function clearErrors() {
	return { type: types.CLEAR_ERRORS };
}

/**
 * Raise an error from JavaScript code. This is for validation failure
 * @param {String} message - entities hierarchy
 * @return {Object} the dispatch
 @return {Function} Thunk function
 */
export function raiseJSValidationError(message) {
	return (dispatch) => {
		dispatch({ type: types.CLIENT_VALIDATION_ERROR, message: message });
	};
}


