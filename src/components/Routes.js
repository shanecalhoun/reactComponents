/**
 * This Component is intentionally light. It exists separately
 * to ease server side rendering.
 */
import React from 'react';
import {Route} from 'react-router-dom';

import App from './App';

class Routes extends React.Component {
	constructor () {
		super();
		this.state = {};
	}

	render () {
		return (
			<Route path="/" component={App}/>
		);
	}
}

export default Routes;


