import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from './Main/Main';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Errors from '../components/Common/Errors/Errors';

// Moved import into globals.less to preserve cascade order
//import '../../public/osg.less';

import './globals.less';
import './app.less';
/*
import Async from './Common/Async';*/

/* the import() call must be located in this outer function. Placing it
* inside load() will cause Webpack to raise a warning about a required
* file path being an expression.
* The value of the component={} attribute must be a function or a
* React component. React-Router sends the props in as the first parameter,
* so grab those and forward them to the Async.load() as the first
* argument. The second argument must be an import() statement. */
//const loadAddBody = (props) => Async.load(props,import('./Main/Body/AddBody'));

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="root">
				<Errors/>
				<Nav/>
				<Main>
					<Switch>
						<Route component={Home}/>
					</Switch>
				</Main>
			</section>
		);
	}
}
export default App;


