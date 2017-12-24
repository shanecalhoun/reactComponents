/**
 * loaderactions.js
 * Created by shanecalhoun on 12/24/17
 */

import * as types from './actiontypes';

/**
 * in case we want to hide the loader from an action call
 * @return {{type: String}} The action object, including type.
 */
export function hideLoader() {
	return { type: types.HIDE_LOADING_INDICATOR, display: false };
}

/**
 * in case we want to show the loader from an action call
 * @return {{type: String}} The action object, including type.
 */
export function showLoader() {
	return { type: types.SHOW_LOADING_INDICATOR, display: true };
}
