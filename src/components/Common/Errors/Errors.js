/**
 * Errors.js
 * Created by shanecalhoun on 12/23/17
 */

import React from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as errorActions from '../../../actions/erroractions';
import * as loaderActions from '../../../actions/loaderactions';
import _ from 'lodash';
import './errors.less';

class Errors extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {         //custom notification styles
				NotificationItem: {     //override the notification item
					DefaultStyle: {
						margin: '10px 5px',
						padding: '0'
					}
				}
			},
			allowHTML: true
		};

		_.bindAll(this, ['clearErrors']);
	}

	componentDidMount() {
		this.notificationSystem = this.refs.notificationSystem;
		if (this.props.errors && this.props.errors.length > 0) {
			this.props.actions.hideLoader();
			this.notificationSystem.addNotification({
				message: this.errorMessages(this.props.errors),
				level: 'error',
				position: 'tc',   //top center
				autoDismiss: 0,   //dont autodismiss
				onRemove: this.clearErrors
			});
		}
	}

	/*componentWillReceiveProps(newProps) {
		if (Array.isArray(newProps.errors)) {
			this.props.actions.hideLoader();

			if (newProps.errors.length > 0) {
				this.notificationSystem.addNotification({
					message: this.errorMessages(newProps.errors),
					level: 'error',
					title: Errors.errorCountDisplay(newProps.errors),
					position: 'tc',   //top center
					autoDismiss: 0,   //dont autodismiss
					onRemove: this.clearErrors
				});

			}
		} else {
			this.notificationSystem.addNotification({
				message: this.errorMessages(newProps.errors),
				level: 'error',
				title: Errors.errorCountDisplay(newProps.errors),
				position: 'tc',   //top center
				autoDismiss: 0,   //dont autodismiss
				onRemove: this.clearErrors
			});
		}
	}

	componentDidUpdate() {
		this.notificationSystem = this.refs.notificationSystem;
		if (this.notificationSystem) {
			this.props.actions.hideLoader();

			let closeObj = findDOMNode(this.notificationSystem);
			let close = $(closeObj).find('.notification-dismiss');
			if (close.length > 0) {
				close.attr('title', labels.close);
			}
		}
	}*/

	/*errorMessages(errors) {
		let errorCodes = [];
		let errorMessages = [];
		let error;
		let message = '';
		let errorMessage = '';

		try {
			error = JSON.parse(errors);
		}
		catch (err) {
			message = errors;
		}

		// for client side validation errors only
		// client side error code range 9001 - 10000
		// do not forget to add all error codes and message (labels) in the dictionary above
		if (error && error.ErrorCode) {
			if (error.ErrorCode > 9000 && error.ErrorCode <= 10000) {
				errorMessage = '<div>' + '<strong>' + error.ErrorCode + ': ' + '</strong>' + error.message + '</div>';

				return message = errorMessage;
			}
		}

		if (error) {
			if (error.length > 0 && Array.isArray(error)) {
				error.map((error) => {
					if (error.ErrorCode) {
						errorCodes.push(error.ErrorCode);
					}
					else {
						errorMessages.push(error.Message);
					}
				});
			} else {
				errorCodes.push(error.ErrorCode);
			}

			if (errorCodes.length !== 0) {
				errorMessages = Errors.getErrorCodeValue(errorCodes);
				if (errorMessages.length > 0) {
					errorMessages.map((message) => {
						errorMessage += '<div>' + message + '</div>';
					});
					return errorMessage;
				}
			}

			if (errorMessages.length > 0) {
				errorMessages.map((message) => {
					errorMessage += '<div>' + message + '</div>';
				});
				return errorMessage;
			}
		} else {
			return message;
		}
	}*/

	clearErrors() {
		this.props.actions.clearErrors();
	}

	render() {
		return (
			<div>
				<NotificationSystem ref="notificationSystem" allowHTML/>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	let errors = store.errors;
	return {
		errors
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Object.assign({}, errorActions, loaderActions), dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Errors);



