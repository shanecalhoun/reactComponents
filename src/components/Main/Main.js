/**
 * Main.js
 * Created by shanecalhoun on 12/23/17
 */

import React from 'react';

import './main.less';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<main className="main container key">
				{this.props.children}
			</main>
		);
	}
}
export default Main;


