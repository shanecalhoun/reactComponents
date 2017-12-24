/**
 * initialstate.js
 * Created by shanecalhoun on 12/23/17
 * This file represents the initial state in the Redux store.
 * It's used to provide default values in the reducers, in cases
 * where the store doesn't yet have a value, and there are no
 * action matches in the reducer, so that the return value of
 * the reducer function will never be undefined.
 * Use this file to help give you an idea what the overall
 * picture of the Redux store looks like.*/

export default {
	main: {},
	errors: {}
};
